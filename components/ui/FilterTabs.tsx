import { useEffect, useRef } from "react";
import { View, Pressable, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { colors } from "../../theme";

interface FilterTabsProps { tabs: string[]; activeTab: number; onTabChange: (index: number) => void; }

export function FilterTabs({ tabs, activeTab, onTabChange }: FilterTabsProps) {
  const tabWidth = useSharedValue(0);
  const translateX = useSharedValue(0);

  // Store layout measurements in plain refs so we can read them in useEffect
  const tabLayouts = useRef<{ width: number; x: number }[]>([]);

  useEffect(() => {
    const layout = tabLayouts.current[activeTab];
    if (layout) {
      tabWidth.value = withSpring(layout.width, { damping: 20, stiffness: 200 });
      translateX.value = withSpring(layout.x, { damping: 20, stiffness: 200 });
    }
  }, [activeTab]);

  const indicatorStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }], width: tabWidth.value }));

  return (
    <View style={{ flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.08)" }}>
      {tabs.map((tab, index) => (
        <Pressable key={tab} onPress={() => onTabChange(index)}
          onLayout={(e) => {
            tabLayouts.current[index] = {
              width: e.nativeEvent.layout.width,
              x: e.nativeEvent.layout.x,
            };
            // If this is the active tab, update the indicator immediately (no animation on first layout)
            if (index === activeTab) {
              tabWidth.value = e.nativeEvent.layout.width;
              translateX.value = e.nativeEvent.layout.x;
            }
          }}
          style={{ flex: 1, paddingVertical: 12, alignItems: "center" }}>
          <Text style={{ fontFamily: index === activeTab ? "Inter_600SemiBold" : "Inter_400Regular", fontSize: 14, color: index === activeTab ? colors.primary.DEFAULT : colors.text.secondary }}>{tab}</Text>
        </Pressable>
      ))}
      <Animated.View style={[indicatorStyle, { position: "absolute", bottom: 0, height: 3, backgroundColor: colors.accent.DEFAULT, borderTopLeftRadius: 2, borderTopRightRadius: 2 }]} />
    </View>
  );
}
