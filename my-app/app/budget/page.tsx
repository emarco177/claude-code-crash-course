"use client";

import { useState } from "react";
import Link from "next/link";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { AvailableMoneyCard } from "@/components/dashboard/AvailableMoneyCard";
import { CategoryCard } from "@/components/budget/CategoryCard";
import { CategoryForm } from "@/components/budget/CategoryForm";
import { MoneyMover } from "@/components/budget/MoneyMover";
import { useBudget } from "@/hooks/useBudget";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BudgetCategory } from "@/lib/types";

export default function BudgetPage() {
  const { currentMonth } = useApp();
  const {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    moveMoneyBetweenCategories,
  } = useBudget();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(
    null
  );

  const handleAddCategory = (data: {
    name: string;
    budgeted: number;
    color: string;
  }) => {
    addCategory({
      name: data.name,
      budgeted: data.budgeted,
      color: data.color,
      monthYear: currentMonth,
    });
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (data: {
    name: string;
    budgeted: number;
    color: string;
  }) => {
    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: data.name,
        budgeted: data.budgeted,
        color: data.color,
      });
      setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (category: BudgetCategory) => {
    if (
      confirm(
        `Are you sure you want to delete "${category.name}"? This will remove the category from all months.`
      )
    ) {
      deleteCategory(category.id);
    }
  };

  const handleMoveMoney = (fromId: string, toId: string, amount: number) => {
    moveMoneyBetweenCategories(fromId, toId, amount);
    setIsMoveModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Budget Management
            </h1>
            <p className="text-gray-600">
              Assign money to categories and move between them
            </p>
          </div>
          <Link href="/" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Month Selector */}
        <div className="mb-6">
          <MonthSelector />
        </div>

        {/* Available Money Card */}
        <div className="mb-6">
          <AvailableMoneyCard />
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
            + Add Category
          </Button>
          {categories.length >= 2 && (
            <Button onClick={() => setIsMoveModalOpen(true)} variant="secondary">
              Move Money Between Categories
            </Button>
          )}
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              No categories for this month. Create your first category!
            </p>
            <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
              Create Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={() => setEditingCategory(category)}
                onDelete={() => handleDeleteCategory(category)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Category"
      >
        <CategoryForm
          onSubmit={handleAddCategory}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Category Modal */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            onSubmit={handleEditCategory}
            onCancel={() => setEditingCategory(null)}
          />
        )}
      </Modal>

      {/* Move Money Modal */}
      <Modal
        isOpen={isMoveModalOpen}
        onClose={() => setIsMoveModalOpen(false)}
        title="Move Money Between Categories"
      >
        <MoneyMover
          categories={categories}
          onMove={handleMoveMoney}
          onCancel={() => setIsMoveModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
