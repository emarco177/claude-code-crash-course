"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface AITipButtonProps {
  challengeTitle: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  language: string;
}

function buildTip({ difficulty, tags, language }: Omit<AITipButtonProps, "challengeTitle">) {
  const difficultyAdvice: Record<AITipButtonProps["difficulty"], string> = {
    EASY: "Keep the control flow linear and favor clear helper functions over clever tricks.",
    MEDIUM: "Think about separating parsing/validation from the core algorithm so each path is testable.",
    HARD: "Sketch the algorithm on paper first and define interfaces before writing heavy logic."
  };

  const syntaxHint = language === "python"
    ? "Rely on list/dict comprehensions sparingly; explicit loops are easier to debug here."
    : "Leverage TypeScript's type hints to document the shape of your data structures."

  const tagHint = tags.length > 0
    ? `Since this touches ${tags.slice(0, 2).join(" & ")}, outline your data transformations before coding.`
    : "Start by naming intermediate variables after what they represent in the problem statement.";

  return `${difficultyAdvice[difficulty]} ${tagHint} ${syntaxHint}`;
}

export function AITipButton(props: AITipButtonProps) {
  const [tip, setTip] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setTip(buildTip(props));
      setLoading(false);
    }, 300); // quick delay to feel "AI-generated"
  };

  return (
    <div className="mt-3 space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-2"
      >
        <Sparkles className="h-4 w-4 text-cyan-300" />
        {loading ? "Thinking..." : "AI Architektur Tipp"}
      </Button>
      {tip && (
        <p className="text-xs text-cyan-300/90 bg-cyan-500/10 border border-cyan-500/20 rounded-md p-2">
          {tip}
        </p>
      )}
    </div>
  );
}
