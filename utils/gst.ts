export type SupplyType = "intra" | "inter";
export type TaxSlab = 0 | 5 | 12 | 18 | 28;

export interface TaxBreakdown {
  taxableAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalTax: number;
  total: number;
}

export function calculateTax(taxableAmount: number, taxRate: number, supplyType: SupplyType): TaxBreakdown {
  const totalTax = (taxableAmount * taxRate) / 100;
  if (supplyType === "inter") {
    return { taxableAmount, cgst: 0, sgst: 0, igst: totalTax, totalTax, total: taxableAmount + totalTax };
  }
  const halfTax = totalTax / 2;
  return { taxableAmount, cgst: halfTax, sgst: halfTax, igst: 0, totalTax, total: taxableAmount + totalTax };
}

export const TAX_SLABS: TaxSlab[] = [0, 5, 12, 18, 28];

export function generateInvoiceNumber(prefix: string, sequence: number): string {
  const year = new Date().getFullYear();
  const padded = sequence.toString().padStart(3, "0");
  return `${prefix}-${year}-${padded}`;
}

export function isValidGSTIN(gstin: string): boolean {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
}
