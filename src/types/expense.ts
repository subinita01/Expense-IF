export type Category =
  | "food"
  | "transport"
  | "entertainment"
  | "shopping"
  | "utilities"
  | "health"
  | "other";

export interface Expense {
  id: string;              // Firestore doc id
  title: string;
  amount: number;
  category: Category;
  date: string;            // ISO string (YYYY-MM-DD)
  description?: string;
}

export const CATEGORIES: {
  value: Category;
  label: string;
  color: string;
}[] = [
  { value: "food", label: "Food & Dining", color: "hsl(var(--category-food))" },
  { value: "transport", label: "Transport", color: "hsl(var(--category-transport))" },
  { value: "entertainment", label: "Entertainment", color: "hsl(var(--category-entertainment))" },
  { value: "shopping", label: "Shopping", color: "hsl(var(--category-shopping))" },
  { value: "utilities", label: "Utilities", color: "hsl(var(--category-utilities))" },
  { value: "health", label: "Health", color: "hsl(var(--category-health))" },
  { value: "other", label: "Other", color: "hsl(var(--category-other))" },
];

export const getCategoryColor = (category: Category): string =>
  CATEGORIES.find(c => c.value === category)?.color ?? "hsl(var(--category-other))";

export const getCategoryLabel = (category: Category): string =>
  CATEGORIES.find(c => c.value === category)?.label ?? "Other";
