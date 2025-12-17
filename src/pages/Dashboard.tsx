import { useState, useMemo } from "react";
import { Sparkles, Activity } from "lucide-react";

import { Header } from "@/components/Header";
import { SummaryCards } from "@/components/SummaryCards";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { ExpenseChart } from "@/components/ExpenseChart";

import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/expense";

const Dashboard = () => {
  const {
    expenses,
    isLoaded,

    // 🔥 REAL-TIME DERIVED VALUES (FROM HOOK)
    totalExpense,
    thisMonthTotal,
    totalRecords,
    totalByCategory,

    // actions
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleSubmit = async (expenseData: Omit<Expense, "id">) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      await addExpense(expenseData);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  // 🔥 Live update indicator
  const lastUpdated = useMemo(
    () => new Date().toLocaleTimeString(),
    [expenses]
  );

  // ⏳ Loading state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading real-time data…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-neon-purple" />
              <span className="text-xs font-medium text-neon-purple uppercase tracking-wider">
                Dashboard
              </span>
            </div>

            <h2 className="text-3xl font-bold">
              Track Your <span className="gradient-text">Expenses</span>
            </h2>

            <p className="mt-1 text-muted-foreground">
              Real-time updates powered by Firestore
            </p>
          </div>

          <ExpenseForm
            onSubmit={handleSubmit}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        {/* 🔴 LIVE STATUS */}
        <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
          <Activity className="h-4 w-4 text-green-500 animate-pulse" />
          <span className="text-green-500 font-medium">LIVE</span>
          <span>Last update: {lastUpdated}</span>
        </div>

        {/* 📊 SUMMARY */}
        <SummaryCards
          total={totalExpense}
          monthTotal={thisMonthTotal}
          expenseCount={totalRecords}
        />

        {/* 📋 CONTENT */}
        {expenses.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No expenses yet. Add your first one ✨
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3 mt-8">
            <div className="lg:col-span-2">
              <ExpenseList
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={deleteExpense}
              />
            </div>
            <div>
              <ExpenseChart categoryTotals={totalByCategory} />
            </div>
          </div>
        )}

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Real-time sync · Firebase · React · TypeScript
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
