import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);

      // 🔥 AUTO REDIRECT
      if (currentUser) {
        navigate("/dashboard", { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-bold mb-2">
        Expense<span className="gradient-text">IF</span>
      </h1>

      <p className="text-muted-foreground text-center max-w-md mb-8">
        Track expenses, visualize spending, and take control of your finances —
        all in one place.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button variant="outline" onClick={() => navigate("/signup")}>
          Signup
        </Button>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Built with Firebase · TypeScript · React
      </p>
    </div>
  );
};

export default Index;
