import Link from "next/link";
import { getOrCreateUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XPBar } from "@/components/gamification/XPBar";
import { Badge } from "@/components/ui/badge";
import { Swords, Trophy, Zap, Target, TrendingUp, Flame } from "lucide-react";

export default async function DashboardPage() {
  const user = await getOrCreateUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">Welcome to LevelUp AI</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Battle your way to AI mastery. Compete in real-time coding challenges
            and climb the leaderboard.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="lg" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const winRate =
    user.battleWins + user.battleLosses > 0
      ? Math.round(
          (user.battleWins / (user.battleWins + user.battleLosses)) * 100
        )
      : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user.displayName || user.username}!
          </h1>
          <p className="text-muted-foreground">Ready to battle?</p>
        </div>
        <Button size="lg" variant="glow" asChild>
          <Link href="/battle" className="flex items-center gap-2">
            <Swords className="h-5 w-5" />
            Find Battle
          </Link>
        </Button>
      </div>

      {/* XP Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <XPBar
            totalXp={user.totalXp}
            currentLevel={user.currentLevel}
            showDetails
          />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Battles</CardTitle>
            <Swords className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.battleWins + user.battleLosses}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.battleWins} wins / {user.battleLosses} losses
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
              {user.battleWins > 0
                ? `${user.battleWins} victories`
                : "Play your first battle!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {user.winStreak}
              {user.winStreak >= 3 && (
                <Badge variant="xp" className="text-xs">
                  Hot!
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Best: {user.bestWinStreak}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold gradient-xp bg-clip-text text-transparent">
              Level {user.currentLevel}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.totalXp.toLocaleString()} total XP
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/battle">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Swords className="h-6 w-6 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Battle Arena</h3>
              <p className="text-sm text-muted-foreground">
                Challenge other coders in real-time
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/leaderboard">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Leaderboard</h3>
              <p className="text-sm text-muted-foreground">
                See top players and rankings
              </p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <Link href="/challenges">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                <Target className="h-6 w-6 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">Practice Mode</h3>
              <p className="text-sm text-muted-foreground">
                Sharpen your skills solo
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
