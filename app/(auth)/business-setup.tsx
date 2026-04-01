import { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ShoppingBag, Laptop, Factory, Check } from "lucide-react-native";
import { AnimatedButton } from "../../components/ui/AnimatedButton";
import { colors } from "../../theme";

type BusinessType = "shop" | "freelancer" | "manufacturer";

const BUSINESS_TYPES: { key: BusinessType; label: string; subtitle: string; icon: typeof ShoppingBag }[] = [
  { key: "shop", label: "Shop / Retail", subtitle: "Selling products to customers", icon: ShoppingBag },
  { key: "freelancer", label: "Freelancer", subtitle: "Service-based income", icon: Laptop },
  { key: "manufacturer", label: "Manufacturer", subtitle: "Making and selling goods", icon: Factory },
];

function BusinessTypeCard({ item, selected, onSelect, index }: {
  item: typeof BUSINESS_TYPES[0]; selected: boolean; onSelect: () => void; index: number;
}) {
  const checkScale = useSharedValue(selected ? 1 : 0);
  checkScale.value = withSpring(selected ? 1 : 0, { damping: 15, stiffness: 200 });
  const checkStyle = useAnimatedStyle(() => ({ transform: [{ scale: checkScale.value }] }));

  return (
    <Animated.View entering={FadeInDown.delay(index * 100 + 300).springify()}>
      <Pressable
        onPress={onSelect}
        style={{
          backgroundColor: colors.card,
          borderRadius: 16, padding: 16,
          borderWidth: 2,
          borderColor: selected ? colors.accent.DEFAULT : "rgba(30,58,95,0.12)",
          flexDirection: "row", alignItems: "center", gap: 14,
        }}
      >
        <View style={{
          width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center",
          backgroundColor: selected ? "rgba(22,163,74,0.1)" : "rgba(30,58,95,0.06)",
        }}>
          <item.icon size={24} color={selected ? colors.accent.DEFAULT : colors.primary.DEFAULT} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text.primary }}>{item.label}</Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary, marginTop: 2 }}>{item.subtitle}</Text>
        </View>
        {selected && (
          <Animated.View style={[checkStyle, {
            width: 28, height: 28, borderRadius: 14,
            backgroundColor: colors.accent.DEFAULT,
            alignItems: "center", justifyContent: "center",
          }]}>
            <Check size={16} color="#FFFFFF" strokeWidth={2.5} />
          </Animated.View>
        )}
      </Pressable>
    </Animated.View>
  );
}

export default function BusinessSetup() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [businessName, setBusinessName] = useState("");
  const [gstin, setGstin] = useState("");
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null);

  function handleContinue() {
    if (businessName.trim() && selectedType) {
      router.push("/(auth)/tour");
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Progress Bar */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 24, paddingBottom: 16, backgroundColor: colors.card }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary }}>Step 2 of 3</Text>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.accent.DEFAULT }}>Business Setup</Text>
        </View>
        <View style={{ height: 6, backgroundColor: "rgba(30,58,95,0.08)", borderRadius: 3 }}>
          <View style={{ height: 6, width: "66.6%", backgroundColor: colors.accent.DEFAULT, borderRadius: 3 }} />
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 24, gap: 20, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 24, color: colors.text.primary, marginBottom: 4 }}>
            Tell us about your business
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 15, color: colors.text.secondary }}>
            This helps us customise BillBook for you.
          </Text>
        </Animated.View>

        {/* Business Name */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={{ gap: 8 }}>
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Business Name</Text>
          <TextInput
            style={{
              backgroundColor: colors.card, borderRadius: 14, padding: 16,
              fontFamily: "Inter_500Medium", fontSize: 16, color: colors.text.primary,
              borderWidth: 1.5, borderColor: businessName ? colors.accent.DEFAULT : "rgba(30,58,95,0.12)",
            }}
            placeholder="e.g. Sharma Traders"
            placeholderTextColor="rgba(30,58,95,0.3)"
            value={businessName}
            onChangeText={setBusinessName}
            returnKeyType="next"
          />
        </Animated.View>

        {/* GSTIN */}
        <Animated.View entering={FadeInDown.delay(250).springify()} style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>GSTIN</Text>
            <View style={{ backgroundColor: "rgba(30,58,95,0.08)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9999 }}>
              <Text style={{ fontFamily: "Inter_500Medium", fontSize: 11, color: colors.text.secondary }}>Optional</Text>
            </View>
          </View>
          <TextInput
            style={{
              backgroundColor: colors.card, borderRadius: 14, padding: 16,
              fontFamily: "Inter_500Medium", fontSize: 15, color: colors.text.primary,
              borderWidth: 1.5, borderColor: gstin ? colors.accent.DEFAULT : "rgba(30,58,95,0.12)",
              letterSpacing: 1,
            }}
            placeholder="22AAAAA0000A1Z5"
            placeholderTextColor="rgba(30,58,95,0.3)"
            value={gstin}
            onChangeText={(t) => setGstin(t.toUpperCase())}
            maxLength={15}
            autoCapitalize="characters"
            returnKeyType="done"
          />
        </Animated.View>

        {/* Business Type */}
        <View style={{ gap: 10 }}>
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>Business Type</Text>
          </Animated.View>
          {BUSINESS_TYPES.map((item, idx) => (
            <BusinessTypeCard
              key={item.key}
              item={item}
              selected={selectedType === item.key}
              onSelect={() => setSelectedType(item.key)}
              index={idx}
            />
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        backgroundColor: colors.card,
        paddingHorizontal: 24, paddingTop: 14, paddingBottom: insets.bottom + 16,
        borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.08)",
      }}>
        <AnimatedButton
          title="Continue"
          variant="accent"
          fullWidth
          size="lg"
          onPress={handleContinue}
          disabled={!businessName.trim() || !selectedType}
          style={{ opacity: businessName.trim() && selectedType ? 1 : 0.5 }}
        />
      </View>
    </View>
  );
}
