import { Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Plus } from "lucide-react-native";
import { useEffect } from "react";
import { colors, shadows } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface FABProps { onPress: () => void; showPulse?: boolean; }

export function FAB({ onPress, showPulse = false }: FABProps) {
  const scale = useSharedValue(1);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (showPulse) {
      pulseScale.value = withRepeat(withSequence(withTiming(1.2, { duration: 600 }), withTiming(1, { duration: 600 })), 3, false);
    }
  }, [showPulse]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value * pulseScale.value }] }));

  return (
    <AnimatedPressable onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.9); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      style={[animatedStyle, { position: "absolute", bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28, ...shadows.glow }]}>
      <LinearGradient colors={[...colors.gradient.green]} style={{ width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" }}>
        <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
      </LinearGradient>
    </AnimatedPressable>
  );
}
