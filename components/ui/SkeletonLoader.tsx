import { useEffect } from "react";
import { type ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from "react-native-reanimated";

interface SkeletonLoaderProps { width: number | string; height: number; borderRadius?: number; }

export function SkeletonLoader({ width, height, borderRadius = 8 }: SkeletonLoaderProps) {
  const opacity = useSharedValue(0.3);
  useEffect(() => { opacity.value = withRepeat(withTiming(0.7, { duration: 750, easing: Easing.inOut(Easing.ease) }), -1, true); }, []);
  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const staticStyle: ViewStyle = { width: width as ViewStyle["width"], height, borderRadius, backgroundColor: "rgba(30,58,95,0.1)" };
  return <Animated.View style={[animatedStyle, staticStyle]} />;
}
