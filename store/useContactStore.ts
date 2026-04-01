import { create } from "zustand";
import type { Contact } from "../data/types";
import { mockContacts } from "../data/mock";

interface ContactState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updates: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  getCustomers: () => Contact[];
  getSuppliers: () => Contact[];
  search: (query: string) => Contact[];
}

export const useContactStore = create<ContactState>((set, get) => ({
  contacts: mockContacts,
  addContact: (contact) => set((state) => ({ contacts: [contact, ...state.contacts] })),
  updateContact: (id, updates) => set((state) => ({
    contacts: state.contacts.map((c) => c.id === id ? { ...c, ...updates } : c),
  })),
  deleteContact: (id) => set((state) => ({ contacts: state.contacts.filter((c) => c.id !== id) })),
  getCustomers: () => get().contacts.filter((c) => c.type === "customer"),
  getSuppliers: () => get().contacts.filter((c) => c.type === "supplier"),
  search: (query) => {
    const q = query.toLowerCase();
    return get().contacts.filter((c) =>
      c.name.toLowerCase().includes(q) || c.gstin.toLowerCase().includes(q) || c.phone.includes(q)
    );
  },
}));
