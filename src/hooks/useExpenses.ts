import { useEffect, useState, useCallback, useMemo } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { Expense, Category } from "@/types/expense";

/**
 * Firestore structure:
 * users/{uid}/expenses/{expenseId}
 */

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 🔥 AUTH + REAL-TIME LISTENER
  useEffect(() => {
    let unsubscribeExpenses: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, user => {
      if (!user) {
        setExpenses([]);
        setIsLoaded(true);
        if (unsubscribeExpenses) unsubscribeExpenses();
        return;
      }

      const q = query(
        collection(db, "users", user.uid, "expenses"),
        orderBy("createdAt", "desc")
      );

      unsubscribeExpenses = onSnapshot(q, snapshot => {
        const data: Expense[] = snapshot.docs.map(docSnap => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            title: d.title,
            amount: d.amount,
            category: d.category,
            date: d.date,
            description: d.description,
          };
        });

        setExpenses(data);
        setIsLoaded(true);
      });
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeExpenses) unsubscribeExpenses();
    };
  }, []);

  // ➕ ADD
  const addExpense = useCallback(
    async (expense: Omit<Expense, "id">) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      await addDoc(collection(db, "users", user.uid, "expenses"), {
        ...expense,
        createdAt: Timestamp.now(),
      });
    },
    []
  );

  // ✏️ UPDATE
  const updateExpense = useCallback(
    async (id: string, updates: Partial<Omit<Expense, "id">>) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      await updateDoc(
        doc(db, "users", user.uid, "expenses", id),
        updates
      );
    },
    []
  );

  // 🗑 DELETE
  const deleteExpense = useCallback(
    async (id: string) => {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      await deleteDoc(doc(db, "users", user.uid, "expenses", id));
    },
    []
  );

  /* ======================
     REAL-TIME DERIVED DATA
     ====================== */

  // 🔢 TOTAL RECORDS
  const totalRecords = expenses.length;

  // 💰 TOTAL EXPENSE
  const totalExpense = useMemo(
    () => expenses.reduce((sum, exp) => sum + exp.amount, 0),
    [expenses]
  );

  // 📅 THIS MONTH TOTAL
  const thisMonthTotal = useMemo(() => {
    const now = new Date();
    return expenses
      .filter(exp => {
        const d = new Date(exp.date);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0);
  }, [expenses]);

  // 📊 TOTAL BY CATEGORY
  const totalByCategory = useMemo(() => {
    const totals: Record<Category, number> = {
      food: 0,
      transport: 0,
      entertainment: 0,
      shopping: 0,
      utilities: 0,
      health: 0,
      other: 0,
    };

    expenses.forEach(exp => {
      totals[exp.category] += exp.amount;
    });

    return totals;
  }, [expenses]);

  return {
    expenses,
    isLoaded,

    // actions
    addExpense,
    updateExpense,
    deleteExpense,

    // 🔥 real-time values
    totalExpense,
    thisMonthTotal,
    totalRecords,
    totalByCategory,
  };
};
