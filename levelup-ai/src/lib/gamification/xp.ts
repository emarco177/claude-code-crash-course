// XP reward constants
export const XP_REWARDS = {
  BATTLE_WIN: 100,
  BATTLE_LOSE: 25,
  BATTLE_TIMEOUT_WIN: 75,
  FIRST_TRY_WIN: 150,
  WIN_STREAK_3: 50,
  WIN_STREAK_5: 100,
  WIN_STREAK_10: 250,
} as const;

// Level formula: XP needed = 100 * level^1.5
export function getXPForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(100 * Math.pow(level, 1.5));
}

// Get level from total XP
export function getLevelFromXP(totalXp: number): number {
  let level = 1;
  while (getXPForLevel(level + 1) <= totalXp) {
    level++;
  }
  return level;
}

// Calculate progress within current level
export function calculateLevelProgress(totalXp: number): {
  currentLevel: number;
  currentLevelXP: number;
  nextLevelXP: number;
  progressPercent: number;
  xpIntoLevel: number;
  xpNeededForNextLevel: number;
} {
  const currentLevel = getLevelFromXP(totalXp);
  const currentLevelXP = getXPForLevel(currentLevel);
  const nextLevelXP = getXPForLevel(currentLevel + 1);
  const xpIntoLevel = totalXp - currentLevelXP;
  const xpNeededForNextLevel = nextLevelXP - currentLevelXP;
  const progressPercent = (xpIntoLevel / xpNeededForNextLevel) * 100;

  return {
    currentLevel,
    currentLevelXP,
    nextLevelXP,
    progressPercent,
    xpIntoLevel,
    xpNeededForNextLevel,
  };
}

// Calculate XP to award for battle result
export function calculateBattleXP(params: {
  isWinner: boolean;
  isTimeout: boolean;
  isFirstTry: boolean;
  currentWinStreak: number;
}): { baseXP: number; bonusXP: number; totalXP: number; breakdown: string[] } {
  const { isWinner, isTimeout, isFirstTry, currentWinStreak } = params;
  const breakdown: string[] = [];
  let baseXP = 0;
  let bonusXP = 0;

  // Base XP
  if (isWinner) {
    if (isTimeout) {
      baseXP = XP_REWARDS.BATTLE_TIMEOUT_WIN;
      breakdown.push(`Timeout Win: +${XP_REWARDS.BATTLE_TIMEOUT_WIN} XP`);
    } else {
      baseXP = XP_REWARDS.BATTLE_WIN;
      breakdown.push(`Battle Win: +${XP_REWARDS.BATTLE_WIN} XP`);
    }

    // First try bonus
    if (isFirstTry) {
      bonusXP += XP_REWARDS.FIRST_TRY_WIN;
      breakdown.push(`First Try Bonus: +${XP_REWARDS.FIRST_TRY_WIN} XP`);
    }

    // Win streak bonuses
    if (currentWinStreak >= 10) {
      bonusXP += XP_REWARDS.WIN_STREAK_10;
      breakdown.push(`10 Win Streak: +${XP_REWARDS.WIN_STREAK_10} XP`);
    } else if (currentWinStreak >= 5) {
      bonusXP += XP_REWARDS.WIN_STREAK_5;
      breakdown.push(`5 Win Streak: +${XP_REWARDS.WIN_STREAK_5} XP`);
    } else if (currentWinStreak >= 3) {
      bonusXP += XP_REWARDS.WIN_STREAK_3;
      breakdown.push(`3 Win Streak: +${XP_REWARDS.WIN_STREAK_3} XP`);
    }
  } else {
    baseXP = XP_REWARDS.BATTLE_LOSE;
    breakdown.push(`Participation: +${XP_REWARDS.BATTLE_LOSE} XP`);
  }

  return {
    baseXP,
    bonusXP,
    totalXP: baseXP + bonusXP,
    breakdown,
  };
}

// Check if user leveled up
export function checkLevelUp(
  previousXp: number,
  newXp: number
): { leveledUp: boolean; newLevel: number; previousLevel: number } {
  const previousLevel = getLevelFromXP(previousXp);
  const newLevel = getLevelFromXP(newXp);

  return {
    leveledUp: newLevel > previousLevel,
    newLevel,
    previousLevel,
  };
}
