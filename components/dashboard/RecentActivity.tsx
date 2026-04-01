import { View, Text } from "react-native";
import { CategoryIcon } from "../ui/CategoryIcon";
import { colors } from "../../theme";
import { formatINR, timeAgo } from "../../utils/format";
import type { Transaction } from "../../data/types";

interface RecentActivityProps { transactions: Transaction[]; }

export function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <View style={{ gap: 10 }}>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary }}>Recent Activity</Text>
      {transactions.slice(0, 5).map((txn) => (
        <View key={txn.id}
          style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.card, padding: 14, borderRadius: 12, gap: 12 }}>
          <CategoryIcon category={txn.category} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>{txn.description}</Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
              {timeAgo(new Date(txn.date + "T" + txn.time))}
            </Text>
          </View>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: txn.type === "income" ? colors.accent.DEFAULT : colors.error }}>
            {txn.type === "income" ? "+" : "-"}{formatINR(txn.amount)}
          </Text>
        </View>
      ))}
    </View>
  );
}
