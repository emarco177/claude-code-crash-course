/**
 * Evaluation Engine Types
 * Defines the core types for code evaluation and test case management
 */

export interface TestCase {
  id: string;
  input: string | object;
  expected: string | object;
  hidden?: boolean;
  weight?: number;           // For weighted scoring (default: 1)
  timeLimit?: number;        // Per-test timeout in ms (default: 5000)
  memoryLimit?: number;      // Memory constraint in MB
}

export interface EvaluationResult {
  testCaseId: string;
  passed: boolean;
  score: number;             // 0-100 (can have partial credit)
  input: string;
  expected: string;
  actual: string;
  error?: string;
  executionTime: number;     // in milliseconds
  memoryUsed?: number;       // in MB
}

export interface GradingRubric {
  testCasesWeight: number;   // e.g., 70
  performanceWeight: number; // e.g., 15
  codeQualityWeight: number; // e.g., 15
}

export interface PerformanceMetrics {
  executionTime: number;
  memoryUsed: number;
  timeComplexity?: string;   // O(n), O(n²), etc. (optional, AI-powered)
  spaceComplexity?: string;
}

export interface CodeEvaluation {
  testResults: EvaluationResult[];
  totalScore: number;        // 0-100
  testsPassed: number;
  testsTotal: number;
  performance: PerformanceMetrics;
  feedback: string[];
  suggestedImprovements?: string[];
}

export interface ComparisonOptions {
  ignoreCase?: boolean;
  ignoreWhitespace?: boolean;
  numericTolerance?: number;  // e.g., 0.0001 for floating point
  orderIndependent?: boolean; // For array comparisons
}
