import type { ReportData } from "../types";

export const mockReports: ReportData = {
  pnl: {
    revenue: 220953,
    expenses: 279550,
    netProfit: -58597,
    categories: [
      { name: "Sales", amount: 220953, percent: 100, type: "income" },
      { name: "Purchase", amount: 176200, percent: 63.0, type: "expense" },
      { name: "Salary", amount: 60000, percent: 21.5, type: "expense" },
      { name: "Rent", amount: 45000, percent: 16.1, type: "expense" },
      { name: "Utilities", amount: 5850, percent: 2.1, type: "expense" },
      { name: "Transport", amount: 5700, percent: 2.0, type: "expense" },
      { name: "Other", amount: 8300, percent: 3.0, type: "expense" },
    ],
  },
  cashFlow: {
    months: [
      { month: "Oct 25", inflow: 185000, outflow: 162000, balance: 23000 },
      { month: "Nov 25", inflow: 198000, outflow: 175000, balance: 46000 },
      { month: "Dec 25", inflow: 245000, outflow: 198000, balance: 93000 },
      { month: "Jan 26", inflow: 284500, outflow: 248000, balance: 129500 },
      { month: "Feb 26", inflow: 312800, outflow: 289500, balance: 152800 },
      { month: "Mar 26", inflow: 220953, outflow: 279550, balance: 94203 },
    ],
  },
  gstSummary: {
    collected: 39180,
    inputCredit: 22850,
    netLiability: 16330,
    periods: [
      { period: "Jan 26", collected: 38420, inputCredit: 21300, net: 17120 },
      { period: "Feb 26", collected: 42350, inputCredit: 24100, net: 18250 },
      { period: "Mar 26", collected: 39180, inputCredit: 22850, net: 16330 },
    ],
  },
  aging: {
    buckets: [
      { label: "0-30 days", amount: 178600, color: "#16A34A" },
      { label: "31-60 days", amount: 96200, color: "#D97706" },
      { label: "61-90 days", amount: 67200, color: "#EA580C" },
      { label: "90+ days", amount: 44000, color: "#DC2626" },
    ],
    overdueContacts: [
      { name: "Deepa Nair", amount: 91000, days: 97 },
      { name: "Suresh Patel", amount: 67200, days: 72 },
      { name: "Kavita Reddy", amount: 55000, days: 44 },
      { name: "Rajesh Kumar Sharma", amount: 42500, days: 38 },
      { name: "Vikram Bhatia", amount: 38700, days: 35 },
    ],
  },
};
