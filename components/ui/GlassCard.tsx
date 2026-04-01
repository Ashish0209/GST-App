import { type ViewProps } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { shadows } from "../../theme";

interface GlassCardProps extends ViewProps {
  index?: number;
  elevated?: boolean;
  children: React.ReactNode;
}

export function GlassCard({ index = 0, elevated = false, children, style, ...props }: GlassCardProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 50).duration(400).springify().damping(15)}
      style={[
        {
          backgroundColor: "rgba(255,255,255,0.85)",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.3)",
          padding: 16,
          ...(elevated ? shadows.elevated : shadows.card),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Animated.View>
  );
}
