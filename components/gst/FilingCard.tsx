import { View, Text, Pressable } from "react-native";
import { ProgressRing } from "../ui/ProgressRing";
import { StatusBadge } from "../ui/StatusBadge";
import { Download } from "lucide-react-native";
import type { GSTReturn } from "../../data/types";
import { colors } from "../../theme";
import { formatDate } from "../../utils/format";

interface FilingCardProps {
  gstReturn: GSTReturn;
}

function getCardTint(status: GSTReturn["status"]): string {
  if (status === "filed") return "rgba(22,163,74,0.06)";
  if (status === "pending") return "rgba(217,119,6,0.06)";
  return "rgba(220,38,38,0.06)";
}

function getBorderColor(status: GSTReturn["status"]): string {
  if (status === "filed") return "rgba(22,163,74,0.2)";
  if (status === "pending") return "rgba(217,119,6,0.2)";
  return "rgba(220,38,38,0.2)";
}

function getRingColor(status: GSTReturn["status"]): string {
  if (status === "filed") return colors.accent.DEFAULT;
  if (status === "pending") return colors.warning;
  return colors.error;
}

export function FilingCard({ gstReturn }: FilingCardProps) {
  const deadline = new Date(gstReturn.deadline);
  const formattedDeadline = formatDate(deadline);

  return (
    <View
      style={{
        backgroundColor: getCardTint(gstReturn.status),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: getBorderColor(gstReturn.status),
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
      }}
    >
      {/* Top Row: Type Badge + Status Badge */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <View style={{ backgroundColor: colors.primary.DEFAULT, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: "#FFFFFF" }}>
            {gstReturn.type}
          </Text>
        </View>
        <StatusBadge status={gstReturn.status} />
      </View>

      {/* Period */}
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.text.primary, marginBottom: 4 }}>
        {gstReturn.period}
      </Text>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, marginBottom: 16 }}>
        Deadline: {formattedDeadline}
      </Text>

      {/* Bottom Row: Ring + Stats + Export */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <ProgressRing
          percent={gstReturn.completionPercent}
          size={72}
          strokeWidth={6}
          color={getRingColor(gstReturn.status)}
        />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", gap: 20 }}>
            <View>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: colors.text.secondary }}>
                Invoices
              </Text>
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary }}>
                {gstReturn.invoiceCount}
              </Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: colors.text.secondary }}>
                Tax Amount
              </Text>
              <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary }}>
                ₹{(gstReturn.totalTax / 1000).toFixed(1)}K
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: colors.primary.DEFAULT,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Download size={14} color="#FFFFFF" />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: "#FFFFFF" }}>
            Export
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
