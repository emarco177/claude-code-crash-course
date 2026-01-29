"use client";

import { useState } from "react";
import { BudgetCategory } from "@/lib/types";
import { parseCurrency, formatCurrency } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface CategoryFormProps {
  category?: BudgetCategory;
  onSubmit: (data: { name: string; budgeted: number; color: string }) => void;
  onCancel: () => void;
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState(category?.name || "");
  const [budgetedStr, setBudgetedStr] = useState(
    category ? formatCurrency(category.budgeted).replace("$", "") : ""
  );
  const [color, setColor] = useState(category?.color || CATEGORY_COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a category name");
      return;
    }

    const budgeted = parseCurrency(budgetedStr);

    onSubmit({ name: name.trim(), budgeted, color });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Groceries"
        required
      />

      <Input
        label="Budgeted Amount"
        value={budgetedStr}
        onChange={(e) => setBudgetedStr(e.target.value)}
        placeholder="0.00"
        type="number"
        step="0.01"
        min="0"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color
        </label>
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full transition-transform ${
                color === c ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {category ? "Update" : "Create"} Category
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
