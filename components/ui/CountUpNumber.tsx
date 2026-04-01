import { useEffect, useState } from "react";
import { Text, type TextStyle } from "react-native";
import Animated, { useSharedValue, withTiming, Easing, useAnimatedReaction, runOnJS } from "react-native-reanimated";
import { formatINR, formatIndianNumber } from "../../utils/format";

interface CountUpNumberProps {
  value: number;
  duration?: number;
  style?: TextStyle;
  prefix?: string;
  suffix?: string;
  formatAsCurrency?: boolean;
}

export function CountUpNumber({ value, duration = 800, style, prefix = "", suffix = "", formatAsCurrency = true }: CountUpNumberProps) {
  const animatedValue = useSharedValue(0);
  const [displayText, setDisplayText] = useState(prefix + (formatAsCurrency ? formatINR(0) : "0") + suffix);

  useEffect(() => {
    animatedValue.value = withTiming(value, { duration, easing: Easing.out(Easing.ease) });
  }, [value]);

  useAnimatedReaction(
    () => Math.round(animatedValue.value),
    (current) => {
      const formatted = formatAsCurrency ? formatINR(current) : formatIndianNumber(current);
      runOnJS(setDisplayText)(`${prefix}${formatted}${suffix}`);
    }
  );

  return (
    <Text style={[{ fontFamily: "Inter_800ExtraBold", fontSize: 28, color: "#1E293B" }, style]}>
      {displayText}
    </Text>
  );
}
