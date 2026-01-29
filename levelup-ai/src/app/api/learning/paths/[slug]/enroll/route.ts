/**
 * Path Enrollment API
 * POST /api/learning/paths/[slug]/enroll - Enroll user in a learning path
 */

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getPathBySlug } from "@/lib/content/loader";
import { requireUser } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const user = await requireUser();

  try {
    const slug = params.slug;

    // Get path content
    const pathContent = getPathBySlug(slug);

    if (!pathContent) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 }
      );
    }

    // Ensure path exists in database
    let dbPath = await db.learningPath.findUnique({
      where: { slug },
    });

    if (!dbPath) {
      // Create the path in the database
      dbPath = await db.learningPath.create({
        data: {
          slug: pathContent.slug,
          title: pathContent.title,
          description: pathContent.description,
          category: pathContent.category,
          difficulty: pathContent.difficulty,
          iconUrl: pathContent.iconUrl,
          xpReward: pathContent.xpReward,
          order: pathContent.order,
          isPublished: pathContent.isPublished,
          isPremium: pathContent.isPremium,
        },
      });
    }

    // Check if already enrolled
    const existingEnrollment = await db.pathEnrollment.findUnique({
      where: {
        userId_pathId: {
          userId: user.id,
          pathId: dbPath.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({
        message: "Already enrolled",
        enrollment: existingEnrollment,
      });
    }

    // Create enrollment
    const enrollment = await db.pathEnrollment.create({
      data: {
        userId: user.id,
        pathId: dbPath.id,
        progress: 0,
        currentModuleId: pathContent.modules[0]?.id,
      },
    });

    return NextResponse.json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Error enrolling in path:", error);
    return NextResponse.json(
      { error: "Failed to enroll in path" },
      { status: 500 }
    );
  }
}
