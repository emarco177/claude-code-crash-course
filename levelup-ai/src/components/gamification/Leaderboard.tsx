"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, Flame, TrendingUp } from "lucide-react";
import { cn, formatXP } from "@/lib/utils";

interface LeaderboardUser {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  totalXp: number;
  currentLevel: number;
  battleWins: number;
  battleLosses: number;
  winStreak: number;
  bestWinStreak: number;
}

interface LeaderboardProps {
  users: LeaderboardUser[];
  currentUserId: string | null;
  currentUserRank: number | null;
}

function getRankIcon(rank: number) {
  if (rank === 1) {
    return <Trophy className="h-5 w-5 text-yellow-400" />;
  }
  if (rank === 2) {
    return <Medal className="h-5 w-5 text-gray-300" />;
  }
  if (rank === 3) {
    return <Award className="h-5 w-5 text-amber-600" />;
  }
  return (
    <span className="w-5 text-center font-mono text-muted-foreground">
      {rank}
    </span>
  );
}

function getRankBg(rank: number) {
  if (rank === 1) return "bg-yellow-500/10 border-yellow-500/30";
  if (rank === 2) return "bg-gray-400/10 border-gray-400/30";
  if (rank === 3) return "bg-amber-600/10 border-amber-600/30";
  return "";
}

export function Leaderboard({
  users,
  currentUserId,
  currentUserRank,
}: LeaderboardProps) {
  const [sortBy, setSortBy] = useState<"xp" | "wins" | "streak">("xp");

  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === "xp") return b.totalXp - a.totalXp;
    if (sortBy === "wins") return b.battleWins - a.battleWins;
    if (sortBy === "streak") return b.bestWinStreak - a.bestWinStreak;
    return 0;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-400" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">
          Top coders in the LevelUp AI arena
        </p>
      </div>

      {/* Current User Rank */}
      {currentUserId && currentUserRank && currentUserRank > 10 && (
        <Card className="glass border-primary/30">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Your Rank</span>
              <span className="font-bold text-lg">#{currentUserRank}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sort Tabs */}
      <Tabs
        defaultValue="xp"
        onValueChange={(v) => setSortBy(v as typeof sortBy)}
      >
        <TabsList className="w-full">
          <TabsTrigger value="xp" className="flex-1">
            <TrendingUp className="h-4 w-4 mr-2" />
            XP
          </TabsTrigger>
          <TabsTrigger value="wins" className="flex-1">
            <Trophy className="h-4 w-4 mr-2" />
            Wins
          </TabsTrigger>
          <TabsTrigger value="streak" className="flex-1">
            <Flame className="h-4 w-4 mr-2" />
            Best Streak
          </TabsTrigger>
        </TabsList>

        <TabsContent value="xp" className="mt-4">
          <LeaderboardList
            users={sortedUsers}
            currentUserId={currentUserId}
            valueKey="totalXp"
            formatValue={(v) => `${formatXP(v)} XP`}
          />
        </TabsContent>

        <TabsContent value="wins" className="mt-4">
          <LeaderboardList
            users={sortedUsers}
            currentUserId={currentUserId}
            valueKey="battleWins"
            formatValue={(v) => `${v} wins`}
          />
        </TabsContent>

        <TabsContent value="streak" className="mt-4">
          <LeaderboardList
            users={sortedUsers}
            currentUserId={currentUserId}
            valueKey="bestWinStreak"
            formatValue={(v) => `${v} streak`}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LeaderboardList({
  users,
  currentUserId,
  valueKey,
  formatValue,
}: {
  users: LeaderboardUser[];
  currentUserId: string | null;
  valueKey: keyof LeaderboardUser;
  formatValue: (value: number) => string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          {users.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.id === currentUserId;
            const value = user[valueKey] as number;

            return (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-secondary/50",
                  getRankBg(rank),
                  isCurrentUser && "ring-2 ring-primary"
                )}
              >
                {/* Rank */}
                <div className="w-8 flex items-center justify-center">
                  {getRankIcon(rank)}
                </div>

                {/* Avatar */}
                <Avatar>
                  <AvatarImage src={user.avatarUrl ?? undefined} />
                  <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {user.displayName || user.username}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs text-primary">(You)</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Level {user.currentLevel}
                  </p>
                </div>

                {/* Value */}
                <div className="text-right">
                  <p className="font-bold">{formatValue(value)}</p>
                  {user.winStreak > 0 && (
                    <Badge variant="xp" className="text-xs">
                      <Flame className="h-3 w-3 mr-1" />
                      {user.winStreak}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}

          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users on the leaderboard yet. Be the first!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
