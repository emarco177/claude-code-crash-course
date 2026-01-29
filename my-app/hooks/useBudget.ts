"use client";

import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { BudgetCategory } from "@/lib/types";

export function useBudget(monthYear?: string) {
  const {
    categories,
    currentMonth,
    getCategoriesByMonth,
    getMonthSummary,
    addCategory,
    updateCategory,
    deleteCategory,
    assignMoneyToCategory,
    moveMoneyBetweenCategories,
  } = useApp();

  const activeMonth = monthYear || currentMonth;

  const monthCategories = useMemo(
    () => getCategoriesByMonth(activeMonth),
    [categories, activeMonth]
  );

  const summary = useMemo(
    () => getMonthSummary(activeMonth),
    [categories, activeMonth]
  );

  const totalBudgeted = useMemo(
    () => monthCategories.reduce((sum, cat) => sum + cat.budgeted, 0),
    [monthCategories]
  );

  const totalActivity = useMemo(
    () => monthCategories.reduce((sum, cat) => sum + cat.activity, 0),
    [monthCategories]
  );

  const totalAvailable = useMemo(
    () => monthCategories.reduce((sum, cat) => sum + cat.available, 0),
    [monthCategories]
  );

  return {
    categories: monthCategories,
    summary,
    totalBudgeted,
    totalActivity,
    totalAvailable,
    addCategory,
    updateCategory,
    deleteCategory,
    assignMoneyToCategory,
    moveMoneyBetweenCategories,
  };
}
