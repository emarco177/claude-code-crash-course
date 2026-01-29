"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  BudgetCategory,
  Transaction,
  CategoryTemplate,
  MonthSummary,
  AmountInCents,
} from "@/lib/types";
import { STORAGE_KEYS, DEFAULT_CATEGORY_TEMPLATES } from "@/lib/constants";
import { getCurrentMonth, generateId, getMonthFromDate } from "@/lib/utils";

interface AppContextType {
  // State
  categories: BudgetCategory[];
  transactions: Transaction[];
  categoryTemplates: CategoryTemplate[];
  currentMonth: string;

  // Category operations
  addCategory: (category: Omit<BudgetCategory, "id" | "activity" | "available">) => void;
  updateCategory: (id: string, updates: Partial<BudgetCategory>) => void;
  deleteCategory: (id: string) => void;
  getCategoryById: (id: string) => BudgetCategory | undefined;

  // Transaction operations
  addTransaction: (transaction: Omit<Transaction, "id" | "monthYear">) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransactionsByMonth: (monthYear: string) => Transaction[];

  // Budget operations
  assignMoneyToCategory: (categoryId: string, amount: AmountInCents) => void;
  moveMoneyBetweenCategories: (
    fromCategoryId: string,
    toCategoryId: string,
    amount: AmountInCents
  ) => void;

  // Month operations
  setCurrentMonth: (monthYear: string) => void;
  getMonthSummary: (monthYear: string) => MonthSummary;

  // Computed values
  getCategoriesByMonth: (monthYear: string) => BudgetCategory[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useLocalStorage<BudgetCategory[]>(
    STORAGE_KEYS.CATEGORIES,
    []
  );

  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(
    STORAGE_KEYS.TRANSACTIONS,
    []
  );

  const [categoryTemplates, setCategoryTemplates] = useLocalStorage<
    CategoryTemplate[]
  >(STORAGE_KEYS.CATEGORY_TEMPLATES, DEFAULT_CATEGORY_TEMPLATES);

  const [currentMonth, setCurrentMonth] = useLocalStorage<string>(
    STORAGE_KEYS.CURRENT_MONTH,
    getCurrentMonth()
  );

  // Category operations
  const addCategory = (
    category: Omit<BudgetCategory, "id" | "activity" | "available">
  ) => {
    const newCategory: BudgetCategory = {
      ...category,
      id: generateId(),
      activity: 0,
      available: category.budgeted,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<BudgetCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === id) {
          const updated = { ...cat, ...updates };
          // Recalculate available if budgeted changed
          if (updates.budgeted !== undefined) {
            updated.available = updated.budgeted + updated.activity;
          }
          return updated;
        }
        return cat;
      })
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    // Remove category from transactions
    setTransactions((prev) =>
      prev.map((t) => (t.categoryId === id ? { ...t, categoryId: null } : t))
    );
  };

  const getCategoryById = (id: string) => {
    return categories.find((cat) => cat.id === id);
  };

  // Transaction operations
  const addTransaction = (transaction: Omit<Transaction, "id" | "monthYear">) => {
    const monthYear = getMonthFromDate(transaction.date);
    const newTransaction: Transaction = {
      ...transaction,
      id: generateId(),
      monthYear,
    };
    setTransactions((prev) => [...prev, newTransaction]);

    // Update category activity
    if (transaction.categoryId) {
      updateCategoryActivity(transaction.categoryId, monthYear);
    }
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = { ...t, ...updates };
          // Update monthYear if date changed
          if (updates.date) {
            updated.monthYear = getMonthFromDate(updates.date);
          }
          return updated;
        }
        return t;
      })
    );

    // Recalculate affected categories
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      if (transaction.categoryId) {
        updateCategoryActivity(transaction.categoryId, transaction.monthYear);
      }
      if (updates.categoryId && updates.categoryId !== transaction.categoryId) {
        updateCategoryActivity(updates.categoryId, transaction.monthYear);
      }
    }
  };

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    // Update category activity
    if (transaction?.categoryId) {
      updateCategoryActivity(transaction.categoryId, transaction.monthYear);
    }
  };

  const getTransactionsByMonth = (monthYear: string) => {
    return transactions.filter((t) => t.monthYear === monthYear);
  };

  // Helper: Update category activity based on transactions
  const updateCategoryActivity = (categoryId: string, monthYear: string) => {
    const categoryTransactions = transactions.filter(
      (t) => t.categoryId === categoryId && t.monthYear === monthYear
    );
    const activity = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId && cat.monthYear === monthYear) {
          return {
            ...cat,
            activity,
            available: cat.budgeted + activity,
          };
        }
        return cat;
      })
    );
  };

  // Budget operations
  const assignMoneyToCategory = (categoryId: string, amount: AmountInCents) => {
    updateCategory(categoryId, {
      budgeted: amount,
    });
  };

  const moveMoneyBetweenCategories = (
    fromCategoryId: string,
    toCategoryId: string,
    amount: AmountInCents
  ) => {
    const fromCategory = getCategoryById(fromCategoryId);
    const toCategory = getCategoryById(toCategoryId);

    if (!fromCategory || !toCategory) return;

    updateCategory(fromCategoryId, {
      budgeted: fromCategory.budgeted - amount,
    });

    updateCategory(toCategoryId, {
      budgeted: toCategory.budgeted + amount,
    });
  };

  // Month operations
  const getCategoriesByMonth = (monthYear: string) => {
    return categories.filter((cat) => cat.monthYear === monthYear);
  };

  const getMonthSummary = (monthYear: string): MonthSummary => {
    const monthTransactions = getTransactionsByMonth(monthYear);
    const monthCategories = getCategoriesByMonth(monthYear);

    const income = monthTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const spent = Math.abs(
      monthTransactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const budgeted = monthCategories.reduce((sum, cat) => sum + cat.budgeted, 0);

    const toBeAssigned = income - budgeted;

    return {
      monthYear,
      income,
      budgeted,
      spent,
      toBeAssigned,
    };
  };

  const value = useMemo(
    () => ({
      categories,
      transactions,
      categoryTemplates,
      currentMonth,
      addCategory,
      updateCategory,
      deleteCategory,
      getCategoryById,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      getTransactionsByMonth,
      assignMoneyToCategory,
      moveMoneyBetweenCategories,
      setCurrentMonth,
      getMonthSummary,
      getCategoriesByMonth,
    }),
    [categories, transactions, categoryTemplates, currentMonth]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
