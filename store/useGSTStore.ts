import { create } from "zustand";
import type { GSTReturn } from "../data/types";
import { mockGSTReturns } from "../data/mock";

interface GSTState {
  returns: GSTReturn[];
  getCurrentReturns: () => GSTReturn[];
  getHistory: () => GSTReturn[];
  getNextDeadline: () => { type: string; deadline: string; daysLeft: number } | null;
}

export const useGSTStore = create<GSTState>((set, get) => ({
  returns: mockGSTReturns,
  getCurrentReturns: () => get().returns.filter((r) => r.status === "pending" || r.status === "overdue"),
  getHistory: () => get().returns.filter((r) => r.status === "filed"),
  getNextDeadline: () => {
    const pending = get().returns
      .filter((r) => r.status === "pending" || r.status === "overdue")
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    if (pending.length === 0) return null;
    const next = pending[0];
    const daysLeft = Math.ceil((new Date(next.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return { type: next.type, deadline: next.deadline, daysLeft };
  },
}));
