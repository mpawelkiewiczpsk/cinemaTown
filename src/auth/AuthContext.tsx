// src/auth/AuthContext.tsx – minimalny stan logowania (rozbudowa: W04, W06, W10)
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type User = { name: string; email?: string; isGuest: boolean };

type AuthContextValue = {
  user: User | null;
  signIn: (user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(
    () => ({ user, signIn: (u: User) => setUser(u), signOut: () => setUser(null) }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth musi być użyte wewnątrz <AuthProvider>");
  return ctx;
}
