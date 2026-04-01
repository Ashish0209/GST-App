import { useRef, useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FileText, Shield, BarChart3 } from "lucide-react-native";
import { AnimatedButton } from "../../components/ui/AnimatedButton";
import { colors } from "../../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PAGES = [
  {
    icon: FileText,
    iconBg: "rgba(22,163,74,0.12)",
    iconColor: colors.accent.DEFAULT,
    title: "Create GST invoices\nin 30 seconds",
    subtitle: "Professional invoices with auto GST calculation. Send via WhatsApp or email instantly.",
  },
  {
    icon: Shield,
    iconBg: "rgba(30,58,95,0.1)",
    iconColor: colors.primary.DEFAULT,
    title: "Auto-fill GSTR-1\nand GSTR-3B",
    subtitle: "Your invoices automatically populate your GST returns. File in one tap.",
  },
  {
    icon: BarChart3,
    iconBg: "rgba(8,145,178,0.1)",
    iconColor: "#0891B2",
    title: "Track your\nbusiness health",
    subtitle: "P&L, cash flow, aging reports — know exactly how your business is doing.",
  },
];

export default function Tour() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  function handleScroll(event: { nativeEvent: { contentOffset: { x: number } } }) {
    const page = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setActiveIndex(page);
  }

  function handleSkip() {
    router.replace("/(tabs)");
  }

  function handleGetStarted() {
    router.replace("/(tabs)");
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Progress Bar */}
      <View style={{ paddingTop: insets.top + 16, paddingHorizontal: 24, paddingBottom: 0, backgroundColor: colors.card }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary }}>Step 3 of 3</Text>
          {activeIndex < PAGES.length - 1 && (
            <Pressable onPress={handleSkip}>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.secondary }}>Skip</Text>
            </Pressable>
          )}
        </View>
        <View style={{ height: 6, backgroundColor: "rgba(30,58,95,0.08)", borderRadius: 3, marginBottom: 16 }}>
          <View style={{ height: 6, width: "100%", backgroundColor: colors.accent.DEFAULT, borderRadius: 3 }} />
        </View>
      </View>

      {/* Swipeable Pages */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={{ flex: 1 }}
      >
        {PAGES.map((page, idx) => (
          <View key={idx} style={{ width: SCREEN_WIDTH, flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 40, paddingVertical: 40 }}>
            {/* Icon */}
            <Animated.View entering={FadeInDown.delay(200).springify()}>
              <View style={{
                width: 120, height: 120, borderRadius: 36,
                backgroundColor: page.iconBg,
                alignItems: "center", justifyContent: "center",
                marginBottom: 40,
                shadowColor: page.iconColor, shadowOffset: { width: 0, height: 12 },
                shadowOpacity: 0.2, shadowRadius: 24, elevation: 8,
              }}>
                <page.icon size={56} color={page.iconColor} strokeWidth={1.5} />
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.View entering={FadeInDown.delay(300).springify()} style={{ alignItems: "center" }}>
              <Text style={{
                fontFamily: "Inter_800ExtraBold", fontSize: 28, color: colors.text.primary,
                textAlign: "center", lineHeight: 36, marginBottom: 16,
              }}>
                {page.title}
              </Text>
              <Text style={{
                fontFamily: "Inter_400Regular", fontSize: 16, color: colors.text.secondary,
                textAlign: "center", lineHeight: 24,
              }}>
                {page.subtitle}
              </Text>
            </Animated.View>
          </View>
        ))}
      </ScrollView>

      {/* Dot Indicators */}
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 8, paddingBottom: 16 }}>
        {PAGES.map((_, idx) => (
          <View
            key={idx}
            style={{
              width: idx === activeIndex ? 24 : 8,
              height: 8, borderRadius: 4,
              backgroundColor: idx === activeIndex ? colors.accent.DEFAULT : "rgba(30,58,95,0.2)",
            }}
          />
        ))}
      </View>

      {/* Bottom Button */}
      <View style={{
        paddingHorizontal: 24, paddingBottom: insets.bottom + 20, paddingTop: 8,
        backgroundColor: colors.surface,
      }}>
        {activeIndex === PAGES.length - 1 ? (
          <AnimatedButton
            title="Get Started"
            variant="accent"
            fullWidth
            size="lg"
            onPress={handleGetStarted}
          />
        ) : (
          <AnimatedButton
            title="Next"
            variant="outline"
            fullWidth
            size="lg"
            onPress={() => {
              scrollRef.current?.scrollTo({ x: SCREEN_WIDTH * (activeIndex + 1), animated: true });
              setActiveIndex(activeIndex + 1);
            }}
          />
        )}
      </View>
    </View>
  );
}
