import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ChevronLeft, Download, Share2 } from "lucide-react-native";
import { FilterTabs } from "../../components/ui/FilterTabs";
import { AnimatedButton } from "../../components/ui/AnimatedButton";
import { PnLReport } from "../../components/reports/PnLReport";
import { CashFlowReport } from "../../components/reports/CashFlowReport";
import { GSTSummaryReport } from "../../components/reports/GSTSummaryReport";
import { AgingReport } from "../../components/reports/AgingReport";
import { mockReports } from "../../data/mock";
import { colors } from "../../theme";

const TABS = ["P&L", "Cash Flow", "GST Summary", "Aging"];
const DATE_RANGES = ["This Month", "This Quarter", "This Year"];

export default function Reports() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [activeDateRange, setActiveDateRange] = useState(0);

  function renderReport() {
    switch (activeTab) {
      case 0: return <PnLReport data={mockReports.pnl} />;
      case 1: return <CashFlowReport data={mockReports.cashFlow} />;
      case 2: return <GSTSummaryReport data={mockReports.gstSummary} />;
      case 3: return <AgingReport data={mockReports.aging} />;
      default: return null;
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={["top"]}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)" }}>
        <Pressable onPress={() => router.back()} style={{ padding: 4, marginRight: 12 }}>
          <ChevronLeft size={24} color={colors.primary.DEFAULT} />
        </Pressable>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, flex: 1 }}>Reports</Text>
      </View>

      {/* Tabs */}
      <View style={{ backgroundColor: colors.card }}>
        <FilterTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {/* Date Range Pills */}
      <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)" }}>
        {DATE_RANGES.map((range, idx) => (
          <Pressable
            key={range}
            onPress={() => setActiveDateRange(idx)}
            style={{
              paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
              backgroundColor: idx === activeDateRange ? colors.accent.DEFAULT : "rgba(30,58,95,0.06)",
            }}
          >
            <Text style={{
              fontFamily: "Inter_500Medium", fontSize: 13,
              color: idx === activeDateRange ? "#FFFFFF" : colors.text.secondary,
            }}>{range}</Text>
          </Pressable>
        ))}
      </View>

      {/* Report Content */}
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {renderReport()}
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        backgroundColor: colors.card,
        paddingHorizontal: 16, paddingVertical: 14, paddingBottom: 28,
        borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.08)",
        flexDirection: "row", gap: 12,
      }}>
        <AnimatedButton
          title="Download PDF"
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => {}}
        />
        <AnimatedButton
          title="Share with CA"
          variant="accent"
          style={{ flex: 1 }}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}
