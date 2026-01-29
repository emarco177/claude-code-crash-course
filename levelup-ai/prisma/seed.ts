import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const challenges = [
  {
    title: "Reverse a String",
    description: `Write a function that reverses a string.

Input: A string via stdin
Output: The reversed string

Example:
Input: "hello"
Output: "olleh"`,
    difficulty: "EASY",
    language: "python",
    starterCode: `def reverse_string(s: str) -> str:
    # Your code here
    pass

s = input()
print(reverse_string(s))`,
    solutionCode: `def reverse_string(s: str) -> str:
    return s[::-1]

s = input()
print(reverse_string(s))`,
    testCases: JSON.stringify([
      { input: "hello", expected: "olleh" },
      { input: "world", expected: "dlrow" },
      { input: "a", expected: "a" },
    ]),
    hints: JSON.stringify(["Try using Python's slice notation", "s[::-1] reverses a string"]),
    xpReward: 25,
    tags: "strings,basics",
  },
  {
    title: "Sum of List",
    description: `Calculate the sum of all numbers in a list.

Input: Space-separated integers
Output: The sum

Example:
Input: "1 2 3 4 5"
Output: "15"`,
    difficulty: "EASY",
    language: "python",
    starterCode: `def sum_list(numbers: list[int]) -> int:
    # Your code here
    pass

nums = list(map(int, input().split()))
print(sum_list(nums))`,
    solutionCode: `def sum_list(numbers: list[int]) -> int:
    return sum(numbers)

nums = list(map(int, input().split()))
print(sum_list(nums))`,
    testCases: JSON.stringify([
      { input: "1 2 3 4 5", expected: "15" },
      { input: "10 20 30", expected: "60" },
      { input: "-5 5", expected: "0" },
    ]),
    hints: JSON.stringify(["Python has a built-in sum() function"]),
    xpReward: 25,
    tags: "lists,math,basics",
  },
  {
    title: "Palindrome Check",
    description: `Check if a string is a palindrome. Ignore case and non-alphanumeric characters.

Input: A string
Output: "True" or "False"

Example:
Input: "A man, a plan, a canal: Panama"
Output: "True"`,
    difficulty: "MEDIUM",
    language: "python",
    starterCode: `def is_palindrome(s: str) -> bool:
    # Your code here
    pass

s = input()
print(is_palindrome(s))`,
    solutionCode: `def is_palindrome(s: str) -> bool:
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

s = input()
print(is_palindrome(s))`,
    testCases: JSON.stringify([
      { input: "A man, a plan, a canal: Panama", expected: "True" },
      { input: "race a car", expected: "False" },
    ]),
    hints: JSON.stringify(["Remove non-alphanumeric characters first", "Convert to lowercase"]),
    xpReward: 50,
    tags: "strings,algorithms",
  },
];

const achievements = [
  {
    slug: "first-battle",
    title: "First Battle",
    description: "Complete your first battle",
    iconUrl: "/achievements/first-battle.svg",
    xpReward: 50,
  },
  {
    slug: "first-win",
    title: "First Victory",
    description: "Win your first battle",
    iconUrl: "/achievements/first-win.svg",
    xpReward: 100,
  },
  {
    slug: "win-streak-3",
    title: "Hot Streak",
    description: "Win 3 battles in a row",
    iconUrl: "/achievements/streak-3.svg",
    xpReward: 150,
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.userAchievement.deleteMany();
  await prisma.codeSubmission.deleteMany();
  await prisma.battleParticipant.deleteMany();
  await prisma.battle.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.achievement.deleteMany();

  // Create challenges
  for (const challenge of challenges) {
    await prisma.challenge.create({
      data: challenge,
    });
    console.log(`Created challenge: ${challenge.title}`);
  }

  // Create achievements
  for (const achievement of achievements) {
    await prisma.achievement.create({
      data: achievement,
    });
    console.log(`Created achievement: ${achievement.title}`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
