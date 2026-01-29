"use client";

import { Progress } from "@/components/ui/progress";
import { cn, formatXP } from "@/lib/utils";
import { calculateLevelProgress, getXPForLevel } from "@/lib/gamification/xp";
import { Sparkles } from "lucide-react";

interface XPBarProps {
  totalXp: number;
  currentLevel: number;
  className?: string;
  showDetails?: boolean;
}

export function XPBar({
  totalXp,
  currentLevel,
  className,
  showDetails = true,
}: XPBarProps) {
  const { currentLevelXP, nextLevelXP, progressPercent } = calculateLevelProgress(totalXp);

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-xp text-black font-bold text-sm">
          {currentLevel}
        </div>
      </div>
      <div className="flex-1">
        <Progress
          value={progressPercent}
          className="h-2"
          indicatorClassName="gradient-xp"
        />
        {showDetails && (
          <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-400" />
              {formatXP(totalXp)} XP
            </span>
            <span>
              {formatXP(currentLevelXP)} / {formatXP(nextLevelXP)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
