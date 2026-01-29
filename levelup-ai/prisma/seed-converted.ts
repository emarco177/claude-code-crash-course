import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const challenges = [
  // EASY - Python
  {
    title: "Reverse a String",
    description: `Write a function that reverses a string.

Input: A string via stdin
Output: The reversed string

Example:
Input: "hello"
Output: "olleh"

Hint: Python strings can be reversed with slicing!`,
    difficulty: "EASY",
    language: "python",
    starterCode: `def reverse_string(s: str) -> str:
    # Your code here
    pass

# Read input
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
      { input: "LevelUp", expected: "pUleveL", hidden: true },
    ]),
    hints: JSON.stringify(["Try using Python's slice notation", "s[::-1] reverses a string"]),
    xpReward: 25,
    tags: "strings,basics",
  },
  {
    title: "Sum of List",
    description: `Write a function that calculates the sum of all numbers in a list.

Input: Space-separated integers
Output: The sum of all numbers

Example:
Input: "1 2 3 4 5"
Output: "15"`,
    difficulty: "EASY",
    language: "python",
    starterCode: `def sum_list(numbers: list[int]) -> int:
    # Your code here
    pass

# Read input
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
      { input: "100", expected: "100", hidden: true },
    ]),
    hints: JSON.stringify(["Python has a built-in sum() function", "You can also use a loop"]),
    xpReward: 25,
    tags: "lists,math,basics",
  },
  {
    title: "FizzBuzz Single",
    description: `Given a number n, return:
- "FizzBuzz" if divisible by both 3 and 5
- "Fizz" if divisible by 3
- "Buzz" if divisible by 5
- The number as a string otherwise

Input: A single integer
Output: The FizzBuzz result`,
    difficulty: "EASY",
    language: "python",
    starterCode: `def fizzbuzz(n: int) -> str:
    # Your code here
    pass

n = int(input())
print(fizzbuzz(n))`,
    solutionCode: `def fizzbuzz(n: int) -> str:
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)

n = int(input())
print(fizzbuzz(n))`,
    testCases: JSON.stringify([
      { input: "15", expected: "FizzBuzz" },
      { input: "9", expected: "Fizz" },
      { input: "10", expected: "Buzz" },
      { input: "7", expected: "7" },
      { input: "30", expected: "FizzBuzz", hidden: true },
    ]),
    hints: JSON.stringify(["Check divisibility by 15 first", "Use the modulo operator %"]),
    xpReward: 25,
    tags: "conditionals,math,basics",
  },

  // MEDIUM - Python
  {
    title: "Palindrome Check",
    description: `Write a function that checks if a string is a palindrome.
Ignore case and non-alphanumeric characters.

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
      { input: "Was it a car or a cat I saw?", expected: "True" },
      { input: "hello", expected: "False", hidden: true },
    ]),
    hints: JSON.stringify([
      "Remove non-alphanumeric characters first",
      "Convert to lowercase for comparison",
    ]),
    xpReward: 50,
    tags: "strings,two-pointers",
  },
  {
    title: "Two Sum",
    description: `Given an array of integers and a target sum, find two numbers that add up to the target.
Return their indices (0-based) separated by a space.

Input Line 1: Space-separated integers (the array)
Input Line 2: Target sum

Output: Two indices separated by space

Example:
Input:
2 7 11 15
9
Output: "0 1"`,
    difficulty: "MEDIUM",
    language: "python",
    starterCode: `def two_sum(nums: list[int], target: int) -> tuple[int, int]:
    # Your code here
    pass

nums = list(map(int, input().split()))
target = int(input())
result = two_sum(nums, target)
print(f"{result[0]} {result[1]}")`,
    solutionCode: `def two_sum(nums: list[int], target: int) -> tuple[int, int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

nums = list(map(int, input().split()))
target = int(input())
result = two_sum(nums, target)
print(f"{result[0]} {result[1]}")`,
    testCases: JSON.stringify([
      { input: "2 7 11 15\n9", expected: "0 1" },
      { input: "3 2 4\n6", expected: "1 2" },
      { input: "3 3\n6", expected: "0 1" },
      { input: "1 5 3 7 2\n9", expected: "1 3", hidden: true },
    ]),
    hints: JSON.stringify([
      "Use a hash map to store seen numbers",
      "For each number, check if target - num exists",
    ]),
    xpReward: 50,
    tags: "arrays,hash-map,classic",
  },
  {
    title: "Count Words",
    description: `Count the frequency of each word in a text.
Output each unique word and its count, sorted alphabetically.

Input: A text string
Output: Each word and count on separate lines, format "word: count"

Example:
Input: "the cat and the dog"
Output:
"and: 1"
"cat: 1"
"dog: 1"
"the: 2"`,
    difficulty: "MEDIUM",
    language: "python",
    starterCode: `def count_words(text: str) -> dict[str, int]:
    # Your code here
    pass

text = input()
counts = count_words(text)
for word in sorted(counts.keys()):
    print(f"{word}: {counts[word]}")`,
    solutionCode: `def count_words(text: str) -> dict[str, int]:
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

text = input()
counts = count_words(text)
for word in sorted(counts.keys()):
    print(f"{word}: {counts[word]}")`,
    testCases: JSON.stringify([
      { input: "the cat and the dog", expected: "and: 1\ncat: 1\ndog: 1\nthe: 2" },
      { input: "hello hello world", expected: "hello: 2\nworld: 1" },
      { input: "one", expected: "one: 1", hidden: true },
    ]),
    hints: JSON.stringify([
      "Use a dictionary to count occurrences",
      "Split the text into words first",
    ]),
    xpReward: 50,
    tags: "strings,hash-map,text-processing",
  },

  // HARD - Python
  {
    title: "Longest Substring Without Repeating",
    description: `Find the length of the longest substring without repeating characters.

Input: A string
Output: The length of the longest substring

Example:
Input: "abcabcbb"
Output: "3"
Explanation: The answer is "abc", with length 3.`,
    difficulty: "HARD",
    language: "python",
    starterCode: `def length_of_longest_substring(s: str) -> int:
    # Your code here
    pass

s = input()
print(length_of_longest_substring(s))`,
    solutionCode: `def length_of_longest_substring(s: str) -> int:
    char_index = {}
    max_length = 0
    start = 0

    for end, char in enumerate(s):
        if char in char_index and char_index[char] >= start:
            start = char_index[char] + 1
        char_index[char] = end
        max_length = max(max_length, end - start + 1)

    return max_length

s = input()
print(length_of_longest_substring(s))`,
    testCases: JSON.stringify([
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: "", expected: "0" },
      { input: "dvdf", expected: "3", hidden: true },
    ]),
    hints: JSON.stringify([
      "Use the sliding window technique",
      "Track character positions with a hash map",
    ]),
    xpReward: 100,
    tags: "strings,sliding-window,hash-map",
  },
  {
    title: "Valid Parentheses",
    description: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

A string is valid if:
- Open brackets are closed by the same type of brackets
- Open brackets are closed in the correct order

Input: A string of brackets
Output: "True" or "False"`,
    difficulty: "HARD",
    language: "python",
    starterCode: `def is_valid(s: str) -> bool:
    # Your code here
    pass

s = input()
print(is_valid(s))`,
    solutionCode: `def is_valid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)

    return len(stack) == 0

s = input()
print(is_valid(s))`,
    testCases: JSON.stringify([
      { input: "()", expected: "True" },
      { input: "()[]{}", expected: "True" },
      { input: "(]", expected: "False" },
      { input: "([)]", expected: "False" },
      { input: "{[]}", expected: "True" },
      { input: "((()))", expected: "True", hidden: true },
    ]),
    hints: JSON.stringify(["Use a stack data structure", "Match closing brackets with the most recent opening bracket"]),
    xpReward: 100,
    tags: "stack,strings,classic",
  },

  // EASY - TypeScript
  {
    title: "Array Filter",
    description: `Filter an array to keep only even numbers.

Input: Space-separated integers
Output: Space-separated even numbers

Example:
Input: "1 2 3 4 5 6"
Output: "2 4 6"`,
    difficulty: "EASY",
    language: "typescript",
    starterCode: `function filterEvens(nums: number[]): number[] {
  // Your code here
}

const nums = readline().split(' ').map(Number);
console.log(filterEvens(nums).join(' '));`,
    solutionCode: `function filterEvens(nums: number[]): number[] {
  return nums.filter(n => n % 2 === 0);
}

const nums = readline().split(' ').map(Number);
console.log(filterEvens(nums).join(' '));`,
    testCases: JSON.stringify([
      { input: "1 2 3 4 5 6", expected: "2 4 6" },
      { input: "2 4 6 8", expected: "2 4 6 8" },
      { input: "1 3 5", expected: "" },
      { input: "10 15 20 25", expected: "10 20", hidden: true },
    ]),
    hints: JSON.stringify(["Use the filter method", "Check if n % 2 === 0"]),
    xpReward: 25,
    tags: "arrays,filter,basics",
  },
  {
    title: "Object Keys",
    description: `Given a JSON object, return all its keys sorted alphabetically.

Input: A JSON string
Output: Keys separated by commas

Example:
Input: '{"b": 2, "a": 1, "c": 3}'
Output: "a,b,c"`,
    difficulty: "EASY",
    language: "typescript",
    starterCode: `function getKeys(obj: Record<string, unknown>): string[] {
  // Your code here
}

const obj = JSON.parse(readline());
console.log(getKeys(obj).join(','));`,
    solutionCode: `function getKeys(obj: Record<string, unknown>): string[] {
  return Object.keys(obj).sort();
}

const obj = JSON.parse(readline());
console.log(getKeys(obj).join(','));`,
    testCases: JSON.stringify([
      { input: '{"b": 2, "a": 1, "c": 3}', expected: "a,b,c" },
      { input: '{"name": "John", "age": 30}', expected: "age,name" },
      { input: '{"x": 1}', expected: "x" },
      { input: '{"z": 1, "m": 2, "a": 3}', expected: "a,m,z", hidden: true },
    ]),
    hints: JSON.stringify(["Use Object.keys()", "Don't forget to sort"]),
    xpReward: 25,
    tags: "objects,basics",
  },

  // MEDIUM - TypeScript
  {
    title: "Debounce Implementation",
    description: `Implement a simple counter that tracks function calls.
The function should return the number of times it has been called.

Input: Number of times to call the function
Output: Final count

Example:
Input: "5"
Output: "5"`,
    difficulty: "MEDIUM",
    language: "typescript",
    starterCode: `function createCounter(): () => number {
  // Your code here
  // Return a function that increments and returns a count
}

const counter = createCounter();
const n = parseInt(readline());
let result = 0;
for (let i = 0; i < n; i++) {
  result = counter();
}
console.log(result);`,
    solutionCode: `function createCounter(): () => number {
  let count = 0;
  return () => ++count;
}

const counter = createCounter();
const n = parseInt(readline());
let result = 0;
for (let i = 0; i < n; i++) {
  result = counter();
}
console.log(result);`,
    testCases: JSON.stringify([
      { input: "5", expected: "5" },
      { input: "1", expected: "1" },
      { input: "10", expected: "10" },
      { input: "100", expected: "100", hidden: true },
    ]),
    hints: JSON.stringify(["Use a closure to maintain state", "Return a function that increments the count"]),
    xpReward: 50,
    tags: "closures,functions",
  },

  // HARD - TypeScript
  {
    title: "Deep Flatten Array",
    description: `Flatten a deeply nested array into a single-level array.

Input: A JSON array (may be deeply nested)
Output: Flattened array elements separated by commas

Example:
Input: "[1, [2, [3, [4]]]]"
Output: "1,2,3,4"`,
    difficulty: "HARD",
    language: "typescript",
    starterCode: `function deepFlatten(arr: unknown[]): unknown[] {
  // Your code here
}

const arr = JSON.parse(readline());
console.log(deepFlatten(arr).join(','));`,
    solutionCode: `function deepFlatten(arr: unknown[]): unknown[] {
  const result: unknown[] = [];

  function flatten(item: unknown): void {
    if (Array.isArray(item)) {
      item.forEach(flatten);
    } else {
      result.push(item);
    }
  }

  flatten(arr);
  return result;
}

const arr = JSON.parse(readline());
console.log(deepFlatten(arr).join(','));`,
    testCases: JSON.stringify([
      { input: "[1, [2, [3, [4]]]]", expected: "1,2,3,4" },
      { input: "[[1, 2], [3, 4]]", expected: "1,2,3,4" },
      { input: "[1, 2, 3]", expected: "1,2,3" },
      { input: "[[[1]], [[2]], [[3]]]", expected: "1,2,3", hidden: true },
    ]),
    hints: JSON.stringify(["Use recursion", "Check if each element is an array"]),
    xpReward: 100,
    tags: "recursion,arrays",
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
  {
    slug: "win-streak-5",
    title: "On Fire",
    description: "Win 5 battles in a row",
    iconUrl: "/achievements/streak-5.svg",
    xpReward: 250,
  },
  {
    slug: "win-streak-10",
    title: "Unstoppable",
    description: "Win 10 battles in a row",
    iconUrl: "/achievements/streak-10.svg",
    xpReward: 500,
  },
  {
    slug: "level-5",
    title: "Rising Star",
    description: "Reach level 5",
    iconUrl: "/achievements/level-5.svg",
    xpReward: 100,
  },
  {
    slug: "level-10",
    title: "Skilled Coder",
    description: "Reach level 10",
    iconUrl: "/achievements/level-10.svg",
    xpReward: 250,
  },
  {
    slug: "level-25",
    title: "Expert",
    description: "Reach level 25",
    iconUrl: "/achievements/level-25.svg",
    xpReward: 500,
  },
  {
    slug: "battles-10",
    title: "Battle Veteran",
    description: "Complete 10 battles",
    iconUrl: "/achievements/battles-10.svg",
    xpReward: 100,
  },
  {
    slug: "battles-50",
    title: "Battle Master",
    description: "Complete 50 battles",
    iconUrl: "/achievements/battles-50.svg",
    xpReward: 300,
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
