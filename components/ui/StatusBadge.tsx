import { Text } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { colors } from "../../theme";

type BadgeVariant = "filed" | "pending" | "overdue" | "paid" | "sent" | "draft";

const variantConfig: Record<BadgeVariant, { bg: string; text: string; label: string }> = {
  filed: { bg: "rgba(22,163,74,0.15)", text: colors.accent.DEFAULT, label: "Filed" },
  paid: { bg: "rgba(22,163,74,0.15)", text: colors.accent.DEFAULT, label: "Paid" },
  pending: { bg: "rgba(217,119,6,0.15)", text: colors.warning, label: "Pending" },
  sent: { bg: "rgba(30,58,95,0.15)", text: colors.primary.DEFAULT, label: "Sent" },
  overdue: { bg: "rgba(220,38,38,0.15)", text: colors.error, label: "Overdue" },
  draft: { bg: "rgba(100,116,139,0.15)", text: colors.text.secondary, label: "Draft" },
};

interface StatusBadgeProps { status: BadgeVariant; label?: string; }

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = variantConfig[status];
  return (
    <Animated.View entering={FadeIn.duration(300)}
      style={{ backgroundColor: config.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 9999 }}>
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color: config.text }}>{label ?? config.label}</Text>
    </Animated.View>
  );
}
