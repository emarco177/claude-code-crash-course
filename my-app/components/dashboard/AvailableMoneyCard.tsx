"use client";

import { useBudget } from "@/hooks/useBudget";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function AvailableMoneyCard() {
  const { summary } = useBudget();

  const isPositive = summary.toBeAssigned >= 0;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-center">Ready to Assign</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <p
            className={`text-4xl font-bold ${
              isPositive ? "text-positive" : "text-negative"
            }`}
          >
            {formatCurrency(summary.toBeAssigned)}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {isPositive
              ? "Assign this money to categories"
              : "You've over-assigned your money!"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
