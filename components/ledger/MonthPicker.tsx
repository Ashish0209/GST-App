import { useRef, useEffect } from "react";
import { ScrollView, Pressable, Text, View } from "react-native";
import { colors } from "../../theme";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthPickerProps {
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}

export function MonthPicker({ selectedMonth, selectedYear, onSelect }: MonthPickerProps) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Scroll to center the selected month (each pill ~70px wide)
    const offset = Math.max(0, selectedMonth * 70 - 120);
    setTimeout(() => {
      scrollRef.current?.scrollTo({ x: offset, animated: true });
    }, 100);
  }, [selectedMonth]);

  return (
    <View>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, paddingHorizontal: 20, marginBottom: 8 }}>
        {selectedYear}
      </Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8, flexDirection: "row" }}
      >
        {MONTHS.map((month, index) => {
          const isSelected = index === selectedMonth;
          return (
            <Pressable
              key={month}
              onPress={() => onSelect(index, selectedYear)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isSelected ? colors.accent.DEFAULT : "transparent",
                borderWidth: 1.5,
                borderColor: isSelected ? colors.accent.DEFAULT : "rgba(30,58,95,0.15)",
                minWidth: 54,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: isSelected ? "Inter_600SemiBold" : "Inter_400Regular",
                  fontSize: 14,
                  color: isSelected ? "#FFFFFF" : colors.text.secondary,
                }}
              >
                {month}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
