import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { ContactDetail } from "../../components/contacts/ContactDetail";
import { useContactStore } from "../../store/useContactStore";
import { colors } from "../../theme";

export default function ContactDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const contacts = useContactStore((s) => s.contacts);
  const contact = contacts.find((c) => c.id === id);

  if (!contact) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" }} edges={["top"]}>
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.text.secondary }}>
          Contact not found
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={["top"]}>
      {/* Header with back button */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8, gap: 8 }}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: pressed ? "rgba(30,58,95,0.1)" : "rgba(30,58,95,0.06)",
            alignItems: "center",
            justifyContent: "center",
          })}
        >
          <ChevronLeft size={20} color={colors.primary.DEFAULT} />
        </Pressable>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, flex: 1 }} numberOfLines={1}>
          {contact.name}
        </Text>
      </View>

      <ContactDetail contact={contact} />
    </SafeAreaView>
  );
}
