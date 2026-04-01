import { Tabs } from "expo-router";
import { Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Home, FileText, BookOpen, Shield, Menu, type LucideIcon } from "lucide-react-native";
import { colors } from "../../theme";

const tabConfig: { name: string; label: string; icon: LucideIcon }[] = [
  { name: "index", label: "Dashboard", icon: Home },
  { name: "invoices", label: "Invoices", icon: FileText },
  { name: "ledger", label: "Ledger", icon: BookOpen },
  { name: "gst", label: "GST", icon: Shield },
  { name: "more", label: "More", icon: Menu },
];

function TabIcon({ icon: Icon, label, focused }: { icon: LucideIcon; label: string; focused: boolean }) {
  const scale = useSharedValue(focused ? 1.1 : 1);
  scale.value = withSpring(focused ? 1.1 : 1, { damping: 15 });
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[animatedStyle, { alignItems: "center", gap: 2, paddingTop: 6 }]}>
      <Icon size={22} color={focused ? colors.accent.DEFAULT : colors.text.secondary} strokeWidth={focused ? 2.5 : 2} />
      <Text style={{ fontFamily: focused ? "Inter_600SemiBold" : "Inter_400Regular", fontSize: 11, color: focused ? colors.accent.DEFAULT : colors.text.secondary }}>{label}</Text>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: colors.card, borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.06)", height: 65, paddingBottom: 8 }, tabBarShowLabel: false }}>
      {tabConfig.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name}
          options={{ tabBarIcon: ({ focused }) => <TabIcon icon={tab.icon} label={tab.label} focused={focused} /> }} />
      ))}
    </Tabs>
  );
}
