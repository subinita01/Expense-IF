import { useState, useEffect } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Expense, Category, CATEGORIES } from '@/types/expense';
import { toast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
}

export const ExpenseForm = ({ onSubmit, editingExpense, onCancelEdit }: ExpenseFormProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('other');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setDescription(editingExpense.description || '');
      setOpen(true);
    }
  }, [editingExpense]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory('other');
    setDate(new Date().toISOString().split('T')[0]);
    setDescription('');
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    const amountNum = parseFloat(amount);
    if (!amount || isNaN(amountNum)) {
      newErrors.amount = 'Valid amount is required';
    } else if (amountNum <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (amountNum > 10000000) {
      newErrors.amount = 'Amount must be less than ₹1,00,00,000';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
      description: description.trim() || undefined,
    });

    toast({
      title: editingExpense ? 'Expense updated' : 'Expense added',
      description: `${title} - ₹${parseFloat(amount).toLocaleString('en-IN')}`,
    });

    resetForm();
    setOpen(false);
    onCancelEdit?.();
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
    onCancelEdit?.();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) handleClose();
      else setOpen(true);
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2 group">
          <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
          Add Expense
          <Sparkles className="h-3 w-3 text-primary-foreground/70" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md glass-card border-border/30 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="font-display text-xl gradient-text">
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-muted-foreground">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Grocery shopping"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`h-12 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 ${errors.title ? 'border-destructive' : ''}`}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-muted-foreground">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                step="1"
                min="0"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`h-12 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 ${errors.amount ? 'border-destructive' : ''}`}
              />
              {errors.amount && (
                <p className="text-xs text-destructive">{errors.amount}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-muted-foreground">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`h-12 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 ${errors.date ? 'border-destructive' : ''}`}
              />
              {errors.date && (
                <p className="text-xs text-destructive">{errors.date}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-muted-foreground">Category</Label>
            <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
              <SelectTrigger className="h-12 rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="glass-card border-border/30 rounded-xl">
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="rounded-lg focus:bg-secondary">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-3 w-3 rounded-full ring-2 ring-offset-2 ring-offset-background"
                        style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}` }}
                      />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-muted-foreground">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add any notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`rounded-xl bg-secondary/50 border-border/30 focus:border-primary/50 focus:ring-primary/20 resize-none ${errors.description ? 'border-destructive' : ''}`}
              rows={3}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={handleClose} className="rounded-xl">
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl">
              {editingExpense ? 'Update' : 'Add'} Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
