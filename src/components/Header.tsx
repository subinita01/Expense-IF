import { Wallet, Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 glass-panel">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-mint to-neon-blue opacity-75 blur-lg animate-glow-pulse" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-mint to-neon-blue">
              <Wallet className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold gradient-text">Expense-IF</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-neon-purple" />
              Smart Money Management for YOU
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-card">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-muted-foreground">Live Tracking</span>
          </div>
        </div>
      </div>
    </header>
  );
};
