import { View, Text, TextInput, Pressable } from "react-native";
import Animated, { FadeInDown, SlideOutLeft } from "react-native-reanimated";
import { Trash2 } from "lucide-react-native";
import { colors } from "../../theme";
import { TAX_SLABS } from "../../utils/gst";
import type { InvoiceLineItem } from "../../data/types";

interface LineItemRowProps {
  item: InvoiceLineItem;
  index: number;
  onUpdate: (id: string, updates: Partial<InvoiceLineItem>) => void;
  onDelete: (id: string) => void;
}

export function LineItemRow({ item, index, onUpdate, onDelete }: LineItemRowProps) {
  const lineTotal = item.quantity * item.rate;

  return (
    <Animated.View entering={FadeInDown.delay(index * 50)} exiting={SlideOutLeft.duration(200)}
      style={{ backgroundColor: colors.card, borderRadius: 12, padding: 14, gap: 10, borderWidth: 1, borderColor: "rgba(30,58,95,0.06)" }}>
      {/* Row 1: Name + HSN */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TextInput value={item.name} onChangeText={(v) => onUpdate(item.id, { name: v })} placeholder="Item name"
          placeholderTextColor={colors.text.secondary}
          style={{ flex: 2, fontFamily: "Inter_500Medium", fontSize: 14, color: colors.text.primary, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)", paddingBottom: 4 }} />
        <TextInput value={item.hsnCode} onChangeText={(v) => onUpdate(item.id, { hsnCode: v })} placeholder="HSN"
          placeholderTextColor={colors.text.secondary}
          style={{ flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)", paddingBottom: 4 }} />
      </View>
      {/* Row 2: Qty + Rate */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 10, color: colors.text.secondary, marginBottom: 2 }}>Qty</Text>
          <TextInput value={String(item.quantity)} keyboardType="numeric"
            onChangeText={(v) => onUpdate(item.id, { quantity: Number(v) || 0, amount: (Number(v) || 0) * item.rate })}
            style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)", paddingBottom: 2 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 10, color: colors.text.secondary, marginBottom: 2 }}>Rate</Text>
          <TextInput value={String(item.rate)} keyboardType="numeric"
            onChangeText={(v) => onUpdate(item.id, { rate: Number(v) || 0, amount: item.quantity * (Number(v) || 0) })}
            style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)", paddingBottom: 2 }} />
        </View>
      </View>
      {/* Row 3: Tax slab selector */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary }}>Tax</Text>
        <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
          {TAX_SLABS.map((slab) => (
            <Pressable key={slab} onPress={() => onUpdate(item.id, { taxSlab: slab })}
              style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
                backgroundColor: item.taxSlab === slab ? colors.accent.DEFAULT : "rgba(30,58,95,0.06)" }}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 12,
                color: item.taxSlab === slab ? "#FFFFFF" : colors.text.secondary }}>{slab}%</Text>
            </Pressable>
          ))}
        </View>
      </View>
      {/* Row 3: Total + Delete */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.primary.DEFAULT }}>
          {"\u20B9"}{lineTotal.toLocaleString("en-IN")}
        </Text>
        <Pressable onPress={() => onDelete(item.id)} style={{ padding: 4 }}>
          <Trash2 size={18} color={colors.error} />
        </Pressable>
      </View>
    </Animated.View>
  );
}
