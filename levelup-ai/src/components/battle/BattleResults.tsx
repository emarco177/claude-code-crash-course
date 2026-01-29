"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, XCircle, Minus, Sparkles, Swords, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BattleResultsProps {
  winner: "user" | "opponent" | "draw" | null;
  user: {
    id: string;
    username: string;
    currentLevel: number;
  };
  opponent: {
    id: string;
    username: string;
    displayName: string | null;
    currentLevel: number;
  } | null;
  xpAwarded: number;
  breakdown: string[];
  testsPassed: number;
  testsTotal: number;
  onRematch: () => void;
  onNewBattle: () => void;
}

export function BattleResults({
  winner,
  user,
  opponent,
  xpAwarded,
  breakdown,
  testsPassed,
  testsTotal,
  onRematch,
  onNewBattle,
}: BattleResultsProps) {
  const isWinner = winner === "user";
  const isDraw = winner === "draw";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
      {/* Result Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className={cn(
          "flex h-32 w-32 items-center justify-center rounded-full",
          isWinner
            ? "bg-gradient-to-br from-yellow-400 to-orange-500 glow-xp"
            : isDraw
            ? "bg-gradient-to-br from-blue-400 to-purple-500"
            : "bg-gradient-to-br from-gray-400 to-gray-600"
        )}
      >
        {isWinner ? (
          <Trophy className="h-16 w-16 text-white" />
        ) : isDraw ? (
          <Minus className="h-16 w-16 text-white" />
        ) : (
          <XCircle className="h-16 w-16 text-white" />
        )}
      </motion.div>

      {/* Result Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-2"
      >
        <h1
          className={cn(
            "text-4xl font-bold",
            isWinner
              ? "gradient-xp bg-clip-text text-transparent"
              : isDraw
              ? "text-blue-400"
              : "text-muted-foreground"
          )}
        >
          {isWinner ? "Victory!" : isDraw ? "Draw!" : "Defeat"}
        </h1>
        <p className="text-muted-foreground">
          {isWinner
            ? "You solved the challenge first!"
            : isDraw
            ? "Both players tied!"
            : `${opponent?.displayName || opponent?.username || "Opponent"} won this round`}
        </p>
      </motion.div>

      {/* XP Awarded */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-3xl font-bold gradient-xp bg-clip-text text-transparent">
                +{xpAwarded} XP
              </span>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              {breakdown.map((item, index) => (
                <p key={index} className="text-center">
                  {item}
                </p>
              ))}
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-center text-sm">
                Tests Passed:{" "}
                <span className="font-mono font-bold">
                  {testsPassed}/{testsTotal}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Battle Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex items-center gap-8"
      >
        <div className="text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full mx-auto mb-2",
              isWinner ? "gradient-xp" : "bg-secondary"
            )}
          >
            <span className="font-bold text-xl">
              {user.currentLevel}
            </span>
          </div>
          <p className="font-medium">{user.username}</p>
          <p className="text-sm text-muted-foreground">You</p>
        </div>

        <div className="text-2xl font-bold text-muted-foreground">VS</div>

        {opponent && (
          <div className="text-center">
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full mx-auto mb-2",
                winner === "opponent" ? "gradient-xp" : "bg-secondary"
              )}
            >
              <span className="font-bold text-xl">
                {opponent.currentLevel}
              </span>
            </div>
            <p className="font-medium">
              {opponent.displayName || opponent.username}
            </p>
            <p className="text-sm text-muted-foreground">Opponent</p>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex gap-4"
      >
        <Button variant="outline" size="lg" onClick={onRematch}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Rematch
        </Button>
        <Button variant="glow" size="lg" onClick={onNewBattle}>
          <Swords className="h-4 w-4 mr-2" />
          New Battle
        </Button>
      </motion.div>
    </div>
  );
}
