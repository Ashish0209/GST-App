import { View, Text } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { CountUpNumber } from "../ui/CountUpNumber";
import { colors } from "../../theme";
import { formatINR } from "../../utils/format";
import { calculateTax, type SupplyType } from "../../utils/gst";
import type { InvoiceLineItem } from "../../data/types";

interface TaxSummaryProps { lineItems: InvoiceLineItem[]; supplyType: SupplyType; }

export function TaxSummary({ lineItems, supplyType }: TaxSummaryProps) {
  let subtotal = 0, totalCgst = 0, totalSgst = 0, totalIgst = 0;

  lineItems.forEach((item) => {
    const amount = item.quantity * item.rate;
    subtotal += amount;
    const tax = calculateTax(amount, item.taxSlab, supplyType);
    totalCgst += tax.cgst;
    totalSgst += tax.sgst;
    totalIgst += tax.igst;
  });

  const grandTotal = subtotal + totalCgst + totalSgst + totalIgst;

  const Row = ({ label, value, bold }: { label: string; value: number; bold?: boolean }) => (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontFamily: bold ? "Inter_700Bold" : "Inter_400Regular", fontSize: bold ? 16 : 14, color: bold ? colors.text.primary : colors.text.secondary }}>{label}</Text>
      <Text style={{ fontFamily: bold ? "Inter_700Bold" : "Inter_500Medium", fontSize: bold ? 16 : 14, color: bold ? colors.accent.DEFAULT : colors.text.primary }}>{formatINR(value)}</Text>
    </View>
  );

  return (
    <GlassCard elevated>
      <Row label="Subtotal" value={subtotal} />
      {supplyType === "intra" ? (
        <>
          <Row label="CGST" value={totalCgst} />
          <Row label="SGST" value={totalSgst} />
        </>
      ) : (
        <Row label="IGST" value={totalIgst} />
      )}
      <View style={{ borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.08)", marginTop: 8, paddingTop: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary }}>Grand Total</Text>
          <CountUpNumber value={grandTotal} style={{ fontSize: 24, color: colors.accent.DEFAULT }} />
        </View>
      </View>
    </GlassCard>
  );
}
