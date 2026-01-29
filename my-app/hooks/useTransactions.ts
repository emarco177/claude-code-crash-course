"use client";

import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { Transaction } from "@/lib/types";

export function useTransactions(monthYear?: string) {
  const {
    transactions,
    currentMonth,
    getTransactionsByMonth,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useApp();

  const activeMonth = monthYear || currentMonth;

  const monthTransactions = useMemo(
    () => getTransactionsByMonth(activeMonth),
    [transactions, activeMonth]
  );

  const income = useMemo(
    () =>
      monthTransactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
    [monthTransactions]
  );

  const expenses = useMemo(
    () =>
      Math.abs(
        monthTransactions
          .filter((t) => t.amount < 0)
          .reduce((sum, t) => sum + t.amount, 0)
      ),
    [monthTransactions]
  );

  const netIncome = useMemo(
    () => income - expenses,
    [income, expenses]
  );

  const filterTransactions = (filters: {
    categoryId?: string | null;
    cleared?: boolean;
    minAmount?: number;
    maxAmount?: number;
  }) => {
    return monthTransactions.filter((t) => {
      if (filters.categoryId !== undefined && t.categoryId !== filters.categoryId) {
        return false;
      }
      if (filters.cleared !== undefined && t.cleared !== filters.cleared) {
        return false;
      }
      if (filters.minAmount !== undefined && t.amount < filters.minAmount) {
        return false;
      }
      if (filters.maxAmount !== undefined && t.amount > filters.maxAmount) {
        return false;
      }
      return true;
    });
  };

  const sortTransactions = (
    transactionsToSort: Transaction[],
    sortBy: "date" | "amount" | "payee",
    order: "asc" | "desc" = "desc"
  ) => {
    return [...transactionsToSort].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortBy === "amount") {
        comparison = a.amount - b.amount;
      } else if (sortBy === "payee") {
        comparison = a.payee.localeCompare(b.payee);
      }
      return order === "asc" ? comparison : -comparison;
    });
  };

  return {
    transactions: monthTransactions,
    income,
    expenses,
    netIncome,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    filterTransactions,
    sortTransactions,
  };
}
