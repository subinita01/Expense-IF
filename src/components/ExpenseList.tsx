import { useState } from 'react';
import { Pencil, Trash2, Search, Filter, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Expense, Category, CATEGORIES, getCategoryLabel, getCategoryColor } from '@/types/expense';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border/30">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Recent Expenses</h3>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50"
            />
          </div>
          <Select value={categoryFilter} onValueChange={(val) => setCategoryFilter(val as Category | 'all')}>
            <SelectTrigger className="w-full sm:w-52 h-12 rounded-xl bg-secondary/50 border-border/30">
              <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="glass-card border-border/30 rounded-xl">
              <SelectItem value="all" className="rounded-lg">All Categories</SelectItem>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value} className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
                    />
                    {cat.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4">
        {filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-2xl bg-secondary/50 p-5">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="font-display text-lg font-medium text-foreground">No expenses found</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              {expenses.length === 0 
                ? 'Start tracking your spending by adding your first expense'
                : 'Try adjusting your search or filter criteria'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredExpenses.map((expense, index) => (
              <div
                key={expense.id}
                className="animate-fade-in group flex items-center justify-between rounded-2xl border border-border/20 bg-secondary/30 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${getCategoryColor(expense.category)}15`,
                      boxShadow: `0 0 20px ${getCategoryColor(expense.category)}20`
                    }}
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ 
                        backgroundColor: getCategoryColor(expense.category),
                        boxShadow: `0 0 10px ${getCategoryColor(expense.category)}`
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{expense.title}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full bg-secondary/50">{getCategoryLabel(expense.category)}</span>
                      <span>•</span>
                      <span>{formatDate(expense.date)}</span>
                    </div>
                    {expense.description && (
                      <p className="mt-1 truncate text-xs text-muted-foreground/70">
                        {expense.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="flex items-center gap-1 text-lg font-bold text-foreground font-display">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      {formatCurrency(expense.amount)}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-neon-blue/10 hover:text-neon-blue"
                      onClick={() => onEdit(expense)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="glass-card border-border/30 rounded-3xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="font-display">Delete Expense</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{expense.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(expense.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
