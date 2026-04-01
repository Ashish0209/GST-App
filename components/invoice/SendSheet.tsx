import { View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { MessageCircle, Mail, MessageSquare, Download } from "lucide-react-native";
import { colors } from "../../theme";

interface SendSheetProps { onSend: (method: string) => void; }

export const SendSheet = forwardRef<BottomSheet, SendSheetProps>(({ onSend }, ref) => {
  const options = [
    { label: "WhatsApp", icon: MessageCircle, color: "#25D366" },
    { label: "Email", icon: Mail, color: colors.primary.DEFAULT },
    { label: "SMS", icon: MessageSquare, color: colors.accent.DEFAULT },
    { label: "Download PDF", icon: Download, color: colors.warning },
  ];

  return (
    <BottomSheet ref={ref} index={-1} snapPoints={["35%"]} enablePanDownToClose>
      <BottomSheetView style={{ padding: 20, gap: 8 }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, marginBottom: 8 }}>Send via</Text>
        {options.map((opt) => (
          <Pressable key={opt.label} onPress={() => onSend(opt.label)}
            style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 14, borderRadius: 12, backgroundColor: "rgba(30,58,95,0.03)" }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: opt.color + "20", alignItems: "center", justifyContent: "center" }}>
              <opt.icon size={20} color={opt.color} />
            </View>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text.primary }}>{opt.label}</Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
});
