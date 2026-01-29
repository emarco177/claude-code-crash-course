import { cookies } from "next/headers";
import { db } from "./db";

const FALLBACK_CLERK_ID = "mock_user_test_123";
const USER_COOKIE = "levelup_user_id";

async function getCookieUser() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(USER_COOKIE);
  if (!cookie) return null;

  return db.user.findUnique({
    where: { id: cookie.value },
  });
}

async function ensureFallbackUser() {
  let user = await db.user.findUnique({
    where: { clerkId: FALLBACK_CLERK_ID },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        clerkId: FALLBACK_CLERK_ID,
        email: `demo+${FALLBACK_CLERK_ID}@levelup.ai`,
        username: `demo_${FALLBACK_CLERK_ID}`,
        displayName: "Demo User",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${FALLBACK_CLERK_ID}`,
        totalXp: 350,
        currentLevel: 3,
        battleWins: 5,
        battleLosses: 2,
        winStreak: 2,
        bestWinStreak: 4,
      },
    });
  }

  return user;
}

export async function getCurrentUser() {
  const cookieUser = await getCookieUser();
  if (cookieUser) return cookieUser;

  return ensureFallbackUser();
}

export async function setUserSession(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(USER_COOKIE, userId, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_COOKIE);
}

export async function getOrCreateUser(profile?: {
  username: string;
  email?: string;
  displayName?: string;
}) {
  if (!profile) {
    const current = await getCurrentUser();
    if (current) return current;
    return ensureFallbackUser();
  }

  if (profile?.username) {
    const normalized = profile.username
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 30) || "player";

    let user = await db.user.findUnique({
      where: { username: normalized },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          clerkId: `mock_${normalized}`,
          email: profile.email || `${normalized}@levelup.ai`,
          username: normalized,
          displayName: profile.displayName || profile.username,
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${normalized}`,
        },
      });
    }

    await setUserSession(user.id);
    return user;
  }

  return ensureFallbackUser();
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    return ensureFallbackUser();
  }
  return user;
}
