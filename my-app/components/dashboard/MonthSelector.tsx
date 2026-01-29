"use client";

import { useApp } from "@/context/AppContext";
import { formatMonth, getNextMonth, getPreviousMonth } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function MonthSelector() {
  const { currentMonth, setCurrentMonth } = useApp();

  const handlePrevious = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNext = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
      <Button onClick={handlePrevious} variant="secondary" size="sm">
        ← Previous
      </Button>

      <h2 className="text-2xl font-bold text-gray-900">
        {formatMonth(currentMonth)}
      </h2>

      <Button onClick={handleNext} variant="secondary" size="sm">
        Next →
      </Button>
    </div>
  );
}
