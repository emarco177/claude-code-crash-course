// Core type for money amounts (stored in cents to avoid floating point errors)
export type AmountInCents = number;

// Budget Category (Envelope)
export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: AmountInCents;      // Amount assigned to this category
  activity: AmountInCents;       // Spent/received in this category
  available: AmountInCents;      // budgeted + activity
  color: string;
  monthYear: string;             // "2026-01"
}

// Transaction
export interface Transaction {
  id: string;
  date: string;                  // ISO date string
  amount: AmountInCents;         // Negative for expenses, positive for income
  payee: string;
  categoryId: string | null;     // null for income or uncategorized
  memo?: string;
  cleared: boolean;
  monthYear: string;             // "2026-01"
}

// Category Template (for creating categories each month)
export interface CategoryTemplate {
  id: string;
  name: string;
  defaultAmount: AmountInCents;
  color: string;
  sortOrder: number;
}

// Month Summary
export interface MonthSummary {
  monthYear: string;
  income: AmountInCents;
  budgeted: AmountInCents;
  spent: AmountInCents;
  toBeAssigned: AmountInCents;
}

// App State
export interface AppState {
  categories: BudgetCategory[];
  transactions: Transaction[];
  categoryTemplates: CategoryTemplate[];
  currentMonth: string;          // "2026-01"
}

// Category form data
export interface CategoryFormData {
  name: string;
  budgeted: string;              // String for form input, converted to cents
  color: string;
}

// Transaction form data
export interface TransactionFormData {
  date: string;
  amount: string;                // String for form input
  payee: string;
  categoryId: string | null;
  memo: string;
  cleared: boolean;
}
