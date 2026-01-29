"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";

interface BattleTimerProps {
  timeRemaining: number;
  duration: number;
  isUrgent: boolean;
}

export function BattleTimer({
  timeRemaining,
  duration,
  isUrgent,
}: BattleTimerProps) {
  const progress = (timeRemaining / duration) * 100;

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg",
        isUrgent
          ? "bg-red-500/20 text-red-400 animate-pulse"
          : "bg-secondary/50"
      )}
    >
      <Clock className={cn("h-4 w-4", isUrgent && "text-red-400")} />
      <span className={cn("font-mono font-bold", isUrgent && "text-red-400")}>
        {formatDuration(timeRemaining)}
      </span>
      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-1000",
            isUrgent ? "bg-red-500" : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
