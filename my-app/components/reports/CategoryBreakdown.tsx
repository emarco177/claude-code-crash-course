"use client";

import { useMemo } from "react";
import { Transaction, BudgetCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface CategoryBreakdownProps {
  transactions: Transaction[];
  categories: BudgetCategory[];
}

export function CategoryBreakdown({
  transactions,
  categories,
}: CategoryBreakdownProps) {
  const breakdownData = useMemo(() => {
    return categories
      .map((category) => {
        const categoryTransactions = transactions.filter(
          (t) => t.categoryId === category.id
        );

        const spent = Math.abs(
          categoryTransactions
            .filter((t) => t.amount < 0)
            .reduce((sum, t) => sum + t.amount, 0)
        );

        const percentUsed =
          category.budgeted > 0
            ? (spent / category.budgeted) * 100
            : 0;

        const remaining = category.available;

        return {
          ...category,
          spent,
          percentUsed,
          remaining,
          transactionCount: categoryTransactions.length,
        };
      })
      .sort((a, b) => b.spent - a.spent);
  }, [transactions, categories]);

  if (breakdownData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">
            No categories available for this month.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {breakdownData.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {item.transactionCount} transactions
                </span>
              </div>

              {/* Progress Bar */}
              {item.budgeted > 0 && (
                <div className="mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        item.remaining < 0 ? "bg-danger" : "bg-primary"
                      }`}
                      style={{
                        width: `${Math.min(item.percentUsed, 100)}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {item.percentUsed.toFixed(1)}% used
                  </p>
                </div>
              )}

              {/* Amounts */}
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Budgeted</p>
                  <p className="font-semibold">
                    {formatCurrency(item.budgeted)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Spent</p>
                  <p className="font-semibold">{formatCurrency(item.spent)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Remaining</p>
                  <p
                    className={`font-semibold ${
                      item.remaining < 0 ? "text-danger" : "text-success"
                    }`}
                  >
                    {formatCurrency(item.remaining)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
