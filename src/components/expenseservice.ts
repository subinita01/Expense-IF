import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { Expense } from "@/types/expense";

/**
 * Firestore path:
 * users/{uid}/expenses/{expenseId}
 */

export const addExpense = async (
  expense: Omit<Expense, "id">
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  await addDoc(collection(db, "users", user.uid, "expenses"), {
    ...expense,
    createdAt: new Date(),
  });
};

export const getExpenses = async (): Promise<Expense[]> => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "users", user.uid, "expenses"),
    orderBy("date", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Expense, "id">),
  }));
};
