"use client";

import { useState } from "react";
import { BudgetCategory, AmountInCents } from "@/lib/types";
import { parseCurrency, formatCurrency } from "@/lib/utils";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface MoneyMoverProps {
  categories: BudgetCategory[];
  onMove: (fromId: string, toId: string, amount: AmountInCents) => void;
  onCancel: () => void;
}

export function MoneyMover({ categories, onMove, onCancel }: MoneyMoverProps) {
  const [fromCategoryId, setFromCategoryId] = useState(categories[0]?.id || "");
  const [toCategoryId, setToCategoryId] = useState(categories[1]?.id || "");
  const [amountStr, setAmountStr] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromCategoryId || !toCategoryId) {
      alert("Please select both categories");
      return;
    }

    if (fromCategoryId === toCategoryId) {
      alert("Cannot move money to the same category");
      return;
    }

    const amount = parseCurrency(amountStr);

    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const fromCategory = categories.find((c) => c.id === fromCategoryId);
    if (fromCategory && amount > fromCategory.budgeted) {
      alert(
        `Not enough budgeted money in ${fromCategory.name}. Available: ${formatCurrency(
          fromCategory.budgeted
        )}`
      );
      return;
    }

    onMove(fromCategoryId, toCategoryId, amount);
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: `${cat.name} (${formatCurrency(cat.budgeted)})`,
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="From Category"
        value={fromCategoryId}
        onChange={(e) => setFromCategoryId(e.target.value)}
        options={categoryOptions}
      />

      <Select
        label="To Category"
        value={toCategoryId}
        onChange={(e) => setToCategoryId(e.target.value)}
        options={categoryOptions}
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

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          Move Money
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
