/**
 * Learning Path Details API
 * GET /api/learning/paths/[slug] - Get path details
 */

import { NextRequest, NextResponse } from "next/server";
import { getPathBySlug } from "@/lib/content/loader";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const path = getPathBySlug(slug);

    if (!path) {
      return NextResponse.json(
        { error: "Learning path not found" },
        { status: 404 }
      );
    }

    const user = await getCurrentUser();

    let enrollment = null;

    if (user) {
      // First, ensure the path exists in the database
      let dbPath = await db.learningPath.findUnique({
        where: { slug },
      });

      if (!dbPath) {
        // Create the path in the database from file content
        dbPath = await db.learningPath.create({
          data: {
            slug: path.slug,
            title: path.title,
            description: path.description,
            category: path.category,
            difficulty: path.difficulty,
            iconUrl: path.iconUrl,
            xpReward: path.xpReward,
            order: path.order,
            isPublished: path.isPublished,
            isPremium: path.isPremium,
          },
        });
      }

      // Get user's enrollment
      enrollment = await db.pathEnrollment.findUnique({
        where: {
          userId_pathId: {
            userId: user.id,
            pathId: dbPath.id,
          },
        },
      });
    }

    return NextResponse.json({
      path,
      enrollment,
    });
  } catch (error) {
    console.error("Error fetching learning path:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning path" },
      { status: 500 }
    );
  }
}
