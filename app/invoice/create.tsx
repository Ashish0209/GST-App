import { useState, useRef, useCallback } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus } from "lucide-react-native";
import { CustomerSelector } from "../../components/invoice/CustomerSelector";
import { LineItemRow } from "../../components/invoice/LineItemRow";
import { TaxSummary } from "../../components/invoice/TaxSummary";
import { SendSheet } from "../../components/invoice/SendSheet";
import { ConfettiSuccess } from "../../components/ui/ConfettiSuccess";
import { colors } from "../../theme";
import { generateInvoiceNumber } from "../../utils/gst";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import type { Contact, InvoiceLineItem } from "../../data/types";
import type { SupplyType, TaxSlab } from "../../utils/gst";

let itemCounter = 1;
function createLineItem(): InvoiceLineItem {
  return {
    id: `item_${Date.now()}_${itemCounter++}`,
    name: "",
    hsnCode: "",
    quantity: 1,
    rate: 0,
    taxSlab: 18 as TaxSlab,
    amount: 0,
  };
}

export default function CreateInvoice() {
  const router = useRouter();
  const invoices = useInvoiceStore((s) => s.invoices);
  const addInvoice = useInvoiceStore((s) => s.addInvoice);

  const invoiceNumber = generateInvoiceNumber("INV", invoices.length + 1);

  const [customer, setCustomer] = useState<Contact | null>(null);
  const [lineItems, setLineItems] = useState<InvoiceLineItem[]>([createLineItem()]);
  const [supplyType, setSupplyType] = useState<SupplyType>("intra");
  const [showSuccess, setShowSuccess] = useState(false);

  const sendSheetRef = useRef<BottomSheet>(null);

  const updateLineItem = useCallback((id: string, updates: Partial<InvoiceLineItem>) => {
    setLineItems((prev) => prev.map((item) => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const deleteLineItem = useCallback((id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addLineItem = useCallback(() => {
    setLineItems((prev) => [...prev, createLineItem()]);
  }, []);

  const handleSaveDraft = useCallback(() => {
    if (!customer) return;
    const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
    addInvoice({
      id: `inv_${Date.now()}`,
      invoiceNumber,
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      customerId: customer.id,
      customerName: customer.name,
      customerGstin: customer.gstin,
      supplyType,
      lineItems,
      subtotal,
      cgst: 0,
      sgst: 0,
      igst: 0,
      total: subtotal,
      status: "draft",
    });
    router.back();
  }, [customer, lineItems, supplyType, invoiceNumber]);

  const handleSendInvoice = useCallback(() => {
    sendSheetRef.current?.expand();
  }, []);

  const handleSend = useCallback((_method: string) => {
    sendSheetRef.current?.close();
    setShowSuccess(true);
  }, []);

  if (showSuccess) {
    return (
      <View style={{ flex: 1 }}>
        <ConfettiSuccess message="Invoice Sent!" onDone={() => router.back()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.06)" }}>
        <Pressable onPress={() => router.back()} style={{ marginRight: 12, padding: 4 }}>
          <ArrowLeft size={22} color={colors.text.primary} />
        </Pressable>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, flex: 1 }}>New Invoice</Text>
        <View style={{ backgroundColor: colors.accent.glow, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.accent.DEFAULT }}>{invoiceNumber}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Customer */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Bill To</Text>
          <CustomerSelector selected={customer} onSelect={setCustomer} />
        </View>

        {/* Supply Type Toggle */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Supply Type</Text>
          <View style={{ flexDirection: "row", backgroundColor: colors.card, borderRadius: 10, padding: 4, borderWidth: 1, borderColor: "rgba(30,58,95,0.08)" }}>
            {(["intra", "inter"] as SupplyType[]).map((type) => (
              <Pressable key={type} onPress={() => setSupplyType(type)}
                style={{ flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: "center",
                  backgroundColor: supplyType === type ? colors.primary.DEFAULT : "transparent" }}>
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13,
                  color: supplyType === type ? "#FFFFFF" : colors.text.secondary }}>
                  {type === "intra" ? "Intra-State (CGST+SGST)" : "Inter-State (IGST)"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Line Items */}
        <View style={{ gap: 10 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Items</Text>
          {lineItems.map((item, index) => (
            <LineItemRow key={item.id} item={item} index={index} onUpdate={updateLineItem} onDelete={deleteLineItem} />
          ))}
          <Pressable onPress={addLineItem}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 12, borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.accent.DEFAULT, backgroundColor: colors.accent.glow }}>
            <Plus size={18} color={colors.accent.DEFAULT} />
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.accent.DEFAULT }}>Add Item</Text>
          </Pressable>
        </View>

        {/* Tax Summary */}
        {lineItems.length > 0 && (
          <View style={{ gap: 8 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Tax Summary</Text>
            <TaxSummary lineItems={lineItems} supplyType={supplyType} />
          </View>
        )}
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, flexDirection: "row", gap: 12, padding: 16, backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.06)" }}>
        <Pressable onPress={handleSaveDraft}
          style={{ flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center", borderWidth: 1.5, borderColor: colors.primary.DEFAULT }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.primary.DEFAULT }}>Save Draft</Text>
        </Pressable>
        <Pressable onPress={handleSendInvoice}
          style={{ flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center", backgroundColor: colors.accent.DEFAULT }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: "#FFFFFF" }}>Send Invoice</Text>
        </Pressable>
      </View>

      <SendSheet ref={sendSheetRef} onSend={handleSend} />
    </SafeAreaView>
  );
}
