"use client";

import { useBudget } from "@/hooks/useBudget";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";

export function QuickStats() {
  const { summary } = useBudget();

  const stats = [
    {
      label: "Income",
      value: summary.income,
      color: "text-success",
    },
    {
      label: "Budgeted",
      value: summary.budgeted,
      color: "text-primary",
    },
    {
      label: "Spent",
      value: summary.spent,
      color: "text-gray-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {formatCurrency(stat.value)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
