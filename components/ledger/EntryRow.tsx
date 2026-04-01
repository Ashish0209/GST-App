import { View, Text } from "react-native";
import { CategoryIcon } from "../ui/CategoryIcon";
import { formatINR } from "../../utils/format";
import type { Transaction } from "../../data/types";
import { colors } from "../../theme";

interface EntryRowProps {
  transaction: Transaction;
  index: number;
}

export function EntryRow({ transaction, index: _index }: EntryRowProps) {
  const isIncome = transaction.type === "income";
  const amountColor = isIncome ? colors.accent.DEFAULT : colors.error;
  const prefix = isIncome ? "+" : "-";

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(30,58,95,0.05)",
        gap: 12,
      }}
    >
      <CategoryIcon category={transaction.category} size={40} />
      <View style={{ flex: 1 }}>
        <Text
          style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: colors.text.primary }}
          numberOfLines={1}
        >
          {transaction.description}
        </Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
          {transaction.category}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: amountColor }}>
          {prefix}{formatINR(transaction.amount)}
        </Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
          {transaction.time}
        </Text>
      </View>
    </View>
  );
}
