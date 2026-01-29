"use client";

import Link from "next/link";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { SpendingChart } from "@/components/reports/SpendingChart";
import { TrendChart } from "@/components/reports/TrendChart";
import { CategoryBreakdown } from "@/components/reports/CategoryBreakdown";
import { useTransactions } from "@/hooks/useTransactions";
import { useBudget } from "@/hooks/useBudget";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Storage } from "@/lib/storage";

export default function ReportsPage() {
  const { transactions: allTransactions } = useApp();
  const { transactions, income, expenses } = useTransactions();
  const { categories } = useBudget();

  const handleExportData = () => {
    const data = Storage.exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `budget-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const success = Storage.importData(content);
          if (success) {
            alert("Data imported successfully! Refreshing page...");
            window.location.reload();
          } else {
            alert("Failed to import data. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear ALL data? This action cannot be undone!"
      )
    ) {
      if (
        confirm(
          "This will permanently delete all categories, transactions, and settings. Are you absolutely sure?"
        )
      ) {
        Storage.clear();
        alert("All data cleared. Refreshing page...");
        window.location.reload();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Reports & Analytics
            </h1>
            <p className="text-gray-600">
              Visualize your spending patterns and trends
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SpendingChart transactions={transactions} categories={categories} />
          <TrendChart allTransactions={allTransactions} />
        </div>

        {/* Category Breakdown */}
        <div className="mb-8">
          <CategoryBreakdown transactions={transactions} categories={categories} />
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Data Management
          </h2>
          <p className="text-gray-600 mb-6">
            Export your data for backup or import previously exported data.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Button onClick={handleExportData} variant="primary">
              Export Data
            </Button>
            <Button onClick={handleImportData} variant="secondary">
              Import Data
            </Button>
            <Button onClick={handleClearData} variant="danger">
              Clear All Data
            </Button>
          </div>

          {/* Storage Usage */}
          <div className="mt-6">
            <p className="text-sm text-gray-600">
              LocalStorage Usage:{" "}
              <span className="font-semibold">
                {Storage.getUsagePercentage().toFixed(2)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
