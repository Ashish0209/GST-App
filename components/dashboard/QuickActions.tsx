import { View, Text, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FilePlus, ArrowDownCircle, ArrowUpCircle, Download, type LucideIcon } from "lucide-react-native";
import { colors } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface QuickAction { label: string; icon: LucideIcon; gradient: readonly [string, string]; onPress: () => void; }

interface QuickActionsProps { onNewInvoice: () => void; onAddExpense: () => void; onAddIncome: () => void; onGSTExport: () => void; }

function ActionButton({ label, icon: Icon, gradient, onPress }: QuickAction) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable onPress={onPress} onPressIn={() => { scale.value = withSpring(0.9); }} onPressOut={() => { scale.value = withSpring(1); }}
      style={[animatedStyle, { alignItems: "center", gap: 8, flex: 1 }]}>
      <LinearGradient colors={[...gradient]} style={{ width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" }}>
        <Icon size={22} color="#FFFFFF" />
      </LinearGradient>
      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary, textAlign: "center" }}>{label}</Text>
    </AnimatedPressable>
  );
}

export function QuickActions({ onNewInvoice, onAddExpense, onAddIncome, onGSTExport }: QuickActionsProps) {
  const actions: QuickAction[] = [
    { label: "New Invoice", icon: FilePlus, gradient: colors.gradient.green, onPress: onNewInvoice },
    { label: "Add Expense", icon: ArrowDownCircle, gradient: ["#DC2626", "#EF4444"] as const, onPress: onAddExpense },
    { label: "Add Income", icon: ArrowUpCircle, gradient: colors.gradient.navy, onPress: onAddIncome },
    { label: "GST Export", icon: Download, gradient: ["#D97706", "#F59E0B"] as const, onPress: onGSTExport },
  ];
  return (
    <View style={{ flexDirection: "row", gap: 8, paddingVertical: 8 }}>
      {actions.map((action) => <ActionButton key={action.label} {...action} />)}
    </View>
  );
}
