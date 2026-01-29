"use client";

import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestResult {
  passed: boolean;
  input: string;
  expected: string;
  actual?: string;
  error?: string;
}

interface TestResultsProps {
  results: TestResult[];
  isLoading: boolean;
}

export function TestResults({ results, isLoading }: TestResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Running tests...</span>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Run your code to see test results
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {results.map((result, index) => (
        <div
          key={index}
          className={cn(
            "p-3 rounded-lg border",
            result.passed
              ? "border-green-500/30 bg-green-500/10"
              : "border-red-500/30 bg-red-500/10"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {result.passed ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span
              className={cn(
                "font-medium text-sm",
                result.passed ? "text-green-400" : "text-red-400"
              )}
            >
              Test Case {index + 1}
            </span>
          </div>

          <div className="space-y-1 text-xs font-mono">
            <div className="flex gap-2">
              <span className="text-muted-foreground w-16">Input:</span>
              <span className="text-foreground">{result.input}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground w-16">Expected:</span>
              <span className="text-foreground">{result.expected}</span>
            </div>
            {result.actual && (
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16">Actual:</span>
                <span
                  className={
                    result.passed ? "text-green-400" : "text-red-400"
                  }
                >
                  {result.actual}
                </span>
              </div>
            )}
            {result.error && (
              <div className="flex gap-2">
                <span className="text-muted-foreground w-16">Error:</span>
                <span className="text-red-400">{result.error}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
