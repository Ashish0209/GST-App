import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { TrendingUp, TrendingDown } from "lucide-react-native";
import type { ReportData } from "../../data/types";
import { formatINR } from "../../utils/format";
import { colors } from "../../theme";

interface PnLReportProps { data: ReportData["pnl"]; }

const CATEGORY_COLORS = ["#16A34A", "#1E3A5F", "#D97706", "#EA580C", "#7C3AED", "#0891B2", "#64748B"];

function AnimatedBar({ targetWidth, color, delay = 0 }: { targetWidth: number; color: string; delay?: number }) {
  const width = useSharedValue(0);
  useEffect(() => {
    const timer = setTimeout(() => { width.value = withSpring(targetWidth, { damping: 18, stiffness: 120 }); }, delay);
    return () => clearTimeout(timer);
  }, [targetWidth]);
  const animatedStyle = useAnimatedStyle(() => ({ width: width.value }));
  return <Animated.View style={[animatedStyle, { height: 24, borderRadius: 6, backgroundColor: color }]} />;
}

export function PnLReport({ data }: PnLReportProps) {
  const maxVal = Math.max(data.revenue, data.expenses);
  const revenueWidth = (data.revenue / maxVal) * 260;
  const expensesWidth = (data.expenses / maxVal) * 260;
  const isProfit = data.netProfit >= 0;

  return (
    <View style={{ gap: 20 }}>
      {/* Revenue vs Expenses Bars */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 16 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }}>Revenue vs Expenses</Text>

        <View style={{ gap: 12 }}>
          {/* Revenue */}
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary }}>Revenue</Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.accent.DEFAULT }}>{formatINR(data.revenue)}</Text>
            </View>
            <AnimatedBar targetWidth={revenueWidth} color={colors.accent.DEFAULT} delay={100} />
          </View>
          {/* Expenses */}
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary }}>Expenses</Text>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.error }}>{formatINR(data.expenses)}</Text>
            </View>
            <AnimatedBar targetWidth={expensesWidth} color={colors.error} delay={200} />
          </View>
        </View>

        {/* Net Profit */}
        <View style={{ borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.08)", paddingTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.secondary }}>Net Profit</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {isProfit
              ? <TrendingUp size={20} color={colors.accent.DEFAULT} />
              : <TrendingDown size={20} color={colors.error} />}
            <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 22, color: isProfit ? colors.accent.DEFAULT : colors.error }}>
              {formatINR(Math.abs(data.netProfit))}
            </Text>
          </View>
        </View>
      </View>

      {/* Category Breakdown */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 12 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }}>Category Breakdown</Text>
        {data.categories.map((cat, idx) => (
          <View key={cat.name} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: CATEGORY_COLORS[idx % CATEGORY_COLORS.length] }} />
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.primary, flex: 1 }}>{cat.name}</Text>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.primary }}>{formatINR(cat.amount)}</Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, width: 42, textAlign: "right" }}>{cat.percent}%</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
