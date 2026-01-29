"use client";

import { useState } from "react";
import Link from "next/link";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import { useBudget } from "@/hooks/useBudget";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Transaction } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function TransactionsPage() {
  const { transactions, income, expenses, addTransaction, updateTransaction, deleteTransaction } =
    useTransactions();
  const { categories } = useBudget();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(
    null
  );

  const handleAddTransaction = (data: {
    date: string;
    amount: number;
    payee: string;
    categoryId: string | null;
    memo: string;
    cleared: boolean;
  }) => {
    addTransaction(data);
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = (data: {
    date: string;
    amount: number;
    payee: string;
    categoryId: string | null;
    memo: string;
    cleared: boolean;
  }) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
    }
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    if (confirm(`Are you sure you want to delete this transaction?`)) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Transactions
            </h1>
            <p className="text-gray-600">Record all your income and expenses</p>
          </div>
          <Link href="/" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
        </div>

        {/* Month Selector */}
        <div className="mb-6">
          <MonthSelector />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 mb-1">Income</p>
            <p className="text-2xl font-bold text-success">
              {formatCurrency(income)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 mb-1">Expenses</p>
            <p className="text-2xl font-bold text-gray-700">
              {formatCurrency(expenses)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-600 mb-1">Net</p>
            <p
              className={`text-2xl font-bold ${
                income - expenses >= 0 ? "text-success" : "text-danger"
              }`}
            >
              {formatCurrency(income - expenses)}
            </p>
          </div>
        </div>

        {/* Add Transaction Button */}
        <div className="mb-6">
          <Button onClick={() => setIsAddModalOpen(true)} variant="primary">
            + Add Transaction
          </Button>
        </div>

        {/* Transactions List */}
        <TransactionList
          transactions={transactions}
          categories={categories}
          onEdit={setEditingTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>

      {/* Add Transaction Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Transaction"
      >
        <TransactionForm
          categories={categories}
          onSubmit={handleAddTransaction}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Transaction Modal */}
      <Modal
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        title="Edit Transaction"
      >
        {editingTransaction && (
          <TransactionForm
            transaction={editingTransaction}
            categories={categories}
            onSubmit={handleEditTransaction}
            onCancel={() => setEditingTransaction(null)}
          />
        )}
      </Modal>
    </div>
  );
}
