import { View, Text, ScrollView, Pressable } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FileText } from "lucide-react-native";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { FAB } from "../../components/ui/FAB";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { formatINR, formatDate } from "../../utils/format";
import { colors } from "../../theme";
import type { Invoice } from "../../data/types";

function InvoiceCard({ invoice, index }: { invoice: Invoice; index: number }) {
  const router = useRouter();
  const date = new Date(invoice.date);

  return (
    <Animated.View entering={FadeInDown.delay(index * 60).springify()}>
      <Pressable
        onPress={() => router.push("/invoice/create")}
        style={{
          backgroundColor: colors.card, borderRadius: 14, padding: 16,
          borderWidth: 1, borderColor: "rgba(30,58,95,0.06)",
          shadowColor: "#000", shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View style={{ flex: 1, gap: 4 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.secondary }}>
                {invoice.invoiceNumber}
              </Text>
            </View>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }} numberOfLines={1}>
              {invoice.customerName}
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>
              {formatDate(date)}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end", gap: 8 }}>
            <StatusBadge status={invoice.status} />
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary }}>
              {formatINR(invoice.total)}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function Invoices() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const invoices = useInvoiceStore((s) => s.invoices);

  const totalPending = invoices
    .filter((inv) => inv.status === "sent" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.total, 0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <LinearGradient
        colors={[...colors.gradient.navy]}
        style={{ paddingTop: insets.top + 12, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              {invoices.length} invoices
            </Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: "#FFFFFF", marginTop: 2 }}>Invoices</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Pending</Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.accent.light }}>{formatINR(totalPending)}</Text>
          </View>
        </View>

        {/* Quick filter counts */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
          {(["paid", "sent", "overdue", "draft"] as Invoice["status"][]).map((status) => {
            const count = invoices.filter((inv) => inv.status === status).length;
            return (
              <View key={status} style={{ backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 }}>
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: "#FFFFFF" }}>{count} {status}</Text>
              </View>
            );
          })}
        </View>
      </LinearGradient>

      {/* Invoice List */}
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 10, paddingBottom: insets.bottom + 90 }}
        showsVerticalScrollIndicator={false}
      >
        {invoices.length === 0 ? (
          <View style={{ alignItems: "center", paddingVertical: 60, gap: 12 }}>
            <FileText size={48} color="rgba(30,58,95,0.2)" />
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 16, color: colors.text.secondary }}>No invoices yet</Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text.secondary, textAlign: "center" }}>
              Tap + to create your first invoice
            </Text>
          </View>
        ) : (
          invoices.map((invoice, idx) => (
            <InvoiceCard key={invoice.id} invoice={invoice} index={idx} />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <FAB onPress={() => router.push("/invoice/create")} showPulse={invoices.length === 0} />
    </View>
  );
}
