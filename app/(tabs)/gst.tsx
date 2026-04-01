import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Shield, FileJson, FileSpreadsheet, Share2 } from "lucide-react-native";
import { FilingCard } from "../../components/gst/FilingCard";
import { CountdownTimer } from "../../components/gst/CountdownTimer";
import { ErrorPanel } from "../../components/gst/ErrorPanel";
import { FilingHistory } from "../../components/gst/FilingHistory";
import { useGSTStore } from "../../store/useGSTStore";
import { colors } from "../../theme";

const EXPORT_ACTIONS = [
  { label: "Export JSON", icon: FileJson, color: "#3B82F6" },
  { label: "Export Excel", icon: FileSpreadsheet, color: colors.accent.DEFAULT },
  { label: "Share with CA", icon: Share2, color: colors.primary.DEFAULT },
];

export default function GSTCenter() {
  const getCurrentReturns = useGSTStore((s) => s.getCurrentReturns);
  const getHistory = useGSTStore((s) => s.getHistory);
  const returns = useGSTStore((s) => s.returns);

  const currentReturns = getCurrentReturns();
  const history = getHistory();

  // Get errors from current GSTR-1
  const currentGSTR1 = returns.find((r) => r.type === "GSTR-1" && (r.status === "pending" || r.status === "overdue"));
  const errors = currentGSTR1?.errors ?? [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={["top"]}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[...colors.gradient.navy]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20, flexDirection: "row", alignItems: "center", gap: 12 }}
      >
        <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center" }}>
          <Shield size={22} color="#FFFFFF" />
        </View>
        <View>
          <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 22, color: "#FFFFFF" }}>
            GST Center
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            Manage your GST filings
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingTop: 16, paddingBottom: 40 }}>
        {/* Current Returns */}
        {currentReturns.map((r) => (
          <FilingCard key={r.id} gstReturn={r} />
        ))}

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Error Panel */}
        <ErrorPanel errors={errors} />

        {/* Export Actions Row */}
        <View style={{ flexDirection: "row", marginHorizontal: 16, marginBottom: 12, gap: 8 }}>
          {EXPORT_ACTIONS.map(({ label, icon: Icon, color }) => (
            <Pressable
              key={label}
              onPress={() => Alert.alert(label, `${label} functionality coming soon`)}
              style={{
                flex: 1,
                alignItems: "center",
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.85)",
                borderWidth: 1,
                borderColor: "rgba(30,58,95,0.1)",
                gap: 6,
              }}
            >
              <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: color + "20", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color={color} />
              </View>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary, textAlign: "center" }}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Filing History */}
        <FilingHistory returns={history} />
      </ScrollView>
    </SafeAreaView>
  );
}
