/**
 * Learning Paths API
 * GET /api/learning/paths - List all learning paths
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllPaths } from "@/lib/content/loader";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    // Get all paths from file system
    const paths = getAllPaths();

    const user = await getCurrentUser();

    if (user) {
      const enrollments = await db.pathEnrollment.findMany({
        where: { userId: user.id },
        select: {
          pathId: true,
          progress: true,
          completedAt: true,
        },
      });

      const enrollmentMap = new Map(
        enrollments.map((e) => [e.pathId, e])
      );

      // TODO: Match enrollments with paths by slug (requires path DB records)
      // For now, just return paths without progress
    }

    // Filter published paths (unless user is admin)
    const publishedPaths = paths.filter((p) => p.isPublished);

    return NextResponse.json({ paths: publishedPaths });
  } catch (error) {
    console.error("Error fetching learning paths:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning paths" },
      { status: 500 }
    );
  }
}
