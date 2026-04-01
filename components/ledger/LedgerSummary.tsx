import { View, Text } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { CountUpNumber } from "../ui/CountUpNumber";
import { colors } from "../../theme";

interface LedgerSummaryProps {
  income: number;
  expense: number;
  net: number;
}

export function LedgerSummary({ income, expense, net }: LedgerSummaryProps) {
  return (
    <GlassCard index={0} style={{ marginHorizontal: 16, marginBottom: 12 }}>
      <View style={{ flexDirection: "row" }}>
        {/* Income */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary, marginBottom: 4 }}>
            Income
          </Text>
          <CountUpNumber
            value={income}
            formatAsCurrency={true}
            style={{ fontSize: 16, color: colors.accent.DEFAULT, fontFamily: "Inter_700Bold" } as any}
          />
        </View>
        {/* Divider */}
        <View style={{ width: 1, backgroundColor: "rgba(30,58,95,0.08)", marginVertical: 4 }} />
        {/* Expense */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary, marginBottom: 4 }}>
            Expense
          </Text>
          <CountUpNumber
            value={expense}
            formatAsCurrency={true}
            style={{ fontSize: 16, color: colors.error, fontFamily: "Inter_700Bold" } as any}
          />
        </View>
        {/* Divider */}
        <View style={{ width: 1, backgroundColor: "rgba(30,58,95,0.08)", marginVertical: 4 }} />
        {/* Net */}
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary, marginBottom: 4 }}>
            Net
          </Text>
          <CountUpNumber
            value={net}
            formatAsCurrency={true}
            style={{ fontSize: 16, color: colors.primary.DEFAULT, fontFamily: "Inter_800ExtraBold" } as any}
          />
        </View>
      </View>
    </GlassCard>
  );
}
