import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getCurrentUser, getOrCreateUser } from "@/lib/auth";

function getTestCaseCount(testCases: unknown): number {
  if (Array.isArray(testCases)) {
    return testCases.length;
  }

  if (typeof testCases === "string") {
    try {
      const parsed = JSON.parse(testCases);
      if (Array.isArray(parsed)) {
        return parsed.length;
      }
    } catch {
      // fall through
    }
  }

  return 0;
}

export async function POST(request: NextRequest) {
  let clerkId: string | null = null;
  try {
    const authResult = await auth();
    clerkId = authResult.userId;
  } catch (error) {
    console.log("Clerk auth not available, falling back to mock user");
  }

  try {
    const { difficulty, language } = await request.json();

    // Get the user
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

    // Find an available battle (waiting for opponent)
    let battle = await db.battle.findFirst({
      where: {
        status: "WAITING",
        challenge: {
          difficulty,
          language,
        },
        participants: {
          none: {
            userId: user.id,
          },
        },
      },
      include: {
        challenge: true,
        participants: true,
      },
    });

    if (battle) {
      // Join existing battle
      await db.battleParticipant.create({
        data: {
          battleId: battle.id,
          userId: user.id,
          testsTotal: getTestCaseCount(battle.challenge.testCases),
        },
      });

      // Start the battle
      await db.battle.update({
        where: { id: battle.id },
        data: {
          status: "IN_PROGRESS",
          startedAt: new Date(),
        },
      });

      return NextResponse.json({ battleId: battle.id });
    }

    // No available battle, create new one
    // First, get a random challenge matching criteria
    const challenges = await db.challenge.findMany({
      where: {
        difficulty,
        language,
      },
    });

    if (challenges.length === 0) {
      return NextResponse.json(
        { error: "No challenges available" },
        { status: 404 }
      );
    }

    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];

    // Determine duration based on difficulty
    const durationMap = {
      EASY: 300, // 5 minutes
      MEDIUM: 420, // 7 minutes
      HARD: 600, // 10 minutes
    };

    // Create new battle
    battle = await db.battle.create({
      data: {
        challengeId: randomChallenge.id,
        status: "WAITING",
        duration: durationMap[difficulty as keyof typeof durationMap] || 300,
        participants: {
          create: {
            userId: user.id,
            testsTotal: getTestCaseCount(randomChallenge.testCases),
          },
        },
      },
      include: {
        challenge: true,
        participants: true,
      },
    });

    // In a real app, we'd wait for another player or match with a bot
    // For demo, let's simulate finding an opponent after a delay
    // The frontend will poll or use WebSocket to check for match

    // For now, start immediately (solo practice mode)
    await db.battle.update({
      where: { id: battle.id },
      data: {
        status: "IN_PROGRESS",
        startedAt: new Date(),
      },
    });

    return NextResponse.json({ battleId: battle.id });
  } catch (error) {
    console.error("Matchmaking error:", error);
    return NextResponse.json(
      { error: "Failed to find match" },
      { status: 500 }
    );
  }
}
