import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { calculateBattleXP, checkLevelUp, getLevelFromXP } from "@/lib/gamification/xp";
import { getCurrentUser, getOrCreateUser } from "@/lib/auth";

interface TestCase {
  input: string;
  expected: string;
  hidden?: boolean;
}

// Piston API for code execution
const PISTON_API = "https://emkc.org/api/v2/piston";

async function executeCode(
  code: string,
  language: string,
  input: string
): Promise<{ output: string; error: string | null }> {
  const languageConfig: Record<string, { language: string; version: string }> = {
    python: { language: "python", version: "3.10" },
    typescript: { language: "typescript", version: "5.0.3" },
  };

  const config = languageConfig[language];
  if (!config) {
    return { output: "", error: `Unsupported language: ${language}` };
  }

  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: config.language,
        version: config.version,
        files: [{ content: code }],
        stdin: input,
        args: [],
        compile_timeout: 10000,
        run_timeout: 5000,
      }),
    });

    if (!response.ok) {
      return { output: "", error: "Code execution service unavailable" };
    }

    const data = await response.json();

    if (data.compile && data.compile.stderr) {
      return { output: "", error: data.compile.stderr };
    }

    if (data.run.stderr) {
      return { output: "", error: data.run.stderr };
    }

    return { output: data.run.stdout.trim(), error: null };
  } catch (error) {
    console.error("Piston API error:", error);
    return { output: "", error: "Failed to execute code" };
  }
}

export async function POST(request: NextRequest) {
  let clerkId: string | null = null;
  try {
    const authResult = await auth();
    clerkId = authResult.userId;
  } catch (error) {
    console.log("Clerk auth not available, checking mock session");
  }

  try {
    const { battleId, code } = await request.json();

    // Get user
    let user = clerkId
      ? await db.user.findUnique({
          where: { clerkId },
        })
      : await getCurrentUser();

    if (!user) {
      user = await getOrCreateUser();
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get battle with challenge and participants
    const battle = await db.battle.findUnique({
      where: { id: battleId },
      include: {
        challenge: true,
        participants: {
          include: { user: true },
        },
      },
    });

    if (!battle) {
      return NextResponse.json({ error: "Battle not found" }, { status: 404 });
    }

    if (battle.status !== "IN_PROGRESS") {
      return NextResponse.json(
        { error: "Battle is not in progress" },
        { status: 400 }
      );
    }

    // Get the participant record
    const participant = battle.participants.find((p) => p.userId === user.id);
    if (!participant) {
      return NextResponse.json(
        { error: "Not a participant in this battle" },
        { status: 403 }
      );
    }

    // Run all test cases (including hidden ones)
    const testCases = battle.challenge.testCases as TestCase[];
    const results = [];
    let testsPassed = 0;

    for (const testCase of testCases) {
      const { output, error } = await executeCode(
        code,
        battle.challenge.language,
        testCase.input
      );

      const passed = !error && output === testCase.expected;
      if (passed) testsPassed++;

      results.push({
        passed,
        input: testCase.hidden ? "[hidden]" : testCase.input,
        expected: testCase.hidden ? "[hidden]" : testCase.expected,
        actual: testCase.hidden ? (passed ? "[correct]" : "[incorrect]") : output,
        error: error || undefined,
      });
    }

    const allTestsPassed = testsPassed === testCases.length;
    const completionTime = battle.startedAt
      ? Date.now() - battle.startedAt.getTime()
      : null;

    // Update participant record
    await db.battleParticipant.update({
      where: { id: participant.id },
      data: {
        code,
        testsPassed,
        testsTotal: testCases.length,
        completionTime: allTestsPassed ? completionTime : null,
        score: allTestsPassed ? testsPassed * 100 + (completionTime ? Math.max(0, 10000 - completionTime / 100) : 0) : testsPassed * 10,
      },
    });

    // Create submission record
    await db.codeSubmission.create({
      data: {
        userId: user.id,
        challengeId: battle.challenge.id,
        code,
        testsPassed,
        testsTotal: testCases.length,
        executionTime: completionTime,
        passed: allTestsPassed,
      },
    });

    // If all tests passed, handle battle completion
    if (allTestsPassed) {
      // Check if this is the first to complete
      const otherParticipants = battle.participants.filter(
        (p) => p.userId !== user.id
      );
      const isFirstToComplete = !otherParticipants.some(
        (p) => p.testsPassed === testCases.length
      );

      // Calculate XP
      const previousSubmissions = await db.codeSubmission.count({
        where: {
          userId: user.id,
          challengeId: battle.challenge.id,
          passed: true,
        },
      });
      const isFirstTry = previousSubmissions === 1; // This is the first successful submission

      const xpResult = calculateBattleXP({
        isWinner: isFirstToComplete,
        isTimeout: false,
        isFirstTry,
        currentWinStreak: user.winStreak + (isFirstToComplete ? 1 : 0),
      });

      // Update user stats
      const newTotalXp = user.totalXp + xpResult.totalXP;
      const newLevel = getLevelFromXP(newTotalXp);
      const newWinStreak = isFirstToComplete ? user.winStreak + 1 : 0;

      await db.user.update({
        where: { id: user.id },
        data: {
          totalXp: newTotalXp,
          currentLevel: newLevel,
          battleWins: isFirstToComplete ? user.battleWins + 1 : user.battleWins,
          battleLosses: isFirstToComplete ? user.battleLosses : user.battleLosses + 1,
          winStreak: newWinStreak,
          bestWinStreak: Math.max(user.bestWinStreak, newWinStreak),
        },
      });

      // Update participant XP awarded
      await db.battleParticipant.update({
        where: { id: participant.id },
        data: {
          xpAwarded: xpResult.totalXP,
          rank: isFirstToComplete ? 1 : 2,
        },
      });

      // Complete the battle if first to finish
      if (isFirstToComplete) {
        await db.battle.update({
          where: { id: battle.id },
          data: {
            status: "COMPLETED",
            endedAt: new Date(),
          },
        });
      }

      // Check for level up
      const levelUp = checkLevelUp(user.totalXp, newTotalXp);

      return NextResponse.json({
        allTestsPassed: true,
        results,
        xpAwarded: xpResult.totalXP,
        breakdown: xpResult.breakdown,
        leveledUp: levelUp.leveledUp,
        newLevel: levelUp.newLevel,
      });
    }

    // Not all tests passed
    return NextResponse.json({
      allTestsPassed: false,
      results,
    });
  } catch (error) {
    console.error("Submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit solution" },
      { status: 500 }
    );
  }
}
