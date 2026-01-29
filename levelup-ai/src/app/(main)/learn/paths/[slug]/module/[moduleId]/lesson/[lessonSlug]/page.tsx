/**
 * Lesson Viewer Page
 * Display lesson content with markdown rendering
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { MarkdownViewer } from "@/components/learning/MarkdownViewer";
import { CheckCircle, Clock, Trophy, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

async function getLessonContent(
  pathSlug: string,
  moduleId: string,
  lessonSlug: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/learning/lessons/${pathSlug}/${moduleId}/${lessonSlug}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching lesson:", error);
    return null;
  }
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string; lessonSlug: string }>;
}) {
  const resolvedParams = await params;
  const { slug, moduleId, lessonSlug } = resolvedParams;
  const data = await getLessonContent(slug, moduleId, lessonSlug);

  if (!data || !data.lesson) {
    notFound();
  }

  const { lesson, progress } = data;
  const isCompleted = progress?.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/learn/paths/${slug}`}
            className="text-sm text-cyan-400 hover:text-cyan-300 mb-4 inline-block"
          >
            ← Back to Path
          </Link>

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-100 mb-3">
                {lesson.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.estimatedMinutes} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{lesson.xpReward} XP</span>
                </div>
                {isCompleted && (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="mb-12">
          {renderLessonContent(lesson)}
        </div>

        {/* Complete Lesson Button */}
        {!isCompleted && (
          <div className="border-t border-gray-800 pt-8">
            <form
              action={`/api/learning/lessons/${slug}/${moduleId}/${lessonSlug}`}
              method="POST"
            >
              <input type="hidden" name="completionTime" value="0" />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mark as Complete
              </button>
            </form>
          </div>
        )}

        {isCompleted && (
          <div className="border-t border-gray-800 pt-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-400 mb-2">
                Lesson Completed!
              </h3>
              <p className="text-gray-400">
                You earned {lesson.xpReward} XP for completing this lesson.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function renderLessonContent(lesson: {
  contentType: string;
  content: string;
  data?: Record<string, unknown>;
}) {
  if (lesson.contentType === "ARTICLE") {
    return <MarkdownViewer content={lesson.content} />;
  }

  if (lesson.contentType === "QUIZ") {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-100 mb-4">
          Quiz Component
        </h2>
        <p className="text-gray-400 mb-6">
          Quiz functionality will be implemented soon.
        </p>
        <pre className="text-left text-xs text-gray-500 bg-gray-950 p-4 rounded overflow-auto">
          {lesson.content}
        </pre>
      </div>
    );
  }

  if (lesson.contentType === "CODE_CHALLENGE") {
    const challenge =
      lesson.data ||
      (() => {
        try {
          return JSON.parse(lesson.content);
        } catch {
          return null;
        }
      })();

    if (!challenge) {
      return (
        <div className="text-gray-400">
          Unable to load coding challenge details.
        </div>
      );
    }

    const objectives = Array.isArray(challenge.objectives)
      ? challenge.objectives
      : [];
    const tests = Array.isArray(challenge.tests) ? challenge.tests : [];
    const hints = Array.isArray(challenge.hints) ? challenge.hints : [];

    const formatValue = (value: unknown) => {
      if (typeof value === "string") return value;
      return JSON.stringify(value, null, 2);
    };

    return (
      <div className="space-y-6">
        <Card className="bg-gray-900/50 border border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{challenge.title || "Coding Lab"}</span>
              <Badge variant="outline">
                {challenge.language?.toUpperCase() || "LANG"}
              </Badge>
            </CardTitle>
            <p className="text-sm text-gray-400">
              {challenge.description ||
                "Complete this hands-on exercise to solidify the concept."}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenge.difficulty && (
              <div className="text-xs uppercase tracking-wide text-gray-400">
                Difficulty: {challenge.difficulty}
              </div>
            )}
            {objectives.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-200 mb-2">
                  Objectives
                </p>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {objectives.map((objective) => (
                    <li key={objective as string}>{objective as string}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {challenge.starterCode && (
          <Card className="bg-gray-950 border border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Code className="w-4 h-4 text-cyan-400" />
                Starter Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-black/40 p-4 rounded overflow-auto">
                {challenge.starterCode}
              </pre>
            </CardContent>
          </Card>
        )}

        {tests.length > 0 && (
          <Card className="bg-gray-900/50 border border-gray-800">
            <CardHeader>
              <CardTitle className="text-base">Sample Tests</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tests.map((test) => (
                <div
                  key={(test as { name?: string }).name ?? JSON.stringify(test)}
                  className="bg-gray-950/60 border border-gray-800 rounded-lg p-4"
                >
                  <p className="text-sm font-semibold text-gray-100 mb-2">
                    {(test as { name?: string }).name || "Test Case"}
                  </p>
                  {Object.entries(test).map(([key, value]) => {
                    if (key === "name") return null;
                    return (
                      <div key={key} className="mb-2">
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {key}
                        </p>
                        <pre className="text-xs bg-black/40 p-3 rounded overflow-auto text-gray-300">
                          {formatValue(value)}
                        </pre>
                      </div>
                    );
                  })}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {hints.length > 0 && (
          <Card className="bg-gray-900/50 border border-cyan-900/50">
            <CardHeader>
              <CardTitle className="text-base">Hints</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {hints.map((hint) => (
                  <li key={hint as string}>{hint as string}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="text-gray-400">
      Unsupported content type: {lesson.contentType}
    </div>
  );
}
