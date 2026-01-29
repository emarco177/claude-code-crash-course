/**
 * Lesson Content API
 * GET /api/learning/lessons/[pathSlug]/[moduleId]/[lessonSlug] - Get lesson content
 * POST /api/learning/lessons/[pathSlug]/[moduleId]/[lessonSlug] - Mark lesson as completed
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getLessonContent, getPathBySlug } from "@/lib/content/loader";
import { getCurrentUser, requireUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { pathSlug: string; moduleId: string; lessonSlug: string } }
) {
  try {
    const { pathSlug, moduleId, lessonSlug } = params;

    // Get lesson content from file system
    const lessonContent = getLessonContent(pathSlug, moduleId, lessonSlug);

    if (!lessonContent) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    const user = await getCurrentUser();

    let progress = null;

    if (user) {
      // Find or create lesson in DB
      const path = getPathBySlug(pathSlug);
      if (path) {
        let dbPath = await db.learningPath.findUnique({
          where: { slug: pathSlug },
          include: {
            modules: {
              where: { title: path.modules.find(m => m.id === moduleId)?.title },
              include: {
                lessons: {
                  where: { slug: lessonSlug },
                },
              },
            },
          },
        });

        // If lesson exists in DB, get progress
        if (dbPath?.modules[0]?.lessons[0]) {
          const lessonId = dbPath.modules[0].lessons[0].id;

          progress = await db.lessonProgress.findUnique({
            where: {
              userId_lessonId: {
                userId: user.id,
                lessonId,
              },
            },
          });
        }
      }
    }

    return NextResponse.json({
      lesson: lessonContent,
      progress,
    });
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return NextResponse.json(
      { error: "Failed to fetch lesson" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { pathSlug: string; moduleId: string; lessonSlug: string } }
) {
  const user = await requireUser();

  try {
    const { pathSlug, moduleId, lessonSlug } = params;
    const { completionTime, score } = await request.json();

    // Get path and module info
    const pathContent = getPathBySlug(pathSlug);

    if (!pathContent) {
      return NextResponse.json(
        { error: "Path not found" },
        { status: 404 }
      );
    }

    // Ensure path exists in DB
    let dbPath = await db.learningPath.findUnique({
      where: { slug: pathSlug },
    });

    if (!dbPath) {
      dbPath = await db.learningPath.create({
        data: {
          slug: pathContent.slug,
          title: pathContent.title,
          description: pathContent.description,
          category: pathContent.category,
          difficulty: pathContent.difficulty,
          xpReward: pathContent.xpReward,
          order: pathContent.order,
          isPublished: pathContent.isPublished,
          isPremium: pathContent.isPremium,
        },
      });
    }

    // Find or create module
    const moduleInfo = pathContent.modules.find(m => m.id === moduleId);
    if (!moduleInfo) {
      return NextResponse.json(
        { error: "Module not found" },
        { status: 404 }
      );
    }

    let dbModule = await db.learningModule.findFirst({
      where: {
        pathId: dbPath.id,
        title: moduleInfo.title,
      },
    });

    if (!dbModule) {
      dbModule = await db.learningModule.create({
        data: {
          pathId: dbPath.id,
          title: moduleInfo.title,
          description: moduleInfo.description,
          order: moduleInfo.order,
          estimatedMinutes: moduleInfo.estimatedMinutes,
        },
      });
    }

    // Find or create lesson
    const lessonInfo = moduleInfo.lessons?.find(l => l.slug === lessonSlug);
    if (!lessonInfo) {
      return NextResponse.json(
        { error: "Lesson not found" },
        { status: 404 }
      );
    }

    let dbLesson = await db.lesson.findUnique({
      where: {
        moduleId_slug: {
          moduleId: dbModule.id,
          slug: lessonSlug,
        },
      },
    });

    if (!dbLesson) {
      dbLesson = await db.lesson.create({
        data: {
          moduleId: dbModule.id,
          title: lessonInfo.title,
          slug: lessonInfo.slug,
          order: lessonInfo.order,
          contentType: lessonInfo.contentType,
          content: "",
          estimatedMinutes: lessonInfo.estimatedMinutes,
          xpReward: lessonInfo.xpReward,
        },
      });
    }

    // Update or create progress
    const progress = await db.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: dbLesson.id,
        },
      },
      update: {
        status: "COMPLETED",
        completionTime,
        score,
        completedAt: new Date(),
      },
      create: {
        userId,
        lessonId: dbLesson.id,
        status: "COMPLETED",
        completionTime,
        score,
        completedAt: new Date(),
      },
    });

    // Award XP to user
    await db.user.update({
      where: { id: user.id },
      data: {
        theoryXp: { increment: lessonInfo.xpReward },
        lessonsCompleted: { increment: 1 },
      },
    });

    return NextResponse.json({
      message: "Lesson completed",
      progress,
      xpAwarded: lessonInfo.xpReward,
    });
  } catch (error) {
    console.error("Error completing lesson:", error);
    return NextResponse.json(
      { error: "Failed to complete lesson" },
      { status: 500 }
    );
  }
}
