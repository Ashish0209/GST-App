import { forwardRef, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AnimatedButton } from "../ui/AnimatedButton";
import { CategoryIcon } from "../ui/CategoryIcon";
import type { Transaction } from "../../data/types";
import { colors } from "../../theme";

const CATEGORIES = ["Sales", "Purchase", "Rent", "Salary", "Utilities", "Transport", "Other"];

interface AddEntrySheetProps {
  onSave: (txn: Partial<Transaction>) => void;
}

export const AddEntrySheet = forwardRef<BottomSheet, AddEntrySheetProps>(({ onSave }, ref) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Sales");
  const [note, setNote] = useState("");

  const handleSave = () => {
    if (!amount) return;
    onSave({
      type,
      amount: parseFloat(amount.replace(/,/g, "")),
      category,
      description: note || `${category} entry`,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toTimeString().slice(0, 5),
    });
    setAmount("");
    setNote("");
    setCategory("Sales");
    (ref as React.RefObject<BottomSheet>)?.current?.close();
  };

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={["75%"]} enablePanDownToClose>
      <BottomSheetScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Title */}
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, marginBottom: 20 }}>
          Add Entry
        </Text>

        {/* Type Toggle */}
        <View style={{ flexDirection: "row", backgroundColor: "rgba(30,58,95,0.06)", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {(["income", "expense"] as const).map((t) => (
            <Pressable
              key={t}
              onPress={() => setType(t)}
              style={{
                flex: 1,
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: "center",
                backgroundColor: type === t ? (t === "income" ? colors.accent.DEFAULT : colors.error) : "transparent",
              }}
            >
              <Text style={{
                fontFamily: "Inter_600SemiBold",
                fontSize: 15,
                color: type === t ? "#FFFFFF" : colors.text.secondary,
              }}>
                {t === "income" ? "Income" : "Expense"}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Amount Input */}
        <View style={{ alignItems: "center", marginBottom: 28 }}>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, marginBottom: 8 }}>
            Amount (₹)
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor="rgba(100,116,139,0.4)"
            keyboardType="numeric"
            style={{
              fontFamily: "Inter_800ExtraBold",
              fontSize: 40,
              color: colors.text.primary,
              textAlign: "center",
              minWidth: 120,
              borderBottomWidth: 2,
              borderBottomColor: type === "income" ? colors.accent.DEFAULT : colors.error,
              paddingBottom: 4,
            }}
          />
        </View>

        {/* Category Grid */}
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary, marginBottom: 12 }}>
          Category
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={{
                width: "22%",
                alignItems: "center",
                gap: 6,
                padding: 8,
                borderRadius: 12,
                backgroundColor: category === cat ? "rgba(22,163,74,0.1)" : "transparent",
                borderWidth: 1.5,
                borderColor: category === cat ? colors.accent.DEFAULT : "transparent",
              }}
            >
              <CategoryIcon category={cat} size={36} />
              <Text style={{
                fontFamily: category === cat ? "Inter_600SemiBold" : "Inter_400Regular",
                fontSize: 10,
                color: category === cat ? colors.accent.DEFAULT : colors.text.secondary,
                textAlign: "center",
              }}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Note Input */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add a note (optional)"
          placeholderTextColor={colors.text.secondary}
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            color: colors.text.primary,
            backgroundColor: "rgba(30,58,95,0.04)",
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "rgba(30,58,95,0.08)",
            marginBottom: 24,
          }}
        />

        {/* Save Button */}
        <AnimatedButton title="Save Entry" variant="accent" fullWidth onPress={handleSave} />
        <View style={{ height: 20 }} />
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
