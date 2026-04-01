import { View, Text } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { CountUpNumber } from "../ui/CountUpNumber";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react-native";
import { colors } from "../../theme";

interface StatWidgetProps {
  title: string; value: number; icon: LucideIcon; iconColor: string; iconBg: string;
  trend?: { value: number; isUp: boolean }; index: number; isCurrency?: boolean; suffix?: string;
}

export function StatWidget({ title, value, icon: Icon, iconColor, iconBg, trend, index, isCurrency = true, suffix }: StatWidgetProps) {
  return (
    <GlassCard index={index} style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: iconBg, alignItems: "center", justifyContent: "center" }}>
          <Icon size={18} color={iconColor} />
        </View>
        {trend && (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            {trend.isUp ? <TrendingUp size={14} color={colors.accent.DEFAULT} /> : <TrendingDown size={14} color={colors.error} />}
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 11, color: trend.isUp ? colors.accent.DEFAULT : colors.error }}>{trend.value}%</Text>
          </View>
        )}
      </View>
      <CountUpNumber value={value} formatAsCurrency={isCurrency} suffix={suffix} style={{ fontSize: 22 }} />
      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: colors.text.secondary, marginTop: 4 }}>{title}</Text>
    </GlassCard>
  );
}
