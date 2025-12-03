import { useState, useEffect, useCallback } from 'react';
import { Expense, Category } from '@/types/expense';

const STORAGE_KEY = 'expense-tracker-data';

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setExpenses(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse expenses from localStorage');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = useCallback((expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
    };
    setExpenses(prev => [newExpense, ...prev]);
    return newExpense;
  }, []);

  const updateExpense = useCallback((id: string, updates: Partial<Omit<Expense, 'id'>>) => {
    setExpenses(prev => 
      prev.map(expense => 
        expense.id === id ? { ...expense, ...updates } : expense
      )
    );
  }, []);

  const deleteExpense = useCallback((id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  }, []);

  const getExpensesByCategory = useCallback((category: Category) => {
    return expenses.filter(expense => expense.category === category);
  }, [expenses]);

  const getTotalByCategory = useCallback(() => {
    const totals: Record<Category, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      other: 0,
    };

    expenses.forEach(expense => {
      totals[expense.category] += expense.amount;
    });

    return totals;
  }, [expenses]);

  const getTotal = useCallback(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const getThisMonthTotal = useCallback(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return expenses
      .filter(expense => {
        const date = new Date(expense.date);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  const getThisMonthExpenses = useCallback(() => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    return expenses.filter(expense => {
      const date = new Date(expense.date);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    });
  }, [expenses]);

  return {
    expenses,
    isLoaded,
    addExpense,
    updateExpense,
    deleteExpense,
    getExpensesByCategory,
    getTotalByCategory,
    getTotal,
    getThisMonthTotal,
    getThisMonthExpenses,
  };
};
