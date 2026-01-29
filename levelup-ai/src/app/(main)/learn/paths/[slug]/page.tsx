/**
 * Learning Path Details Page
 * Shows path overview, modules, and enrollment
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { Book, Clock, Trophy, CheckCircle, Lock } from "lucide-react";
import { auth } from "@clerk/nextjs/server";

async function getPathDetails(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/learning/paths/${slug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching path:", error);
    return null;
  }
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = await getPathDetails(slug);

  let userId: string | null = null;
  try {
    const authResult = await auth();
    userId = authResult.userId;
  } catch (error) {
    console.log("Auth not available, rendering path without user context");
  }

  if (!data || !data.path) {
    notFound();
  }

  const { path, enrollment } = data;
  const isEnrolled = !!enrollment;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/learn"
            className="text-sm text-cyan-400 hover:text-cyan-300 mb-4 inline-block"
          >
            ← Back to Learning Hub
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-400 rounded-full">
                  {path.difficulty}
                </span>
                {path.isPremium && (
                  <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded">
                    PRO
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-bold text-gray-100 mb-3">
                {path.title}
              </h1>

              <p className="text-lg text-gray-400 mb-6">
                {path.description}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>{path.modules?.length || 0} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.ceil(
                      (path.modules?.reduce(
                        (sum: number, m: any) => sum + (m.estimatedMinutes || 0),
                        0
                      ) || 0) / 60
                    )}
                    h total
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{path.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enroll Button */}
          {userId && !isEnrolled && (
            <form action={`/api/learning/paths/${slug}/enroll`} method="POST">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all"
              >
                Start Learning
              </button>
            </form>
          )}

          {isEnrolled && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-medium">
                    Enrolled in this path
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${enrollment.progress}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-400">
                    {enrollment.progress}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modules */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            Course Content
          </h2>

          {path.modules?.map((module: any, moduleIndex: number) => (
            <div
              key={module.id}
              className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-100">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                  <span className="text-sm text-gray-400">
                    {module.estimatedMinutes} min
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {module.description}
                </p>

                {/* Lessons */}
                {module.lessons && module.lessons.length > 0 && (
                  <div className="space-y-2">
                    {module.lessons.map((lesson: any) => (
                      <div
                        key={lesson.slug}
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {lesson.contentType === "QUIZ" ? (
                            <div className="w-6 h-6 rounded-full bg-purple-500/10 flex items-center justify-center">
                              <span className="text-xs text-purple-400">Q</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-cyan-500/10 flex items-center justify-center">
                              <Book className="w-3 h-3 text-cyan-400" />
                            </div>
                          )}
                          <span className="text-sm text-gray-300">
                            {lesson.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">
                            {lesson.estimatedMinutes} min
                          </span>
                          {!isEnrolled ? (
                            <Lock className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Link
                              href={`/learn/paths/${slug}/module/${module.id}/lesson/${lesson.slug}`}
                              className="text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              Start →
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
