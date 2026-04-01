import { create } from "zustand";
import type { Invoice } from "../data/types";
import { mockInvoices } from "../data/mock";

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  getInvoicesByStatus: (status: Invoice["status"]) => Invoice[];
}

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  invoices: mockInvoices,
  addInvoice: (invoice) => set((state) => ({ invoices: [invoice, ...state.invoices] })),
  updateInvoice: (id, updates) => set((state) => ({
    invoices: state.invoices.map((inv) => inv.id === id ? { ...inv, ...updates } : inv),
  })),
  deleteInvoice: (id) => set((state) => ({ invoices: state.invoices.filter((inv) => inv.id !== id) })),
  getInvoicesByStatus: (status) => get().invoices.filter((inv) => inv.status === status),
}));
