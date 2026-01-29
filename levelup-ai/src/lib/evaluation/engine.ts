/**
 * Evaluation Engine
 * Main engine for evaluating code submissions against test cases
 */

import {
  TestCase,
  EvaluationResult,
  CodeEvaluation,
  GradingRubric,
  ComparisonOptions,
} from "./types";
import { OutputComparator } from "./comparator";

export class EvaluationEngine {
  private comparator: OutputComparator;
  private defaultRubric: GradingRubric = {
    testCasesWeight: 80,
    performanceWeight: 10,
    codeQualityWeight: 10,
  };

  constructor() {
    this.comparator = new OutputComparator();
  }

  /**
   * Evaluate code execution results against test cases
   */
  async evaluateSubmission(
    testCases: TestCase[],
    executionResults: Array<{
      testCaseId: string;
      output: string;
      error?: string;
      executionTime: number;
    }>,
    rubric?: GradingRubric
  ): Promise<CodeEvaluation> {
    const gradingRubric = rubric || this.defaultRubric;
    const results: EvaluationResult[] = [];
    let totalTestScore = 0;
    let totalWeight = 0;

    // Evaluate each test case
    for (const testCase of testCases) {
      const execution = executionResults.find(
        (r) => r.testCaseId === testCase.id
      );

      if (!execution) {
        // Test case wasn't executed
        results.push({
          testCaseId: testCase.id,
          passed: false,
          score: 0,
          input: this.formatInput(testCase.input),
          expected: this.formatExpected(testCase.expected),
          actual: "No output",
          error: "Test case was not executed",
          executionTime: 0,
        });
        continue;
      }

      const result = this.evaluateTestCase(testCase, execution);
      results.push(result);

      const weight = testCase.weight || 1;
      totalTestScore += result.score * weight;
      totalWeight += weight;
    }

    // Calculate test case score (0-100)
    const testCaseScore =
      totalWeight > 0 ? totalTestScore / totalWeight : 0;

    // Calculate performance score
    const performanceScore = this.calculatePerformanceScore(
      results,
      testCases
    );

    // Calculate total score using rubric weights
    const totalScore =
      (testCaseScore * gradingRubric.testCasesWeight +
        performanceScore * gradingRubric.performanceWeight) /
      (gradingRubric.testCasesWeight + gradingRubric.performanceWeight);

    // Count passed tests
    const testsPassed = results.filter((r) => r.passed).length;
    const testsTotal = results.length;

    // Calculate average performance
    const avgExecutionTime =
      results.reduce((sum, r) => sum + r.executionTime, 0) /
      results.length;

    // Generate feedback
    const feedback = this.generateFeedback(
      results,
      testsPassed,
      testsTotal,
      performanceScore
    );

    return {
      testResults: results,
      totalScore: Math.round(totalScore),
      testsPassed,
      testsTotal,
      performance: {
        executionTime: Math.round(avgExecutionTime),
        memoryUsed: 0, // TODO: Implement memory tracking
      },
      feedback,
    };
  }

  /**
   * Evaluate a single test case
   */
  private evaluateTestCase(
    testCase: TestCase,
    execution: {
      testCaseId: string;
      output: string;
      error?: string;
      executionTime: number;
    }
  ): EvaluationResult {
    // Check for execution errors
    if (execution.error) {
      return {
        testCaseId: testCase.id,
        passed: false,
        score: 0,
        input: this.formatInput(testCase.input),
        expected: this.formatExpected(testCase.expected),
        actual: "",
        error: execution.error,
        executionTime: execution.executionTime,
      };
    }

    // Compare output with expected
    const comparisonOptions: ComparisonOptions = {
      ignoreWhitespace: true,
      numericTolerance: 0.0001,
    };

    const passed = this.comparator.compare(
      execution.output,
      testCase.expected,
      comparisonOptions
    );

    // Calculate score (100 for pass, partial credit for close matches)
    let score = 100;
    if (!passed) {
      // Calculate partial credit based on similarity
      const expectedStr = this.formatExpected(testCase.expected);
      score = this.comparator.calculatePartialCredit(
        execution.output,
        expectedStr
      );
    }

    return {
      testCaseId: testCase.id,
      passed,
      score,
      input: this.formatInput(testCase.input),
      expected: this.formatExpected(testCase.expected),
      actual: execution.output,
      executionTime: execution.executionTime,
    };
  }

  /**
   * Calculate performance score based on execution times
   */
  private calculatePerformanceScore(
    results: EvaluationResult[],
    testCases: TestCase[]
  ): number {
    // Calculate average execution time
    const avgTime =
      results.reduce((sum, r) => sum + r.executionTime, 0) /
      results.length;

    // Get average time limit
    const avgTimeLimit =
      testCases.reduce((sum, tc) => sum + (tc.timeLimit || 5000), 0) /
      testCases.length;

    // Score based on how fast execution is relative to time limit
    // 100 if under 50% of time limit, decreases linearly
    const timeRatio = avgTime / avgTimeLimit;

    if (timeRatio <= 0.5) return 100;
    if (timeRatio >= 1.0) return 0;

    // Linear interpolation between 50% and 100% of time limit
    return Math.round(((1 - timeRatio) / 0.5) * 100);
  }

  /**
   * Generate feedback messages
   */
  private generateFeedback(
    results: EvaluationResult[],
    passed: number,
    total: number,
    performanceScore: number
  ): string[] {
    const feedback: string[] = [];

    // Test results feedback
    if (passed === total) {
      feedback.push(`✓ All ${total} test cases passed!`);
    } else {
      feedback.push(`✗ ${passed} of ${total} test cases passed`);

      // Identify failing tests
      const failedTests = results.filter((r) => !r.passed);
      if (failedTests.length > 0 && failedTests.length <= 3) {
        failedTests.forEach((test) => {
          if (test.error) {
            feedback.push(`  - Test ${test.testCaseId}: ${test.error}`);
          } else {
            const comparisonFeedback = this.comparator.getComparisonFeedback(
              test.actual,
              test.expected
            );
            feedback.push(`  - Test ${test.testCaseId}: ${comparisonFeedback}`);
          }
        });
      }
    }

    // Performance feedback
    if (performanceScore >= 80) {
      feedback.push("⚡ Excellent performance!");
    } else if (performanceScore >= 60) {
      feedback.push("⏱️ Good performance, but could be optimized");
    } else if (performanceScore < 60 && passed > 0) {
      feedback.push("⚠️ Solution is slow, consider optimizing");
    }

    // Partial credit feedback
    const partialCreditTests = results.filter(
      (r) => !r.passed && r.score > 30
    );
    if (partialCreditTests.length > 0) {
      feedback.push(
        `ℹ️ ${partialCreditTests.length} test(s) earned partial credit for being close`
      );
    }

    return feedback;
  }

  /**
   * Format input for display
   */
  private formatInput(input: string | object): string {
    if (typeof input === "object") {
      return JSON.stringify(input, null, 2);
    }
    return String(input);
  }

  /**
   * Format expected output for display
   */
  private formatExpected(expected: string | object): string {
    if (typeof expected === "object") {
      return JSON.stringify(expected, null, 2);
    }
    return String(expected);
  }

  /**
   * Get non-hidden test cases for display
   */
  getVisibleTestCases(testCases: TestCase[]): TestCase[] {
    return testCases.filter((tc) => !tc.hidden);
  }

  /**
   * Get hidden test cases (for progressive hints)
   */
  getHiddenTestCases(testCases: TestCase[]): TestCase[] {
    return testCases.filter((tc) => tc.hidden);
  }
}
