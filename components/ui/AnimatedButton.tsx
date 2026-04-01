import { Pressable, Text, type PressableProps } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedButtonProps extends Omit<PressableProps, "children"> {
  title: string;
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function AnimatedButton({ title, variant = "accent", size = "md", fullWidth = false, style, ...props }: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const handlePressIn = () => { scale.value = withSpring(0.96, { damping: 15 }); };
  const handlePressOut = () => { scale.value = withSpring(1, { damping: 15 }); };
  const paddingVertical = size === "sm" ? 10 : size === "md" ? 14 : 18;
  const fontSize = size === "sm" ? 14 : 16;

  if (variant === "outline") {
    return (
      <AnimatedPressable onPressIn={handlePressIn} onPressOut={handlePressOut}
        style={[animatedStyle, { borderWidth: 2, borderColor: colors.primary.DEFAULT, borderRadius: 12, paddingVertical, paddingHorizontal: 24, alignItems: "center" as const, width: fullWidth ? "100%" : undefined }, style]} {...props}>
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize, color: colors.primary.DEFAULT }}>{title}</Text>
      </AnimatedPressable>
    );
  }

  const gradientColors = variant === "primary" ? colors.gradient.navy : colors.gradient.green;
  return (
    <AnimatedPressable onPressIn={handlePressIn} onPressOut={handlePressOut}
      style={[animatedStyle, { width: fullWidth ? "100%" : undefined }, style]} {...props}>
      <LinearGradient colors={[...gradientColors]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ borderRadius: 12, paddingVertical, paddingHorizontal: 24, alignItems: "center" }}>
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize, color: "#FFFFFF" }}>{title}</Text>
      </LinearGradient>
    </AnimatedPressable>
  );
}
