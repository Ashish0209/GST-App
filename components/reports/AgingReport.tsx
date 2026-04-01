import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInDown } from "react-native-reanimated";
import type { ReportData } from "../../data/types";
import { formatINR } from "../../utils/format";
import { colors } from "../../theme";

interface AgingReportProps { data: ReportData["aging"]; }

function AgingBar({ label, amount, maxAmount, color, index }: {
  label: string; amount: number; maxAmount: number; color: string; index: number;
}) {
  const width = useSharedValue(0);
  const targetWidth = (amount / maxAmount) * 220;

  useEffect(() => {
    const timer = setTimeout(() => {
      width.value = withSpring(targetWidth, { damping: 18, stiffness: 120 });
    }, index * 120 + 100);
    return () => clearTimeout(timer);
  }, [targetWidth]);

  const animatedStyle = useAnimatedStyle(() => ({ width: width.value }));

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color }} />
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.primary }}>{label}</Text>
        </View>
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color }}>{formatINR(amount)}</Text>
      </View>
      <View style={{ height: 12, backgroundColor: "rgba(30,58,95,0.06)", borderRadius: 6, overflow: "hidden" }}>
        <Animated.View style={[animatedStyle, { height: 12, borderRadius: 6, backgroundColor: color }]} />
      </View>
    </View>
  );
}

export function AgingReport({ data }: AgingReportProps) {
  const maxAmount = Math.max(...data.buckets.map((b) => b.amount));

  return (
    <View style={{ gap: 16 }}>
      {/* Aging Bars */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 16 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }}>Outstanding by Age</Text>
        {data.buckets.map((bucket, idx) => (
          <AgingBar
            key={bucket.label}
            label={bucket.label}
            amount={bucket.amount}
            maxAmount={maxAmount}
            color={bucket.color}
            index={idx}
          />
        ))}
      </View>

      {/* Overdue Contacts */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 0 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary, marginBottom: 12 }}>Overdue Contacts</Text>
        {data.overdueContacts.map((contact, idx) => (
          <Animated.View
            key={contact.name}
            entering={FadeInDown.delay(idx * 80).springify()}
            style={{
              flexDirection: "row", alignItems: "center", paddingVertical: 12,
              borderTopWidth: idx === 0 ? 0 : 1, borderTopColor: "rgba(30,58,95,0.06)",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>{contact.name}</Text>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
                {contact.days} days overdue
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", gap: 4 }}>
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 14, color: colors.error }}>{formatINR(contact.amount)}</Text>
              <View style={{ backgroundColor: "rgba(220,38,38,0.1)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9999 }}>
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 11, color: colors.error }}>{contact.days}d overdue</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
