import Link from "next/link";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, Code, Zap, Clock } from "lucide-react";
import { AITipButton } from "@/components/challenges/AITipButton";

export default async function ChallengesPage() {
  const challenges = await db.challenge.findMany({
    orderBy: [{ difficulty: "asc" }, { createdAt: "desc" }],
  });

  const pythonChallenges = challenges.filter((c) => c.language === "python");
  const tsChallenges = challenges.filter((c) => c.language === "typescript");

  const difficultyConfig = {
    EASY: {
      variant: "easy" as const,
      time: "5 min",
      xp: 25,
    },
    MEDIUM: {
      variant: "medium" as const,
      time: "7 min",
      xp: 50,
    },
    HARD: {
      variant: "hard" as const,
      time: "10 min",
      xp: 100,
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-green-500" />
          Practice Challenges
        </h1>
        <p className="text-muted-foreground">
          Sharpen your skills before battling. No pressure, no timer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-green-400">
              {challenges.filter((c) => c.difficulty === "EASY").length}
            </p>
            <p className="text-sm text-muted-foreground">Easy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {challenges.filter((c) => c.difficulty === "MEDIUM").length}
            </p>
            <p className="text-sm text-muted-foreground">Medium</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-red-400">
              {challenges.filter((c) => c.difficulty === "HARD").length}
            </p>
            <p className="text-sm text-muted-foreground">Hard</p>
          </CardContent>
        </Card>
      </div>

      {/* Challenge Lists */}
      <Tabs defaultValue="python">
        <TabsList className="w-full">
          <TabsTrigger value="python" className="flex-1">
            <span className="mr-2">🐍</span> Python ({pythonChallenges.length})
          </TabsTrigger>
          <TabsTrigger value="typescript" className="flex-1">
            <span className="mr-2">📘</span> TypeScript ({tsChallenges.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="python" className="mt-4">
          <ChallengeList
            challenges={pythonChallenges}
            difficultyConfig={difficultyConfig}
          />
        </TabsContent>

        <TabsContent value="typescript" className="mt-4">
          <ChallengeList
            challenges={tsChallenges}
            difficultyConfig={difficultyConfig}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChallengeList({
  challenges,
  difficultyConfig,
}: {
  challenges: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    tags: string[];
    xpReward: number;
    language: string;
  }>;
  difficultyConfig: Record<
    "EASY" | "MEDIUM" | "HARD",
    { variant: "easy" | "medium" | "hard"; time: string; xp: number }
  >;
}) {
  if (challenges.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No challenges available for this language yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {challenges.map((challenge) => {
        const config = difficultyConfig[challenge.difficulty];
        const tagsArray = Array.isArray(challenge.tags)
          ? challenge.tags
          : typeof challenge.tags === "string"
            ? challenge.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
            : [];

        return (
          <Card
            key={challenge.id}
            className="hover:border-primary/50 transition-colors"
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{challenge.title}</h3>
                    <Badge variant={config.variant}>{challenge.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                    {challenge.description.split("\n")[0]}
                  </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {config.time}
          </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-yellow-400" />
                      {config.xp} XP
                    </span>
                    <div className="flex gap-1">
                      {tagsArray.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/battle?practice=${challenge.id}`}>
                    <Code className="h-4 w-4 mr-2" />
                    Practice
                  </Link>
                </Button>
              </div>
              <AITipButton
                challengeTitle={challenge.title}
                difficulty={challenge.difficulty}
                tags={tagsArray}
                language={challenge.language}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
