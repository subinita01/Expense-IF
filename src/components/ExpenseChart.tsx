import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, CATEGORIES } from '@/types/expense';
import { IndianRupee } from 'lucide-react';

interface ExpenseChartProps {
  categoryTotals: Record<Category, number>;
}

export const ExpenseChart = ({ categoryTotals }: ExpenseChartProps) => {
  const data = CATEGORIES
    .map((cat) => ({
      name: cat.label,
      value: categoryTotals[cat.value],
      color: cat.color,
    }))
    .filter((item) => item.value > 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const total = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

  if (total === 0) {
    return (
      <div className="glass-card rounded-3xl overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-border/30">
          <h3 className="font-display text-lg font-semibold text-foreground">Spending by Category</h3>
        </div>
        <div className="p-6">
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-2xl bg-secondary/50 p-5">
              <svg
                className="h-10 w-10 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
            </div>
            <p className="font-display text-lg font-medium text-foreground">No data yet</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add expenses to see your breakdown
            </p>
          </div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card rounded-xl p-3 border border-border/30">
          <p className="font-medium text-foreground">{data.name}</p>
          <p className="text-sm text-neon-mint">{formatCurrency(data.value)}</p>
          <p className="text-xs text-muted-foreground">
            {((data.value / total) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-border/30">
        <h3 className="font-display text-lg font-semibold text-foreground">Spending by Category</h3>
      </div>
      <div className="p-6">
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                animationBegin={0}
                animationDuration={1000}
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    style={{
                      filter: `drop-shadow(0 0 8px ${entry.color})`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center total display */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-display text-lg font-bold gradient-text">{formatCurrency(total)}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {data.slice(0, 5).map((item) => (
            <div key={item.name} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full transition-transform group-hover:scale-125"
                  style={{ 
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}`
                  }}
                />
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground flex items-center gap-1">
                  <IndianRupee className="h-3 w-3 text-muted-foreground" />
                  {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(item.value)}
                </span>
                <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary/50">
                  {((item.value / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
