import { getOrCreateUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BattleArena } from "@/components/battle/BattleArena";
import { db } from "@/lib/db";

export default async function BattleArenaPage({
  params,
}: {
  params: Promise<{ battleId: string }>;
}) {
  const { battleId } = await params;
  const user = await getOrCreateUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Get battle details
  const battle = await db.battle.findUnique({
    where: { id: battleId },
    include: {
      challenge: true,
      participants: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatarUrl: true,
              currentLevel: true,
            },
          },
        },
      },
    },
  });

  if (!battle) {
    redirect("/battle");
  }

  // Check if user is a participant
  const isParticipant = battle.participants.some((p) => p.userId === user.id);
  if (!isParticipant) {
    redirect("/battle");
  }

  const opponent = battle.participants.find((p) => p.userId !== user.id)?.user;
  const currentParticipant = battle.participants.find(
    (p) => p.userId === user.id
  );

  return (
    <BattleArena
      battleId={battle.id}
      challenge={{
        id: battle.challenge.id,
        title: battle.challenge.title,
        description: battle.challenge.description,
        difficulty: battle.challenge.difficulty,
        language: battle.challenge.language,
        starterCode: battle.challenge.starterCode,
        testCases: battle.challenge.testCases as Array<{
          input: string;
          expected: string;
          hidden?: boolean;
        }>,
      }}
      user={{
        id: user.id,
        username: user.username,
        currentLevel: user.currentLevel,
      }}
      opponent={
        opponent
          ? {
              id: opponent.id,
              username: opponent.username,
              displayName: opponent.displayName,
              currentLevel: opponent.currentLevel,
            }
          : null
      }
      duration={battle.duration}
      status={battle.status}
      savedCode={currentParticipant?.code ?? undefined}
    />
  );
}
