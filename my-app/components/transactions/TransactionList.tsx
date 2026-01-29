"use client";

import { Transaction, BudgetCategory } from "@/lib/types";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  categories: BudgetCategory[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
}

export function TransactionList({
  transactions,
  categories,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-600">
          No transactions yet. Add your first transaction!
        </p>
      </div>
    );
  }

  // Sort by date, newest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedTransactions.map((transaction) => {
        const category = categories.find((c) => c.id === transaction.categoryId);
        return (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            category={category}
            onEdit={() => onEdit(transaction)}
            onDelete={() => onDelete(transaction)}
          />
        );
      })}
    </div>
  );
}
