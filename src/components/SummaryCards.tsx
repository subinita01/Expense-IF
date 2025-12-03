import { TrendingUp, Calendar, BarChart3, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/types/expense';

interface SummaryCardsProps {
  total: number;
  monthTotal: number;
  expenseCount: number;
}

export const SummaryCards = ({ total, monthTotal, expenseCount }: SummaryCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Expenses Card */}
      <div className="group relative overflow-hidden rounded-3xl glass-card p-6 transition-all duration-500 hover:shadow-neon animate-slide-up">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-neon-mint/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon-mint/50 to-transparent" />
        
        <div className="relative flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
            <p className="font-display text-3xl font-bold text-foreground">
              {formatCurrency(total)}
            </p>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-neon-mint/10 px-2.5 py-1 text-xs font-medium text-neon-mint">
                <ArrowUpRight className="h-3 w-3" />
                All time
              </span>
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-mint/20 to-neon-mint/5 ring-1 ring-neon-mint/20">
            <TrendingUp className="h-7 w-7 text-neon-mint" />
          </div>
        </div>
      </div>

      {/* This Month Card */}
      <div className="group relative overflow-hidden rounded-3xl glass-card p-6 transition-all duration-500 hover:shadow-neon animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-neon-blue/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
        
        <div className="relative flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">This Month</p>
            <p className="font-display text-3xl font-bold text-foreground">
              {formatCurrency(monthTotal)}
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-neon-blue/10 px-2.5 py-1 text-xs font-medium text-neon-blue">
                {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
              </span>
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 ring-1 ring-neon-blue/20">
            <Calendar className="h-7 w-7 text-neon-blue" />
          </div>
        </div>
      </div>

      {/* Total Records Card */}
      <div className="group relative overflow-hidden rounded-3xl glass-card p-6 transition-all duration-500 hover:shadow-neon sm:col-span-2 lg:col-span-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-neon-purple/20 to-transparent blur-2xl transition-all duration-500 group-hover:scale-150" />
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
        
        <div className="relative flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Total Records</p>
            <p className="font-display text-3xl font-bold text-foreground">{expenseCount}</p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-neon-purple/10 px-2.5 py-1 text-xs font-medium text-neon-purple">
                {CATEGORIES.length} categories
              </span>
            </div>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple/20 to-neon-purple/5 ring-1 ring-neon-purple/20">
            <BarChart3 className="h-7 w-7 text-neon-purple" />
          </div>
        </div>
      </div>
    </div>
  );
};
