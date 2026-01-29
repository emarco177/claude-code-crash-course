/**
 * Language Configurations
 * Defines supported programming languages and their execution settings
 */

export interface LanguageConfig {
  id: string;
  name: string;
  displayName: string;
  version: string;
  pistonId: string;
  extension: string;
  template: string;
  monacoLanguage: string; // For Monaco Editor
  supportsStdin: boolean;
  compileTimeout: number;
  runTimeout: number;
}

export const SUPPORTED_LANGUAGES: Record<string, LanguageConfig> = {
  python: {
    id: "python",
    name: "Python",
    displayName: "Python 3.10",
    version: "3.10",
    pistonId: "python",
    extension: "py",
    monacoLanguage: "python",
    supportsStdin: true,
    compileTimeout: 10000,
    runTimeout: 5000,
    template: `def solution():
    # Your code here
    pass

# Test your solution
if __name__ == "__main__":
    result = solution()
    print(result)`,
  },

  javascript: {
    id: "javascript",
    name: "JavaScript",
    displayName: "JavaScript (Node.js 18)",
    version: "18.15.0",
    pistonId: "javascript",
    extension: "js",
    monacoLanguage: "javascript",
    supportsStdin: true,
    compileTimeout: 10000,
    runTimeout: 5000,
    template: `function solution() {
    // Your code here
}

// Test your solution
console.log(solution());`,
  },

  typescript: {
    id: "typescript",
    name: "TypeScript",
    displayName: "TypeScript 5.0",
    version: "5.0.3",
    pistonId: "typescript",
    extension: "ts",
    monacoLanguage: "typescript",
    supportsStdin: true,
    compileTimeout: 10000,
    runTimeout: 5000,
    template: `function solution(): any {
    // Your code here
}

// Test your solution
console.log(solution());`,
  },

  java: {
    id: "java",
    name: "Java",
    displayName: "Java 15",
    version: "15.0.2",
    pistonId: "java",
    extension: "java",
    monacoLanguage: "java",
    supportsStdin: true,
    compileTimeout: 15000,
    runTimeout: 5000,
    template: `public class Main {
    public static void main(String[] args) {
        // Your code here
        System.out.println(solution());
    }

    public static Object solution() {
        // Implement your solution
        return null;
    }
}`,
  },

  cpp: {
    id: "cpp",
    name: "C++",
    displayName: "C++ 17",
    version: "10.2.0",
    pistonId: "c++",
    extension: "cpp",
    monacoLanguage: "cpp",
    supportsStdin: true,
    compileTimeout: 15000,
    runTimeout: 5000,
    template: `#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Your solution here
void solution() {
    // Implement your code
}

int main() {
    solution();
    return 0;
}`,
  },

  rust: {
    id: "rust",
    name: "Rust",
    displayName: "Rust 1.68",
    version: "1.68.2",
    pistonId: "rust",
    extension: "rs",
    monacoLanguage: "rust",
    supportsStdin: true,
    compileTimeout: 20000,
    runTimeout: 5000,
    template: `fn solution() {
    // Your code here
}

fn main() {
    solution();
}`,
  },
};

/**
 * Get language configuration by ID
 */
export function getLanguageConfig(languageId: string): LanguageConfig | null {
  return SUPPORTED_LANGUAGES[languageId] || null;
}

/**
 * Get all supported language IDs
 */
export function getSupportedLanguageIds(): string[] {
  return Object.keys(SUPPORTED_LANGUAGES);
}

/**
 * Get all language configurations
 */
export function getAllLanguages(): LanguageConfig[] {
  return Object.values(SUPPORTED_LANGUAGES);
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(languageId: string): boolean {
  return languageId in SUPPORTED_LANGUAGES;
}

/**
 * Get language display name for UI
 */
export function getLanguageDisplayName(languageId: string): string {
  const config = getLanguageConfig(languageId);
  return config ? config.displayName : languageId;
}
