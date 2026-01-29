"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Transaction, BudgetCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface SpendingChartProps {
  transactions: Transaction[];
  categories: BudgetCategory[];
}

export function SpendingChart({ transactions, categories }: SpendingChartProps) {
  const chartData = useMemo(() => {
    const categorySpending: Record<string, number> = {};

    // Calculate spending per category
    transactions
      .filter((t) => t.amount < 0 && t.categoryId)
      .forEach((t) => {
        const categoryId = t.categoryId!;
        if (!categorySpending[categoryId]) {
          categorySpending[categoryId] = 0;
        }
        categorySpending[categoryId] += Math.abs(t.amount);
      });

    // Convert to chart data format
    return Object.entries(categorySpending).map(([categoryId, amount]) => {
      const category = categories.find((c) => c.id === categoryId);
      return {
        name: category?.name || "Unknown",
        value: amount / 100, // Convert to dollars
        amount: amount,
        color: category?.color || "#gray",
      };
    });
  }, [transactions, categories]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">
            No spending data available for this month.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value * 100)}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        {/* Category List */}
        <div className="mt-6 space-y-2">
          {chartData
            .sort((a, b) => b.amount - a.amount)
            .map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between py-2 border-b border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm font-bold">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
