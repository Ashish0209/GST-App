import { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from "react-native-reanimated";
import { colors } from "../../theme";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps { percent: number; size?: number; strokeWidth?: number; color?: string; label?: string; hideCenter?: boolean; }

export function ProgressRing({ percent, size = 80, strokeWidth = 8, color = colors.accent.DEFAULT, label, hideCenter = false }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(percent / 100, { duration: 1000, easing: Easing.out(Easing.ease) });
  }, [percent]);

  const animatedProps = useAnimatedProps(() => ({ strokeDashoffset: circumference * (1 - progress.value) }));

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(30,58,95,0.1)" strokeWidth={strokeWidth} fill="none" />
        <AnimatedCircle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={strokeWidth} fill="none"
          strokeDasharray={circumference} animatedProps={animatedProps} strokeLinecap="round" rotation="-90" origin={`${size / 2}, ${size / 2}`} />
      </Svg>
      {!hideCenter && (
        <View style={{ position: "absolute", alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: size * 0.22, color: colors.text.primary }}>{percent}%</Text>
          {label && <Text style={{ fontFamily: "Inter_500Medium", fontSize: size * 0.12, color: colors.text.secondary }}>{label}</Text>}
        </View>
      )}
    </View>
  );
}
