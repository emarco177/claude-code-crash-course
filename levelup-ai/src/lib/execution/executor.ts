/**
 * Code Executor
 * Handles code execution via Piston API
 */

import { getLanguageConfig } from "./languages";

export interface ExecutionResult {
  success: boolean;
  output: string;
  error: string | null;
  executionTime: number; // in milliseconds
  compileOutput?: string;
}

const PISTON_API = "https://emkc.org/api/v2/piston";

/**
 * Execute code using Piston API
 */
export async function executeCode(
  code: string,
  languageId: string,
  stdin: string = ""
): Promise<ExecutionResult> {
  const config = getLanguageConfig(languageId);

  if (!config) {
    return {
      success: false,
      output: "",
      error: `Unsupported language: ${languageId}`,
      executionTime: 0,
    };
  }

  const startTime = Date.now();

  try {
    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: config.pistonId,
        version: config.version,
        files: [
          {
            name: `main.${config.extension}`,
            content: code,
          },
        ],
        stdin: stdin,
        args: [],
        compile_timeout: config.compileTimeout,
        run_timeout: config.runTimeout,
      }),
    });

    const executionTime = Date.now() - startTime;

    if (!response.ok) {
      return {
        success: false,
        output: "",
        error: "Code execution service unavailable",
        executionTime,
      };
    }

    const data = await response.json();

    // Check for compilation errors
    if (data.compile && data.compile.stderr) {
      return {
        success: false,
        output: "",
        error: `Compilation Error:\n${data.compile.stderr}`,
        executionTime,
        compileOutput: data.compile.stdout || "",
      };
    }

    // Check for runtime errors
    if (data.run && data.run.code !== 0 && data.run.stderr) {
      return {
        success: false,
        output: data.run.stdout?.trim() || "",
        error: `Runtime Error:\n${data.run.stderr}`,
        executionTime,
      };
    }

    // Success
    return {
      success: true,
      output: data.run.stdout?.trim() || "",
      error: null,
      executionTime,
    };
  } catch (error) {
    console.error("Piston API error:", error);
    return {
      success: false,
      output: "",
      error: "Failed to execute code. Please try again.",
      executionTime: Date.now() - startTime,
    };
  }
}

/**
 * Execute code against multiple test cases
 */
export async function executeWithTestCases(
  code: string,
  languageId: string,
  testInputs: string[]
): Promise<ExecutionResult[]> {
  const results: ExecutionResult[] = [];

  for (const input of testInputs) {
    const result = await executeCode(code, languageId, input);
    results.push(result);
  }

  return results;
}

/**
 * Check if Piston API is available
 */
export async function checkPistonAvailability(): Promise<boolean> {
  try {
    const response = await fetch(`${PISTON_API}/runtimes`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}
