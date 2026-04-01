import { create } from "zustand";
import type { Transaction } from "../data/types";
import { mockTransactions } from "../data/mock";

interface LedgerState {
  transactions: Transaction[];
  addTransaction: (txn: Transaction) => void;
  deleteTransaction: (id: string) => void;
  getByMonth: (year: number, month: number) => Transaction[];
  getTotals: (year: number, month: number) => { income: number; expense: number; net: number };
}

export const useLedgerStore = create<LedgerState>((set, get) => ({
  transactions: mockTransactions,
  addTransaction: (txn) => set((state) => ({ transactions: [txn, ...state.transactions] })),
  deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
  getByMonth: (year, month) => get().transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === month;
  }),
  getTotals: (year, month) => {
    const txns = get().getByMonth(year, month);
    const income = txns.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
    const expense = txns.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
    return { income, expense, net: income - expense };
  },
}));
