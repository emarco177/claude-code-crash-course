"use client";

import { useState } from "react";
import { Transaction, BudgetCategory } from "@/lib/types";
import { parseCurrency, formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface TransactionFormProps {
  transaction?: Transaction;
  categories: BudgetCategory[];
  onSubmit: (data: {
    date: string;
    amount: number;
    payee: string;
    categoryId: string | null;
    memo: string;
    cleared: boolean;
  }) => void;
  onCancel: () => void;
}

export function TransactionForm({
  transaction,
  categories,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const [date, setDate] = useState(
    transaction?.date || new Date().toISOString().split("T")[0]
  );
  const [amountStr, setAmountStr] = useState(
    transaction
      ? Math.abs(transaction.amount / 100).toFixed(2)
      : ""
  );
  const [isExpense, setIsExpense] = useState(
    transaction ? transaction.amount < 0 : true
  );
  const [payee, setPayee] = useState(transaction?.payee || "");
  const [categoryId, setCategoryId] = useState<string | null>(
    transaction?.categoryId || (categories.length > 0 ? categories[0].id : null)
  );
  const [memo, setMemo] = useState(transaction?.memo || "");
  const [cleared, setCleared] = useState(transaction?.cleared || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!payee.trim()) {
      alert("Please enter a payee");
      return;
    }

    let amount = parseCurrency(amountStr);
    if (isExpense) {
      amount = -amount;
    }

    onSubmit({
      date,
      amount,
      payee: payee.trim(),
      categoryId: isExpense ? categoryId : null,
      memo: memo.trim(),
      cleared,
    });
  };

  const categoryOptions = [
    { value: "", label: "No Category" },
    ...categories.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })),
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex items-end gap-2">
          <Button
            type="button"
            variant={isExpense ? "danger" : "secondary"}
            onClick={() => setIsExpense(true)}
          >
            Expense
          </Button>
          <Button
            type="button"
            variant={!isExpense ? "success" : "secondary"}
            onClick={() => setIsExpense(false)}
          >
            Income
          </Button>
        </div>
      </div>

      <Input
        label="Payee"
        value={payee}
        onChange={(e) => setPayee(e.target.value)}
        placeholder="e.g., Grocery Store"
        required
      />

      <Input
        label="Amount"
        value={amountStr}
        onChange={(e) => setAmountStr(e.target.value)}
        placeholder="0.00"
        type="number"
        step="0.01"
        min="0.01"
        required
      />

      {isExpense && (
        <Select
          label="Category"
          value={categoryId || ""}
          onChange={(e) => setCategoryId(e.target.value || null)}
          options={categoryOptions}
        />
      )}

      <Input
        label="Memo (Optional)"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="Add a note..."
      />

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="cleared"
          checked={cleared}
          onChange={(e) => setCleared(e.target.checked)}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="cleared" className="text-sm text-gray-700">
          Cleared (transaction has posted to account)
        </label>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {transaction ? "Update" : "Add"} Transaction
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
