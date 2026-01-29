"use client";

import { Transaction, BudgetCategory } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface TransactionItemProps {
  transaction: Transaction;
  category?: BudgetCategory;
  onEdit: () => void;
  onDelete: () => void;
}

export function TransactionItem({
  transaction,
  category,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const isIncome = transaction.amount > 0;

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <div
            className={`w-2 h-2 rounded-full ${
              transaction.cleared ? "bg-success" : "bg-gray-300"
            }`}
            title={transaction.cleared ? "Cleared" : "Uncleared"}
          />
          <span className="font-semibold text-gray-900">
            {transaction.payee}
          </span>
          <span className="text-sm text-gray-500">
            {formatDate(transaction.date)}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {category && (
            <span
              className="px-2 py-1 rounded text-white text-xs"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          )}
          {transaction.memo && (
            <span className="text-gray-600 italic">{transaction.memo}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`text-lg font-bold ${
            isIncome ? "text-success" : "text-gray-700"
          }`}
        >
          {isIncome ? "+" : ""}
          {formatCurrency(transaction.amount)}
        </span>

        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
