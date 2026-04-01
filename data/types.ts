import type { TaxSlab, SupplyType } from "../utils/gst";

export interface User {
  id: string; name: string; businessName: string; gstin: string; phone: string;
  email: string; businessType: "shop" | "freelancer" | "manufacturer";
  address: string; city: string; state: string; pincode: string;
}

export interface Contact {
  id: string; name: string; gstin: string; phone: string; email: string;
  address: string; type: "customer" | "supplier"; outstanding: number;
  totalBusiness: number; lastTransactionDate: string; isVerified: boolean;
}

export interface InvoiceLineItem {
  id: string; name: string; hsnCode: string; quantity: number; rate: number;
  taxSlab: TaxSlab; amount: number;
}

export interface Invoice {
  id: string; invoiceNumber: string; date: string; dueDate: string;
  customerId: string; customerName: string; customerGstin: string;
  supplyType: SupplyType; lineItems: InvoiceLineItem[]; subtotal: number;
  cgst: number; sgst: number; igst: number; total: number;
  status: "draft" | "sent" | "paid" | "overdue";
}

export interface Transaction {
  id: string; type: "income" | "expense"; amount: number; category: string;
  description: string; date: string; time: string;
  contactId?: string; contactName?: string;
}

export type FilingStatus = "filed" | "pending" | "overdue";

export interface GSTReturn {
  id: string; type: "GSTR-1" | "GSTR-3B"; period: string; status: FilingStatus;
  deadline: string; filedDate?: string; totalSales: number; totalTax: number;
  invoiceCount: number; completionPercent: number; errors: GSTError[];
}

export interface GSTError {
  id: string; type: "duplicate_invoice" | "invalid_gstin" | "amount_mismatch";
  message: string; severity: "error" | "warning";
}

export interface ReportData {
  pnl: {
    revenue: number; expenses: number; netProfit: number;
    categories: { name: string; amount: number; percent: number; type: "income" | "expense" }[];
  };
  cashFlow: { months: { month: string; inflow: number; outflow: number; balance: number }[] };
  gstSummary: {
    collected: number; inputCredit: number; netLiability: number;
    periods: { period: string; collected: number; inputCredit: number; net: number }[];
  };
  aging: {
    buckets: { label: string; amount: number; color: string }[];
    overdueContacts: { name: string; amount: number; days: number }[];
  };
}
