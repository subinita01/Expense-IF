import { useState } from 'react';
import { Header } from '@/components/Header';
import { SummaryCards } from '@/components/SummaryCards';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseList } from '@/components/ExpenseList';
import { ExpenseChart } from '@/components/ExpenseChart';
import { useExpenses } from '@/hooks/useExpenses';
import { Expense } from '@/types/expense';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalByCategory,
    getTotal,
    getThisMonthTotal,
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleSubmit = (expenseData: Omit<Expense, 'id'>) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, expenseData);
      setEditingExpense(null);
    } else {
      addExpense(expenseData);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-neon-mint/5 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-32 h-80 w-80 rounded-full bg-neon-purple/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 h-48 w-48 rounded-full bg-neon-blue/5 blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <main className="container relative mx-auto px-4 py-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-neon-purple" />
              <span className="text-xs font-medium text-neon-purple uppercase tracking-wider">Dashboard</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Track Your <span className="gradient-text">Expenses</span>
            </h2>
            <p className="mt-1 text-muted-foreground">Monitor and manage your spending effortlessly</p>
          </div>
          <ExpenseForm
            onSubmit={handleSubmit}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="space-y-8">
          <SummaryCards
            total={getTotal()}
            monthTotal={getThisMonthTotal()}
            expenseCount={expenses.length}
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ExpenseList
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={deleteExpense}
              />
            </div>
            <div>
              <ExpenseChart categoryTotals={getTotalByCategory()} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-8 text-center">
          <p className="text-xs text-muted-foreground">
            
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
