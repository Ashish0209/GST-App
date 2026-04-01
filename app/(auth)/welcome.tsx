import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withSequence, withTiming,
  withSpring, FadeIn, FadeInDown,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedButton } from "../../components/ui/AnimatedButton";
import { colors } from "../../theme";

const CIRCLES = [
  { size: 200, top: -60, left: -60, opacity: 0.08 },
  { size: 140, top: 80, right: -50, opacity: 0.06 },
  { size: 100, bottom: 200, left: 20, opacity: 0.07 },
  { size: 180, bottom: -40, right: -40, opacity: 0.05 },
];

function FloatingCircle({ size, style, index }: { size: number; style: object; index: number }) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    const amplitude = 12 + index * 6;
    const duration = 2800 + index * 600;
    translateY.value = withRepeat(
      withSequence(
        withTiming(-amplitude, { duration }),
        withTiming(amplitude, { duration }),
      ),
      -1, true
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: duration * 0.6 }),
        withTiming(0.5, { duration: duration * 0.4 }),
      ),
      -1, true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }], opacity: opacity.value }));

  return (
    <Animated.View style={[animatedStyle, style as object, {
      position: "absolute", width: size, height: size, borderRadius: size / 2,
      borderWidth: 1.5, borderColor: "rgba(255,255,255,0.3)",
      backgroundColor: "rgba(255,255,255,0.05)",
    }]} />
  );
}

export default function Welcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef<(TextInput | null)[]>([]);

  function handleGetOTP() {
    if (phone.length >= 10) setShowOTP(true);
  }

  function handleOTPChange(text: string, idx: number) {
    const newOtp = [...otp];
    newOtp[idx] = text.slice(-1);
    setOtp(newOtp);
    if (text && idx < 3) otpRefs.current[idx + 1]?.focus();
  }

  function handleVerify() {
    router.push("/(auth)/business-setup");
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <LinearGradient
        colors={["#0F2540", "#1E3A5F", "#2A4F7A"]}
        style={{ flex: 1 }}
      >
        {/* Floating Circles */}
        {CIRCLES.map((c, idx) => {
          const { size, opacity, ...pos } = c;
          return <FloatingCircle key={idx} size={size} style={{ ...pos, opacity }} index={idx} />;
        })}

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24, paddingHorizontal: 28 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={{ alignItems: "center", marginBottom: 48 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 36, color: "#FFFFFF", letterSpacing: -0.5 }}>BillBook</Text>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.accent.DEFAULT, marginBottom: 4, marginLeft: 1 }} />
            </View>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 15, color: "rgba(255,255,255,0.7)", marginTop: 10, textAlign: "center", lineHeight: 22 }}>
              GST filing and accounts —{"\n"}one place, one minute.
            </Text>
          </Animated.View>

          {/* Phone Input */}
          <Animated.View entering={FadeInDown.delay(350).springify()} style={{ gap: 16 }}>
            {!showOTP ? (
              <>
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: "#FFFFFF" }}>Enter your phone number</Text>
                <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 14, overflow: "hidden" }}>
                  <View style={{ paddingHorizontal: 14, paddingVertical: 18, backgroundColor: "rgba(30,58,95,0.06)", borderRightWidth: 1, borderRightColor: "rgba(30,58,95,0.12)" }}>
                    <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: colors.text.primary }}>+91</Text>
                  </View>
                  <TextInput
                    style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 18, fontFamily: "Inter_500Medium", fontSize: 18, color: colors.text.primary }}
                    placeholder="98765 43210"
                    placeholderTextColor="rgba(30,58,95,0.3)"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
                <AnimatedButton
                  title="Get OTP"
                  variant="accent"
                  fullWidth
                  size="lg"
                  onPress={handleGetOTP}
                  style={{ shadowColor: colors.accent.DEFAULT, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 }}
                />
              </>
            ) : (
              <Animated.View entering={FadeIn.duration(300)} style={{ gap: 16 }}>
                <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 16, color: "#FFFFFF" }}>
                  Enter OTP sent to +91 {phone}
                </Text>
                <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
                  {otp.map((digit, idx) => (
                    <TextInput
                      key={idx}
                      ref={(ref) => { otpRefs.current[idx] = ref; }}
                      style={{
                        width: 60, height: 64, borderRadius: 14,
                        backgroundColor: digit ? "#FFFFFF" : "rgba(255,255,255,0.15)",
                        textAlign: "center",
                        fontFamily: "Inter_700Bold", fontSize: 26,
                        color: digit ? colors.text.primary : "#FFFFFF",
                        borderWidth: digit ? 0 : 1,
                        borderColor: "rgba(255,255,255,0.3)",
                      }}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(t) => handleOTPChange(t, idx)}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) {
                          otpRefs.current[idx - 1]?.focus();
                        }
                      }}
                    />
                  ))}
                </View>
                <AnimatedButton
                  title="Verify & Continue"
                  variant="accent"
                  fullWidth
                  size="lg"
                  onPress={handleVerify}
                  style={{ shadowColor: colors.accent.DEFAULT, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 }}
                />
                <Pressable onPress={() => setShowOTP(false)}>
                  <Text style={{ fontFamily: "Inter_500Medium", fontSize: 14, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    Change number
                  </Text>
                </Pressable>
              </Animated.View>
            )}
          </Animated.View>

          {/* Terms */}
          <Animated.View entering={FadeInDown.delay(500).springify()} style={{ marginTop: "auto", paddingTop: 40 }}>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "center", lineHeight: 18 }}>
              By continuing you agree to our{" "}
              <Text style={{ color: "rgba(255,255,255,0.75)" }}>Terms</Text>
              {" & "}
              <Text style={{ color: "rgba(255,255,255,0.75)" }}>Privacy Policy</Text>
            </Text>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
