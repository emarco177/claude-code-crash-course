"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Swords, Loader2, Users, Clock, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface BattleLobbyProps {
  user: {
    id: string;
    username: string;
    currentLevel: number;
    battleWins: number;
    winStreak: number;
  };
}

type Difficulty = "EASY" | "MEDIUM" | "HARD";
type Language = "python" | "typescript";

const difficultyConfig = {
  EASY: {
    label: "Easy",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    xpMultiplier: 1,
    duration: "5 min",
  },
  MEDIUM: {
    label: "Medium",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    xpMultiplier: 1.5,
    duration: "7 min",
  },
  HARD: {
    label: "Hard",
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    xpMultiplier: 2,
    duration: "10 min",
  },
};

export function BattleLobby({ user }: BattleLobbyProps) {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const [language, setLanguage] = useState<Language>("python");
  const [isSearching, setIsSearching] = useState(false);
  const [queueTime, setQueueTime] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startMatchmaking = async () => {
    setIsSearching(true);
    setQueueTime(0);
     setErrorMessage(null);

    // Start queue timer
    const timer = setInterval(() => {
      setQueueTime((prev) => prev + 1);
    }, 1000);

    try {
      const response = await fetch("/api/battle/matchmake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ difficulty, language }),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // Ignore JSON parsing errors for empty responses
      }

      if (!response.ok) {
        throw new Error(data?.error || "Failed to find a match.");
      }

      if (data.battleId) {
        router.push(`/battle/${data.battleId}`);
      } else {
        setErrorMessage("No battle available right now. Try again in a moment.");
      }
    } catch (error) {
      console.error("Matchmaking error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to start a battle."
      );
      setIsSearching(false);
    } finally {
      clearInterval(timer);
    }
  };

  const cancelMatchmaking = () => {
    setIsSearching(false);
    setQueueTime(0);
  };

  const config = difficultyConfig[difficulty];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Swords className="h-8 w-8 text-primary" />
          Battle Arena
        </h1>
        <p className="text-muted-foreground">
          Challenge other coders in real-time coding battles
        </p>
      </div>

      {/* User Stats */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-primary text-white font-bold">
                {user.currentLevel}
              </div>
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-muted-foreground">
                  {user.battleWins} wins
                  {user.winStreak > 0 && (
                    <span className="ml-2 text-yellow-400">
                      {user.winStreak} streak
                    </span>
                  )}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-sm">
              Level {user.currentLevel}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-sm px-4 py-3 rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Battle Configuration */}
      {!isSearching ? (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Difficulty Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Difficulty</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(Object.keys(difficultyConfig) as Difficulty[]).map((diff) => {
                const cfg = difficultyConfig[diff];
                const isSelected = difficulty === diff;

                return (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={cn(
                      "w-full p-4 rounded-lg border-2 transition-all text-left",
                      isSelected
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-secondary/50 hover:bg-secondary"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={cn("font-semibold", cfg.color)}>
                          {cfg.label}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {cfg.duration} time limit
                        </p>
                      </div>
                      <Badge variant="outline" className={cfg.color}>
                        {cfg.xpMultiplier}x XP
                      </Badge>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Language Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Select Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <button
                onClick={() => setLanguage("python")}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all text-left",
                  language === "python"
                    ? "border-primary bg-primary/10"
                    : "border-transparent bg-secondary/50 hover:bg-secondary"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10">
                    <span className="text-xl">🐍</span>
                  </div>
                  <div>
                    <p className="font-semibold">Python</p>
                    <p className="text-sm text-muted-foreground">
                      Great for AI/ML challenges
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setLanguage("typescript")}
                className={cn(
                  "w-full p-4 rounded-lg border-2 transition-all text-left",
                  language === "typescript"
                    ? "border-primary bg-primary/10"
                    : "border-transparent bg-secondary/50 hover:bg-secondary"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <span className="text-xl">📘</span>
                  </div>
                  <div>
                    <p className="font-semibold">TypeScript</p>
                    <p className="text-sm text-muted-foreground">
                      Perfect for API integrations
                    </p>
                  </div>
                </div>
              </button>

              {/* Battle Info */}
              <div className="mt-6 p-4 rounded-lg bg-secondary/30 space-y-3">
                <h4 className="font-medium">Battle Rules</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {config.duration} time limit
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    1v1 real-time battle
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="h-4 w-4" />
                    First to pass all tests wins
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Up to {100 * config.xpMultiplier} XP for winning
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Searching State */
        <Card className="glass">
          <CardContent className="py-12">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-4 border-primary/30 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">Finding Opponent...</h3>
                <p className="text-muted-foreground">
                  Searching for a {config.label.toLowerCase()} {language} battle
                </p>
                <p className="text-sm text-muted-foreground">
                  Queue time: {queueTime}s
                </p>
              </div>
              <Button variant="outline" onClick={cancelMatchmaking}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Battle Button */}
      {!isSearching && (
        <Button
          size="xl"
          variant="glow"
          className="w-full"
          onClick={startMatchmaking}
        >
          <Swords className="h-5 w-5 mr-2" />
          Find Battle
        </Button>
      )}
    </div>
  );
}
