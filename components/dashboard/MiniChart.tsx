import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withDelay, withSpring } from "react-native-reanimated";
import { colors } from "../../theme";

interface MiniChartProps { data: { label: string; value: number }[]; title: string; }

function AnimatedBar({ value, maxValue, index, label }: { value: number; maxValue: number; index: number; label: string }) {
  const height = useSharedValue(0);
  const targetHeight = (value / maxValue) * 100;
  useEffect(() => { height.value = withDelay(index * 80, withSpring(targetHeight, { damping: 12 })); }, [value]);
  const barStyle = useAnimatedStyle(() => ({ height: height.value }));
  return (
    <View style={{ flex: 1, alignItems: "center", gap: 6 }}>
      <View style={{ height: 100, justifyContent: "flex-end" }}>
        <Animated.View style={[barStyle, { width: 28, borderRadius: 6, backgroundColor: colors.accent.DEFAULT, minHeight: 4 }]} />
      </View>
      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 10, color: colors.text.secondary }}>{label}</Text>
    </View>
  );
}

export function MiniChart({ data, title }: MiniChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <View>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18, color: colors.text.primary, marginBottom: 16 }}>{title}</Text>
      <View style={{ flexDirection: "row", backgroundColor: colors.card, borderRadius: 16, padding: 16, gap: 4 }}>
        {data.map((item, index) => <AnimatedBar key={item.label} value={item.value} maxValue={maxValue} index={index} label={item.label} />)}
      </View>
    </View>
  );
}
