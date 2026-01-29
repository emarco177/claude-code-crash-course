/**
 * Learning Hub Page
 * Browse and enroll in learning paths
 */

import { PathCard } from "@/components/learning/PathCard";
import { GraduationCap, Sparkles } from "lucide-react";

async function getLearningPaths() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/learning/paths`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch paths");
    }

    const data = await response.json();
    return data.paths || [];
  } catch (error) {
    console.error("Error fetching paths:", error);
    return [];
  }
}

export default async function LearnPage() {
  const paths = await getLearningPaths();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Learn AI & ML Engineering
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Master machine learning, deep learning, and AI engineering through
            comprehensive learning paths. Theory meets practice.
          </p>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-gray-100">
              Featured Paths
            </h2>
          </div>

          {paths.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No learning paths available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paths.map((path: any) => (
                <PathCard
                  key={path.slug}
                  slug={path.slug}
                  title={path.title}
                  description={path.description}
                  category={path.category}
                  difficulty={path.difficulty}
                  xpReward={path.xpReward}
                  moduleCount={path.modules?.length || 0}
                  estimatedHours={Math.ceil(
                    (path.modules?.reduce(
                      (sum: number, m: any) => sum + (m.estimatedMinutes || 0),
                      0
                    ) || 0) / 60
                  )}
                  isPremium={path.isPremium}
                />
              ))}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">
            Browse by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "ML Fundamentals", count: paths.filter((p: any) => p.category === "ML_FUNDAMENTALS").length },
              { name: "Deep Learning", count: paths.filter((p: any) => p.category === "DEEP_LEARNING").length },
              { name: "NLP & Transformers", count: paths.filter((p: any) => p.category === "NLP").length },
              { name: "MLOps", count: paths.filter((p: any) => p.category === "MLOPS").length },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-cyan-500/50 transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-gray-100 mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">
                  {category.count} {category.count === 1 ? "path" : "paths"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
