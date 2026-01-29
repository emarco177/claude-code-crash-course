"use client";

import { useState } from "react";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { AvailableMoneyCard } from "@/components/dashboard/AvailableMoneyCard";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { CategoryCard } from "@/components/budget/CategoryCard";
import { CategoryForm } from "@/components/budget/CategoryForm";
import { useBudget } from "@/hooks/useBudget";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BudgetCategory } from "@/lib/types";

export default function HomePage() {
  const { currentMonth } = useApp();
  const { categories, addCategory, updateCategory, deleteCategory } = useBudget();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            My Budget App
          </h1>
          <p className="text-gray-600">
            Give every dollar a job - YNAB style budgeting
          </p>
        </div>

        {/* Month Selector */}
        <div className="mb-6">
          <MonthSelector />
        </div>

        {/* Available Money Card */}
        <div className="mb-6">
          <AvailableMoneyCard />
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats />
        </div>

        {/* Categories Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Budget Categories</h2>
          <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
            + Add Category
          </Button>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">
              No categories yet. Create your first category to start budgeting!
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

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/budget"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Manage Budget
            </h3>
            <p className="text-gray-600 text-sm">
              Assign money and move between categories
            </p>
          </a>
          <a
            href="/transactions"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Transactions
            </h3>
            <p className="text-gray-600 text-sm">
              Record income and expenses
            </p>
          </a>
          <a
            href="/reports"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Reports
            </h3>
            <p className="text-gray-600 text-sm">
              View spending trends and insights
            </p>
          </a>
        </div>
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
    </div>
  );
}
