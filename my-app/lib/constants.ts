import { CategoryTemplate } from "./types";

// LocalStorage keys
export const STORAGE_KEYS = {
  CATEGORIES: "budget_categories",
  TRANSACTIONS: "budget_transactions",
  CATEGORY_TEMPLATES: "budget_category_templates",
  CURRENT_MONTH: "budget_current_month",
} as const;

// Default colors for categories
export const CATEGORY_COLORS = [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // orange
  "#ef4444", // red
  "#8b5cf6", // purple
  "#ec4899", // pink
  "#14b8a6", // teal
  "#f97316", // orange-600
  "#06b6d4", // cyan
  "#84cc16", // lime
];

// Default category templates
export const DEFAULT_CATEGORY_TEMPLATES: CategoryTemplate[] = [
  {
    id: "template-1",
    name: "Groceries",
    defaultAmount: 40000, // $400
    color: "#10b981",
    sortOrder: 1,
  },
  {
    id: "template-2",
    name: "Rent",
    defaultAmount: 100000, // $1000
    color: "#3b82f6",
    sortOrder: 2,
  },
  {
    id: "template-3",
    name: "Transportation",
    defaultAmount: 15000, // $150
    color: "#f59e0b",
    sortOrder: 3,
  },
  {
    id: "template-4",
    name: "Entertainment",
    defaultAmount: 10000, // $100
    color: "#ec4899",
    sortOrder: 4,
  },
  {
    id: "template-5",
    name: "Utilities",
    defaultAmount: 20000, // $200
    color: "#8b5cf6",
    sortOrder: 5,
  },
];

// Date format
export const DATE_FORMAT = "yyyy-MM-dd";
export const MONTH_FORMAT = "yyyy-MM";

// Currency
export const CURRENCY_SYMBOL = "$";
export const CURRENCY_LOCALE = "en-US";
