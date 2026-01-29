/**
 * Output Comparator
 * Smart comparison logic for test case evaluation
 */

import { ComparisonOptions } from "./types";

export class OutputComparator {
  /**
   * Main comparison method - intelligently compares actual vs expected output
   */
  compare(
    actual: string,
    expected: string | object,
    options: ComparisonOptions = {}
  ): boolean {
    try {
      // Handle object/JSON comparison
      if (typeof expected === "object") {
        return this.compareJSON(actual, expected);
      }

      const actualStr = this.normalizeString(actual, options);
      const expectedStr = this.normalizeString(
        typeof expected === "string" ? expected : String(expected),
        options
      );

      // 1. Exact match after normalization
      if (actualStr === expectedStr) {
        return true;
      }

      // 2. Numeric comparison with tolerance
      if (this.isNumeric(actualStr) && this.isNumeric(expectedStr)) {
        return this.compareNumbers(
          parseFloat(actualStr),
          parseFloat(expectedStr),
          options.numericTolerance || 0.0001
        );
      }

      // 3. Array comparison (with order-independent option)
      if (this.isArray(actualStr) && this.isArray(expectedStr)) {
        return this.compareArrays(actualStr, expectedStr, options);
      }

      // 4. Fallback to exact string match
      return actualStr === expectedStr;
    } catch (error) {
      console.error("Comparison error:", error);
      return false;
    }
  }

  /**
   * Calculate partial credit based on similarity
   */
  calculatePartialCredit(actual: string, expected: string): number {
    const similarity = this.stringSimilarity(actual, expected);
    return Math.max(0, Math.floor(similarity * 100));
  }

  /**
   * Normalize string for comparison
   */
  private normalizeString(
    str: string,
    options: ComparisonOptions
  ): string {
    let normalized = str;

    if (options.ignoreWhitespace) {
      normalized = normalized.replace(/\s+/g, " ").trim();
    }

    if (options.ignoreCase) {
      normalized = normalized.toLowerCase();
    }

    return normalized;
  }

  /**
   * Check if string represents a number
   */
  private isNumeric(str: string): boolean {
    const cleaned = str.trim();
    return !isNaN(Number(cleaned)) && cleaned !== "";
  }

  /**
   * Compare numbers with tolerance for floating point
   */
  private compareNumbers(
    actual: number,
    expected: number,
    tolerance: number
  ): boolean {
    return Math.abs(actual - expected) <= tolerance;
  }

  /**
   * Check if string represents an array
   */
  private isArray(str: string): boolean {
    const cleaned = str.trim();
    return (
      (cleaned.startsWith("[") && cleaned.endsWith("]")) ||
      cleaned.includes(",")
    );
  }

  /**
   * Compare arrays with optional order independence
   */
  private compareArrays(
    actualStr: string,
    expectedStr: string,
    options: ComparisonOptions
  ): boolean {
    try {
      const actualArray = this.parseArray(actualStr);
      const expectedArray = this.parseArray(expectedStr);

      if (actualArray.length !== expectedArray.length) {
        return false;
      }

      if (options.orderIndependent) {
        // Sort both arrays for comparison
        const sortedActual = [...actualArray].sort();
        const sortedExpected = [...expectedArray].sort();
        return JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
      }

      // Order matters
      return JSON.stringify(actualArray) === JSON.stringify(expectedArray);
    } catch {
      return false;
    }
  }

  /**
   * Parse array from string
   */
  private parseArray(str: string): any[] {
    const cleaned = str.trim();

    // Try JSON parsing first
    if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
      try {
        return JSON.parse(cleaned);
      } catch {
        // Fall through to manual parsing
      }
    }

    // Manual parsing for simple comma-separated values
    return cleaned
      .replace(/[\[\]]/g, "")
      .split(",")
      .map((item) => {
        const trimmed = item.trim();
        // Try to parse as number
        if (this.isNumeric(trimmed)) {
          return parseFloat(trimmed);
        }
        // Remove quotes from strings
        return trimmed.replace(/^["']|["']$/g, "");
      });
  }

  /**
   * Compare JSON objects
   */
  private compareJSON(actual: string, expected: object): boolean {
    try {
      const actualObj = JSON.parse(actual);
      return JSON.stringify(actualObj) === JSON.stringify(expected);
    } catch {
      return false;
    }
  }

  /**
   * Calculate string similarity using Levenshtein distance
   * Returns a value between 0 and 1 (1 = identical)
   */
  private stringSimilarity(str1: string, str2: string): number {
    const distance = this.levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);

    if (maxLength === 0) return 1;

    return 1 - distance / maxLength;
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Get detailed comparison feedback
   */
  getComparisonFeedback(
    actual: string,
    expected: string
  ): string {
    if (actual === expected) {
      return "Output matches exactly";
    }

    const actualTrimmed = actual.trim();
    const expectedTrimmed = expected.trim();

    if (actualTrimmed === expectedTrimmed) {
      return "Output matches (whitespace differences)";
    }

    if (actualTrimmed.toLowerCase() === expectedTrimmed.toLowerCase()) {
      return "Output matches (case differences)";
    }

    const similarity = this.stringSimilarity(actual, expected);

    if (similarity > 0.9) {
      return "Output is very close to expected (minor differences)";
    }

    if (similarity > 0.7) {
      return "Output is somewhat similar to expected";
    }

    return "Output differs significantly from expected";
  }
}
