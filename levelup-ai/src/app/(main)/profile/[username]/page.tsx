import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { XPBar } from "@/components/gamification/XPBar";
import {
  Trophy,
  Swords,
  Flame,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const currentUser = await getOrCreateUser();

  const user = await db.user.findUnique({
    where: { username },
    include: {
      achievements: {
        include: { achievement: true },
        orderBy: { unlockedAt: "desc" },
        take: 6,
      },
      _count: {
        select: {
          battles: true,
          submissions: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const isOwnProfile = currentUser?.id === user.id;
  const totalBattles = user.battleWins + user.battleLosses;
  const winRate =
    totalBattles > 0 ? Math.round((user.battleWins / totalBattles) * 100) : 0;

  // Get recent battle history
  const recentBattles = await db.battleParticipant.findMany({
    where: { userId: user.id },
    include: {
      battle: {
        include: {
          challenge: {
            select: { title: true, difficulty: true },
          },
        },
      },
    },
    orderBy: { battle: { createdAt: "desc" } },
    take: 5,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="glass">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary">
              <AvatarImage src={user.avatarUrl ?? undefined} />
              <AvatarFallback className="text-2xl">
                {user.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {user.displayName || user.username}
                </h1>
                {isOwnProfile && (
                  <Badge variant="outline" className="w-fit mx-auto sm:mx-0">
                    You
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">@{user.username}</p>

              <div className="mt-4 max-w-md">
                <XPBar
                  totalXp={user.totalXp}
                  currentLevel={user.currentLevel}
                  showDetails
                />
              </div>
            </div>

            <div className="flex gap-4 text-center">
              <div>
                <p className="text-2xl font-bold gradient-xp bg-clip-text text-transparent">
                  {user.currentLevel}
                </p>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{user.totalXp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Battles</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBattles}</div>
            <p className="text-xs text-muted-foreground">
              {user.battleWins}W / {user.battleLosses}L
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate}%</div>
            <p className="text-xs text-muted-foreground">
              {user.battleWins} victories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {user.winStreak}
              {user.winStreak >= 3 && (
                <Badge variant="xp" className="text-xs">Hot!</Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Best: {user.bestWinStreak}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submissions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user._count.submissions}</div>
            <p className="text-xs text-muted-foreground">Code submissions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Battles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Battles
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentBattles.length > 0 ? (
              <div className="space-y-3">
                {recentBattles.map((bp) => {
                  const isWinner = bp.rank === 1;
                  const difficultyColors = {
                    EASY: "easy",
                    MEDIUM: "medium",
                    HARD: "hard",
                  } as const;

                  return (
                    <div
                      key={bp.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            isWinner ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-sm">
                            {bp.battle.challenge.title}
                          </p>
                          <Badge
                            variant={difficultyColors[bp.battle.challenge.difficulty]}
                            className="text-xs"
                          >
                            {bp.battle.challenge.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isWinner ? "text-green-400" : "text-red-400"}`}>
                          {isWinner ? "Won" : "Lost"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          +{bp.xpAwarded} XP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No battles yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-400" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.achievements.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {user.achievements.map((ua) => (
                  <div
                    key={ua.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
                  >
                    <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{ua.achievement.title}</p>
                      <p className="text-xs text-muted-foreground">
                        +{ua.achievement.xpReward} XP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No achievements yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Member Since */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              Member since{" "}
              {user.createdAt.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
