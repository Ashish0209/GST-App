import { View, Text } from "react-native";
import type { ReportData } from "../../data/types";
import { formatINR } from "../../utils/format";
import { colors } from "../../theme";

interface GSTSummaryReportProps { data: ReportData["gstSummary"]; }

function StatCard({ label, value, color, bg }: { label: string; value: number; color: string; bg: string; index: number }) {
  return (
    <View style={{ flex: 1, backgroundColor: bg, borderRadius: 14, padding: 14, alignItems: "center", gap: 6 }}>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color, textAlign: "center" }}>{label}</Text>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color }}>{formatINR(value)}</Text>
    </View>
  );
}

export function GSTSummaryReport({ data }: GSTSummaryReportProps) {
  return (
    <View style={{ gap: 16 }}>
      {/* 3 Stat Cards */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <StatCard
          label="Tax Collected" value={data.collected}
          color={colors.accent.DEFAULT} bg="rgba(22,163,74,0.1)" index={0}
        />
        <StatCard
          label="Input Credit" value={data.inputCredit}
          color="#0891B2" bg="rgba(8,145,178,0.1)" index={1}
        />
        <StatCard
          label="Net Liability" value={data.netLiability}
          color={colors.primary.DEFAULT} bg="rgba(30,58,95,0.1)" index={2}
        />
      </View>

      {/* Period-wise Table */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary, marginBottom: 12 }}>Period-wise Summary</Text>

        {/* Header */}
        <View style={{ flexDirection: "row", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.1)" }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.text.secondary, width: 60 }}>Period</Text>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.text.secondary, flex: 1, textAlign: "right" }}>Collected</Text>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.text.secondary, flex: 1, textAlign: "right" }}>Input Credit</Text>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: colors.text.secondary, flex: 1, textAlign: "right" }}>Net</Text>
        </View>

        {data.periods.map((p, idx) => (
          <View key={p.period} style={{
            flexDirection: "row", alignItems: "center", paddingVertical: 12,
            borderBottomWidth: idx < data.periods.length - 1 ? 1 : 0,
            borderBottomColor: "rgba(30,58,95,0.06)",
          }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.primary, width: 60 }}>{p.period}</Text>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.accent.DEFAULT, flex: 1, textAlign: "right" }}>{formatINR(p.collected)}</Text>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: "#0891B2", flex: 1, textAlign: "right" }}>{formatINR(p.inputCredit)}</Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: colors.primary.DEFAULT, flex: 1, textAlign: "right" }}>{formatINR(p.net)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
