import { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import type { ReportData } from "../../data/types";
import { formatINR } from "../../utils/format";
import { colors } from "../../theme";

interface CashFlowReportProps { data: ReportData["cashFlow"]; }

const BAR_MAX_HEIGHT = 80;

function CashFlowBar({ inflow, outflow, maxVal, month, balance, delay = 0 }: {
  inflow: number; outflow: number; maxVal: number; month: string; balance: number; delay?: number;
}) {
  const inflowH = useSharedValue(0);
  const outflowH = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      inflowH.value = withSpring((inflow / maxVal) * BAR_MAX_HEIGHT, { damping: 18, stiffness: 120 });
      outflowH.value = withSpring((outflow / maxVal) * BAR_MAX_HEIGHT, { damping: 18, stiffness: 120 });
    }, delay);
    return () => clearTimeout(timer);
  }, [inflow, outflow, maxVal]);

  const inflowStyle = useAnimatedStyle(() => ({ height: inflowH.value }));
  const outflowStyle = useAnimatedStyle(() => ({ height: outflowH.value }));

  const isPositive = balance >= 0;

  return (
    <View style={{ alignItems: "center", gap: 6, minWidth: 52 }}>
      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: isPositive ? colors.accent.DEFAULT : colors.error }}>
        {balance >= 0 ? "+" : ""}{formatINR(balance)}
      </Text>
      {/* Bars side-by-side */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 4, height: BAR_MAX_HEIGHT }}>
        <Animated.View style={[inflowStyle, { width: 14, borderRadius: 4, backgroundColor: colors.accent.DEFAULT }]} />
        <Animated.View style={[outflowStyle, { width: 14, borderRadius: 4, backgroundColor: colors.error }]} />
      </View>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: colors.text.secondary }}>{month}</Text>
    </View>
  );
}

export function CashFlowReport({ data }: CashFlowReportProps) {
  const allVals = data.months.flatMap((m) => [m.inflow, m.outflow]);
  const maxVal = Math.max(...allVals);

  return (
    <View style={{ gap: 16 }}>
      {/* Chart */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 16 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }}>Monthly Cash Flow</Text>

        {/* Legend */}
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.accent.DEFAULT }} />
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>Inflow</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <View style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: colors.error }} />
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>Outflow</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: "row", gap: 16, paddingBottom: 4 }}>
            {data.months.map((m, idx) => (
              <CashFlowBar
                key={m.month}
                inflow={m.inflow}
                outflow={m.outflow}
                maxVal={maxVal}
                month={m.month}
                balance={m.balance}
                delay={idx * 80}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Month Details */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 0 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary, marginBottom: 12 }}>Monthly Details</Text>
        {data.months.map((m, idx) => (
          <View key={m.month} style={{
            flexDirection: "row", paddingVertical: 12, alignItems: "center",
            borderTopWidth: idx === 0 ? 0 : 1, borderTopColor: "rgba(30,58,95,0.06)",
          }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.primary, width: 52 }}>{m.month}</Text>
            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.accent.DEFAULT }}>In: {formatINR(m.inflow)}</Text>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.error }}>Out: {formatINR(m.outflow)}</Text>
            </View>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: m.balance >= 0 ? colors.accent.DEFAULT : colors.error }}>
              {m.balance >= 0 ? "+" : ""}{formatINR(m.balance)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
