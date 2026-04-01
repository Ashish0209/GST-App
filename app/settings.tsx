import { View, Text, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  User,
  Building2,
  Globe,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react-native";
import { colors } from "../theme";
import { mockUser } from "../data/mock/user";

interface SettingsItemProps {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  onPress: () => void;
  danger?: boolean;
}

function SettingsItem({ icon: Icon, label, subtitle, onPress, danger }: SettingsItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 12,
        gap: 14,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: danger ? "rgba(220,38,38,0.1)" : "rgba(30,58,95,0.08)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={20} color={danger ? colors.error : colors.primary.DEFAULT} />
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "Inter_600SemiBold",
            fontSize: 15,
            color: danger ? colors.error : colors.text.primary,
          }}
        >
          {label}
        </Text>
        {subtitle && (
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
            {subtitle}
          </Text>
        )}
      </View>
      {!danger && <ChevronRight size={18} color={colors.text.secondary} />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => router.replace("/(auth)/welcome"),
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: insets.top + 12,
          paddingBottom: 16,
          paddingHorizontal: 20,
          gap: 14,
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(30,58,95,0.06)",
        }}
      >
        <Pressable onPress={() => router.back()} style={{ padding: 4 }}>
          <ArrowLeft size={22} color={colors.text.primary} />
        </Pressable>
        <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 22, color: colors.text.primary }}>
          Settings
        </Text>
      </View>

      {/* Profile Card */}
      <View style={{ padding: 16, gap: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.card,
            padding: 16,
            borderRadius: 16,
            gap: 14,
          }}
        >
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              backgroundColor: colors.primary.DEFAULT,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: "#FFFFFF" }}>
              {mockUser.name.split(" ").map((w) => w[0]).join("")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 17, color: colors.text.primary }}>
              {mockUser.name}
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary }}>
              {mockUser.phone}
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>
              {mockUser.businessName}
            </Text>
          </View>
        </View>

        {/* Settings Items */}
        <View style={{ gap: 8 }}>
          <SettingsItem
            icon={User}
            label="Profile"
            subtitle="Name, phone, email"
            onPress={() => Alert.alert("Profile", "Profile editing coming soon")}
          />
          <SettingsItem
            icon={Building2}
            label="Business Details"
            subtitle={`GSTIN: ${mockUser.gstin}`}
            onPress={() => Alert.alert("Business", "Business details editing coming soon")}
          />
          <SettingsItem
            icon={Globe}
            label="Language"
            subtitle="English"
            onPress={() => Alert.alert("Language", "Hindi support coming soon")}
          />
          <SettingsItem
            icon={Shield}
            label="GST Settings"
            subtitle="Tax slabs, HSN codes"
            onPress={() => Alert.alert("GST", "GST settings coming soon")}
          />
          <SettingsItem
            icon={CreditCard}
            label="Plan & Billing"
            subtitle="Growth Plan — ₹999/month"
            onPress={() => Alert.alert("Billing", "Plan management coming soon")}
          />
          <SettingsItem
            icon={HelpCircle}
            label="Help & Support"
            subtitle="FAQ, contact us"
            onPress={() => Alert.alert("Support", "WhatsApp support coming soon")}
          />
        </View>

        {/* Logout */}
        <SettingsItem
          icon={LogOut}
          label="Logout"
          onPress={handleLogout}
          danger
        />

        {/* Version */}
        <Text
          style={{
            fontFamily: "Inter_400Regular",
            fontSize: 12,
            color: colors.text.secondary,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          BillBook v1.0.0
        </Text>
      </View>
    </View>
  );
}
