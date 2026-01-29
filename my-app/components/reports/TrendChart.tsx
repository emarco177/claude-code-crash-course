"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Transaction } from "@/lib/types";
import { formatCurrency, getMonthFromDate, formatMonth } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface TrendChartProps {
  allTransactions: Transaction[];
}

export function TrendChart({ allTransactions }: TrendChartProps) {
  const chartData = useMemo(() => {
    // Group transactions by month
    const monthlyData: Record<
      string,
      { income: number; expenses: number }
    > = {};

    allTransactions.forEach((t) => {
      const month = t.monthYear;
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0 };
      }

      if (t.amount > 0) {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expenses += Math.abs(t.amount);
      }
    });

    // Convert to chart format and sort by date
    return Object.entries(monthlyData)
      .map(([month, data]) => ({
        month: formatMonth(month),
        monthKey: month,
        income: data.income / 100,
        expenses: data.expenses / 100,
        net: (data.income - data.expenses) / 100,
      }))
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
      .slice(-6); // Last 6 months
  }, [allTransactions]);

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Income vs Expenses Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-center py-8">
            No transaction data available yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expenses Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value * 100)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              name="Expenses"
            />
            <Line
              type="monotone"
              dataKey="net"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Net"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
