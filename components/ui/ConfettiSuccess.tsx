import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, FadeIn } from "react-native-reanimated";
import { Check } from "lucide-react-native";
import { colors } from "../../theme";

interface ConfettiSuccessProps { message: string; onDone?: () => void; }

export function ConfettiSuccess({ message, onDone }: ConfettiSuccessProps) {
  const checkScale = useSharedValue(0);
  const ringScale = useSharedValue(0);

  useEffect(() => {
    ringScale.value = withSpring(1, { damping: 12 });
    checkScale.value = withDelay(200, withSpring(1, { damping: 10 }));
    if (onDone) { const timeout = setTimeout(onDone, 2000); return () => clearTimeout(timeout); }
  }, []);

  const ringStyle = useAnimatedStyle(() => ({ transform: [{ scale: ringScale.value }] }));
  const checkStyle = useAnimatedStyle(() => ({ transform: [{ scale: checkScale.value }] }));

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(248,250,252,0.95)" }}>
      <Animated.View style={[ringStyle, { width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(22,163,74,0.15)", alignItems: "center", justifyContent: "center" }]}>
        <Animated.View style={[checkStyle, { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.accent.DEFAULT, alignItems: "center", justifyContent: "center" }]}>
          <Check size={36} color="#FFFFFF" strokeWidth={3} />
        </Animated.View>
      </Animated.View>
      <Animated.Text entering={FadeIn.delay(400).duration(300)}
        style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, marginTop: 24 }}>{message}</Animated.Text>
    </View>
  );
}
