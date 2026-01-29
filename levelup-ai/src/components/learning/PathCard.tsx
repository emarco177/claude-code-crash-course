"use client";

/**
 * Path Card Component
 * Displays a learning path preview card
 */

import Link from "next/link";
import { Book, Clock, Trophy } from "lucide-react";

interface PathCardProps {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  xpReward: number;
  moduleCount: number;
  estimatedHours?: number;
  isPremium?: boolean;
  progress?: number;
}

export function PathCard({
  slug,
  title,
  description,
  category,
  difficulty,
  xpReward,
  moduleCount,
  estimatedHours = 0,
  isPremium = false,
  progress,
}: PathCardProps) {
  const difficultyColors = {
    BEGINNER: "text-green-400 bg-green-400/10",
    INTERMEDIATE: "text-yellow-400 bg-yellow-400/10",
    ADVANCED: "text-red-400 bg-red-400/10",
  };

  const difficultyColor =
    difficultyColors[difficulty as keyof typeof difficultyColors] ||
    difficultyColors.BEGINNER;

  return (
    <Link href={`/learn/paths/${slug}`}>
      <div
        className="group relative bg-gray-900/50 border border-gray-800 rounded-lg p-6
        hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10
        transition-all duration-300 cursor-pointer"
      >
        {/* Premium Badge */}
        {isPremium && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 text-black rounded">
              PRO
            </span>
          </div>
        )}

        {/* Category Tag */}
        <div className="mb-3">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {category.replace(/_/g, " ")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Metadata */}
        <div className="flex items-center gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <Book className="w-4 h-4" />
            <span>{moduleCount} modules</span>
          </div>

          {estimatedHours > 0 && (
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{estimatedHours}h</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-gray-400">
            <Trophy className="w-4 h-4" />
            <span>{xpReward} XP</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${difficultyColor}`}>
            {difficulty}
          </span>

          {/* Progress Bar (if enrolled) */}
          {progress !== undefined && (
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
