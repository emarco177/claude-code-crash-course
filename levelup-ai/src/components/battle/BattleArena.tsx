"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CodeEditor } from "./CodeEditor";
import { TestResults } from "./TestResults";
import { BattleTimer } from "./BattleTimer";
import { BattleResults } from "./BattleResults";
import {
  Play,
  Send,
  User,
  CheckCircle,
  XCircle,
  Loader2,
  Swords,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BattleArenaProps {
  battleId: string;
  challenge: {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    language: string;
    starterCode: string;
    testCases:
      | Array<{ input: string; expected: string; hidden?: boolean }>
      | string;
  };
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
  duration: number;
  status: "WAITING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  savedCode?: string;
}

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual?: string;
  error?: string;
}

export function BattleArena({
  battleId,
  challenge,
  user,
  opponent,
  duration,
  status: initialStatus,
  savedCode,
}: BattleArenaProps) {
  const router = useRouter();
  const normalizedTestCases: Array<{ input: string; expected: string; hidden?: boolean }> = Array.isArray(challenge.testCases)
    ? challenge.testCases
    : (() => {
        if (typeof challenge.testCases === "string") {
          try {
            return JSON.parse(challenge.testCases);
          } catch {
            return [];
          }
        }
        return [];
      })();

  const visibleTestCases = normalizedTestCases.filter(
    (tc: { hidden?: boolean }) => !tc.hidden
  );

  const [code, setCode] = useState(savedCode || challenge.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [battleStatus, setBattleStatus] = useState(initialStatus);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [opponentProgress, setOpponentProgress] = useState({
    testsPassed: 0,
    testsTotal: normalizedTestCases.length,
  });
  const [battleResult, setBattleResult] = useState<{
    winner: "user" | "opponent" | "draw" | null;
    xpAwarded: number;
    breakdown: string[];
  } | null>(null);

  // Countdown timer
  useEffect(() => {
    if (battleStatus !== "IN_PROGRESS") return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [battleStatus]);

  // Simulate opponent progress (in real app, this would be WebSocket)
  useEffect(() => {
    if (battleStatus !== "IN_PROGRESS" || !opponent) return;

    const interval = setInterval(() => {
      setOpponentProgress((prev) => {
        if (prev.testsPassed >= prev.testsTotal) return prev;
        if (Math.random() > 0.7) {
          return { ...prev, testsPassed: prev.testsPassed + 1 };
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [battleStatus, opponent]);

  const handleTimeUp = async () => {
    setBattleStatus("COMPLETED");
    // Determine winner based on tests passed
    const userTestsPassed = testResults.filter((r) => r.passed).length;
    const opponentTestsPassed = opponentProgress.testsPassed;

    let winner: "user" | "opponent" | "draw";
    if (userTestsPassed > opponentTestsPassed) {
      winner = "user";
    } else if (opponentTestsPassed > userTestsPassed) {
      winner = "opponent";
    } else {
      winner = "draw";
    }

    setBattleResult({
      winner,
      xpAwarded: winner === "user" ? 75 : 25,
      breakdown:
        winner === "user"
          ? ["Timeout Win: +75 XP"]
          : ["Participation: +25 XP"],
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setTestResults([]);

    try {
      const response = await fetch("/api/code/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          language: challenge.language,
          testCases: visibleTestCases,
        }),
      });

      const data = await response.json();
      setTestResults(data.results);
    } catch (error) {
      console.error("Code execution error:", error);
      setTestResults([
        {
          passed: false,
          input: "",
          expected: "",
          error: "Failed to execute code",
        },
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  const submitSolution = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/battle/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          battleId,
          code,
        }),
      });

      const data = await response.json();

      if (data.allTestsPassed) {
        setBattleStatus("COMPLETED");
        setBattleResult({
          winner: "user",
          xpAwarded: data.xpAwarded,
          breakdown: data.breakdown,
        });
      } else {
        setTestResults(data.results);
      }
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const difficultyColors = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard",
  } as const;

  // Show results screen
  if (battleStatus === "COMPLETED" && battleResult) {
    return (
      <BattleResults
        winner={battleResult.winner}
        user={user}
        opponent={opponent}
        xpAwarded={battleResult.xpAwarded}
        breakdown={battleResult.breakdown}
        testsPassed={testResults.filter((r) => r.passed).length}
        testsTotal={normalizedTestCases.length}
        onRematch={() => router.push("/battle")}
        onNewBattle={() => router.push("/battle")}
      />
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant={difficultyColors[challenge.difficulty]}>
            {challenge.difficulty}
          </Badge>
          <h1 className="text-xl font-bold">{challenge.title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Opponent Status */}
          {opponent && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {opponent.displayName || opponent.username}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">
                  {opponentProgress.testsPassed}/{opponentProgress.testsTotal}
                </span>
                {opponentProgress.testsPassed === opponentProgress.testsTotal ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Progress
                    value={
                      (opponentProgress.testsPassed /
                        opponentProgress.testsTotal) *
                      100
                    }
                    className="w-16 h-2"
                  />
                )}
              </div>
            </div>
          )}

          {/* Timer */}
          <BattleTimer
            timeRemaining={timeRemaining}
            duration={duration}
            isUrgent={timeRemaining < 60}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* Left: Problem + Test Results */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* Problem Description */}
          <Card className="flex-1 overflow-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {challenge.description}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card className="h-48 overflow-auto">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Test Results</span>
                {testResults.length > 0 && (
                  <Badge
                    variant={
                      testResults.every((r) => r.passed)
                        ? "default"
                        : "destructive"
                    }
                  >
                    {testResults.filter((r) => r.passed).length}/
                    {testResults.length} passed
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TestResults results={testResults} isLoading={isRunning} />
            </CardContent>
          </Card>
        </div>

        {/* Right: Code Editor */}
        <div className="flex flex-col gap-4 min-h-0">
          <Card className="flex-1 overflow-hidden">
            <CardContent className="p-0 h-full">
              <CodeEditor
                value={code}
                onChange={setCode}
                language={challenge.language}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={runCode}
              disabled={isRunning || isSubmitting}
            >
              {isRunning ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Run Tests
            </Button>
            <Button
              variant="glow"
              className="flex-1"
              onClick={submitSolution}
              disabled={isRunning || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Submit Solution
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
