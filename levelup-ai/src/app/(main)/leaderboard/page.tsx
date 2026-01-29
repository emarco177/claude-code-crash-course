import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/auth";
import { Leaderboard } from "@/components/gamification/Leaderboard";

export default async function LeaderboardPage() {
  const currentUser = await getOrCreateUser();

  // Get top 100 users by total XP
  const users = await db.user.findMany({
    orderBy: { totalXp: "desc" },
    take: 100,
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      totalXp: true,
      currentLevel: true,
      battleWins: true,
      battleLosses: true,
      winStreak: true,
      bestWinStreak: true,
    },
  });

  // Get current user's rank if they're not in top 100
  let currentUserRank: number | null = null;
  if (currentUser) {
    const userIndex = users.findIndex((u) => u.id === currentUser.id);
    if (userIndex === -1) {
      const higherRankedCount = await db.user.count({
        where: {
          totalXp: { gt: currentUser.totalXp },
        },
      });
      currentUserRank = higherRankedCount + 1;
    } else {
      currentUserRank = userIndex + 1;
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Leaderboard
        users={users}
        currentUserId={currentUser?.id ?? null}
        currentUserRank={currentUserRank}
      />
    </div>
  );
}
