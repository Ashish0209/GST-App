import { View, Text, Pressable, ScrollView, Alert, Linking } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Avatar } from "../ui/Avatar";
import { GlassCard } from "../ui/GlassCard";
import { EntryRow } from "../ledger/EntryRow";
import { Phone, MessageCircle, FilePlus, ShieldCheck } from "lucide-react-native";
import { useLedgerStore } from "../../store/useLedgerStore";
import type { Contact } from "../../data/types";
import { colors } from "../../theme";
import { formatINR, formatDate } from "../../utils/format";

interface ContactDetailProps {
  contact: Contact;
}

export function ContactDetail({ contact }: ContactDetailProps) {
  const transactions = useLedgerStore((s) => s.transactions);
  const contactTransactions = transactions.filter((t) => t.contactId === contact.id);

  const lastDate = contact.lastTransactionDate
    ? formatDate(new Date(contact.lastTransactionDate))
    : "—";

  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`).catch(() => Alert.alert("Error", "Cannot open phone app"));
  };

  const handleWhatsApp = () => {
    const phone = contact.phone.replace(/\D/g, "");
    Linking.openURL(`whatsapp://send?phone=${phone}`).catch(() => Alert.alert("WhatsApp not installed"));
  };

  const handleNewInvoice = () => {
    Alert.alert("New Invoice", `Create invoice for ${contact.name}`);
  };

  const quickActions = [
    { label: "Call", icon: Phone, color: colors.accent.DEFAULT, onPress: handleCall },
    { label: "WhatsApp", icon: MessageCircle, color: "#25D366", onPress: handleWhatsApp },
    { label: "New Invoice", icon: FilePlus, color: colors.primary.DEFAULT, onPress: handleNewInvoice },
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Card */}
      <Animated.View
        entering={FadeInDown.delay(0).duration(400).springify().damping(15)}
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
          padding: 20,
          margin: 16,
          alignItems: "center",
        }}
      >
        <Avatar name={contact.name} size={60} />
        <View style={{ height: 12 }} />
        <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 20, color: colors.text.primary, textAlign: "center" }}>
          {contact.name}
        </Text>
        <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text.secondary, marginTop: 4 }}>
          {contact.phone}
        </Text>

        {/* GSTIN with verified badge */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 8 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary }}>
            {contact.gstin}
          </Text>
          {contact.isVerified && (
            <ShieldCheck size={16} color={colors.accent.DEFAULT} />
          )}
        </View>

        {contact.address ? (
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, marginTop: 8, textAlign: "center" }}>
            {contact.address}
          </Text>
        ) : null}
      </Animated.View>

      {/* Stats Row */}
      <Animated.View
        entering={FadeInDown.delay(60).duration(400).springify().damping(15)}
        style={{ flexDirection: "row", marginHorizontal: 16, gap: 8, marginBottom: 12 }}
      >
        {[
          { label: "Total Business", value: formatINR(contact.totalBusiness) },
          { label: "Outstanding", value: formatINR(Math.abs(contact.outstanding)), color: contact.outstanding > 0 ? colors.accent.DEFAULT : contact.outstanding < 0 ? colors.error : colors.text.secondary },
          { label: "Last Transaction", value: lastDate },
        ].map(({ label, value, color }) => (
          <View
            key={label}
            style={{
              flex: 1,
              backgroundColor: "rgba(255,255,255,0.85)",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "rgba(30,58,95,0.08)",
              padding: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: color ?? colors.text.primary, textAlign: "center" }}>
              {value}
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 10, color: colors.text.secondary, marginTop: 4, textAlign: "center" }}>
              {label}
            </Text>
          </View>
        ))}
      </Animated.View>

      {/* Quick Actions */}
      <Animated.View
        entering={FadeInDown.delay(100).duration(400).springify().damping(15)}
        style={{ flexDirection: "row", marginHorizontal: 16, gap: 8, marginBottom: 20 }}
      >
        {quickActions.map(({ label, icon: Icon, color, onPress }) => (
          <Pressable
            key={label}
            onPress={onPress}
            style={({ pressed }) => ({
              flex: 1,
              alignItems: "center",
              paddingVertical: 14,
              borderRadius: 12,
              backgroundColor: pressed ? color + "20" : color + "15",
              gap: 6,
            })}
          >
            <Icon size={20} color={color} />
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12, color }}>
              {label}
            </Text>
          </Pressable>
        ))}
      </Animated.View>

      {/* Transaction History */}
      {contactTransactions.length > 0 && (
        <View>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary, marginHorizontal: 16, marginBottom: 8 }}>
            Transaction History
          </Text>
          <View style={{ backgroundColor: "#FFFFFF", borderRadius: 12, marginHorizontal: 16, overflow: "hidden", borderWidth: 1, borderColor: "rgba(30,58,95,0.08)" }}>
            {contactTransactions.map((txn, i) => (
              <EntryRow key={txn.id} transaction={txn} index={i} />
            ))}
          </View>
        </View>
      )}

      {contactTransactions.length === 0 && (
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: colors.text.secondary }}>
            No transactions recorded
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
