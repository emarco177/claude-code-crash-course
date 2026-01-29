"use client";

import { BudgetCategory } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface CategoryCardProps {
  category: BudgetCategory;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryCard({ category, onEdit, onDelete }: CategoryCardProps) {
  const percentageUsed =
    category.budgeted > 0
      ? Math.abs((category.activity / category.budgeted) * 100)
      : 0;

  const isOverspent = category.available < 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            <div
              className="w-6 h-6 rounded mt-1"
              style={{ backgroundColor: category.color }}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={onEdit}>
              Edit
            </Button>
            <Button size="sm" variant="danger" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {category.budgeted > 0 && (
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  isOverspent ? "bg-danger" : "bg-primary"
                }`}
                style={{
                  width: `${Math.min(percentageUsed, 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Amounts */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-gray-600">Budgeted</p>
            <p className="font-semibold">{formatCurrency(category.budgeted)}</p>
          </div>
          <div>
            <p className="text-gray-600">Activity</p>
            <p className="font-semibold">{formatCurrency(category.activity)}</p>
          </div>
          <div>
            <p className="text-gray-600">Available</p>
            <p
              className={`font-semibold ${
                isOverspent ? "text-danger" : "text-success"
              }`}
            >
              {formatCurrency(category.available)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
