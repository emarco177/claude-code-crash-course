import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { executeCode } from "@/lib/execution";
import { EvaluationEngine } from "@/lib/evaluation";
import { TestCase as EvalTestCase } from "@/lib/evaluation/types";

interface RequestTestCase {
  id: string;
  input: string;
  expected: string;
  hidden?: boolean;
  weight?: number;
}

export async function POST(request: NextRequest) {
  try {
    await auth();
  } catch {
    // Mock mode – allow execution without Clerk
  }

  try {
    const { code, language, testCases } = await request.json();

    if (!code || !language || !testCases || !Array.isArray(testCases)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Execute code against all test cases
    const executionResults = [];

    for (const testCase of testCases as RequestTestCase[]) {
      const result = await executeCode(code, language, testCase.input);

      executionResults.push({
        testCaseId: testCase.id,
        output: result.output,
        error: result.error || undefined,
        executionTime: result.executionTime,
      });
    }

    // Use evaluation engine to grade results
    const evaluationEngine = new EvaluationEngine();

    const evalTestCases: EvalTestCase[] = testCases.map((tc: RequestTestCase) => ({
      id: tc.id,
      input: tc.input,
      expected: tc.expected,
      hidden: tc.hidden,
      weight: tc.weight,
    }));

    const evaluation = await evaluationEngine.evaluateSubmission(
      evalTestCases,
      executionResults
    );

    return NextResponse.json({
      evaluation: {
        totalScore: evaluation.totalScore,
        testsPassed: evaluation.testsPassed,
        testsTotal: evaluation.testsTotal,
        feedback: evaluation.feedback,
      },
      testResults: evaluation.testResults,
      performance: evaluation.performance,
    });
  } catch (error) {
    console.error("Code execution error:", error);
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
}
