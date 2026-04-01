import { View } from "react-native";
import { ShoppingBag, ShoppingCart, Home, Users, Zap, Truck, MoreHorizontal, type LucideIcon } from "lucide-react-native";

const categoryConfig: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  Sales: { icon: ShoppingBag, bg: "rgba(22,163,74,0.15)", color: "#16A34A" },
  Purchase: { icon: ShoppingCart, bg: "rgba(30,58,95,0.15)", color: "#1E3A5F" },
  Rent: { icon: Home, bg: "rgba(217,119,6,0.15)", color: "#D97706" },
  Salary: { icon: Users, bg: "rgba(139,92,246,0.15)", color: "#8B5CF6" },
  Utilities: { icon: Zap, bg: "rgba(59,130,246,0.15)", color: "#3B82F6" },
  Transport: { icon: Truck, bg: "rgba(236,72,153,0.15)", color: "#EC4899" },
  Other: { icon: MoreHorizontal, bg: "rgba(100,116,139,0.15)", color: "#64748B" },
};

interface CategoryIconProps { category: string; size?: number; }

export function CategoryIcon({ category, size = 40 }: CategoryIconProps) {
  const config = categoryConfig[category] ?? categoryConfig.Other;
  const Icon = config.icon;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: config.bg, alignItems: "center", justifyContent: "center" }}>
      <Icon size={size * 0.5} color={config.color} />
    </View>
  );
}
