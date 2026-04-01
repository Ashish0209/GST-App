import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Users, BarChart3, Settings, LogOut } from "lucide-react-native";
import { colors } from "../../theme";

export default function More() {
  const router = useRouter();
  const items = [
    { label: "Contacts", icon: Users, route: "/contacts" as const },
    { label: "Reports", icon: BarChart3, route: "/reports" as const },
    { label: "Settings", icon: Settings, route: "/settings" as const },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: "#F8FAFC", paddingTop: 60, paddingHorizontal: 16 }}>
      <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 24, color: "#1E3A5F", marginBottom: 24 }}>More</Text>
      {items.map((item) => (
        <Pressable key={item.label} onPress={() => router.push(item.route)}
          style={{ flexDirection: "row", alignItems: "center", padding: 16, backgroundColor: "#FFFFFF", borderRadius: 12, marginBottom: 12, gap: 14 }}>
          <item.icon size={22} color={colors.primary.DEFAULT} />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.text.primary }}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
