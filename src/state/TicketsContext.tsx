// src/state/TicketsContext.tsx – bilety kupione w trakcie sesji (w W04 zastąpi je store)
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Ticket = {
  id: string;
  screeningId: string;
  seats: string[];
  total: number;
  createdAt: string;
};

type TicketsContextValue = {
  tickets: Ticket[];
  addTicket: (ticket: Omit<Ticket, "id" | "createdAt">) => Ticket;
};

const TicketsContext = createContext<TicketsContextValue | null>(null);

export function TicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const value = useMemo<TicketsContextValue>(
    () => ({
      tickets,
      addTicket: (data) => {
        const ticket: Ticket = {
          ...data,
          id: `T${Date.now().toString(36).toUpperCase()}`,
          createdAt: new Date().toISOString(),
        };
        setTickets((prev) => [ticket, ...prev]);
        return ticket;
      },
    }),
    [tickets],
  );

  return <TicketsContext.Provider value={value}>{children}</TicketsContext.Provider>;
}

export function useTickets() {
  const ctx = useContext(TicketsContext);
  if (!ctx) throw new Error("useTickets musi być użyte wewnątrz <TicketsProvider>");
  return ctx;
}
