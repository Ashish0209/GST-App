import { Pressable, View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Avatar } from "../ui/Avatar";
import { formatINR } from "../../utils/format";
import type { Contact } from "../../data/types";
import { colors } from "../../theme";

interface ContactRowProps {
  contact: Contact;
  index: number;
  onPress: () => void;
}

function getOutstandingColor(amount: number): string {
  if (amount > 0) return colors.accent.DEFAULT;
  if (amount < 0) return colors.error;
  return colors.text.secondary;
}

function getOutstandingLabel(amount: number): string {
  if (amount > 0) return `+${formatINR(amount)}`;
  if (amount < 0) return `-${formatINR(Math.abs(amount))}`;
  return "₹0";
}

export function ContactRow({ contact, index, onPress }: ContactRowProps) {
  const truncatedGstin = contact.gstin.length > 10
    ? contact.gstin.slice(0, 10) + "..."
    : contact.gstin;

  return (
    <Animated.View entering={FadeInDown.delay(index * 30).duration(320).springify().damping(16)}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => ({
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: pressed ? "rgba(30,58,95,0.03)" : "#FFFFFF",
          borderBottomWidth: 1,
          borderBottomColor: "rgba(30,58,95,0.05)",
          gap: 12,
        })}
      >
        <Avatar name={contact.name} size={44} />

        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text.primary }}>
            {contact.name}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
            {truncatedGstin}
          </Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <Text style={{
            fontFamily: "Inter_700Bold",
            fontSize: 14,
            color: getOutstandingColor(contact.outstanding),
          }}>
            {getOutstandingLabel(contact.outstanding)}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: colors.text.secondary, marginTop: 2 }}>
            outstanding
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
