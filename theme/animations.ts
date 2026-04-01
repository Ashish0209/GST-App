import { Easing } from "react-native-reanimated";

export const animations = {
  screenTransition: { duration: 300, easing: Easing.out(Easing.ease) },
  cardEnter: { duration: 400, staggerDelay: 50, damping: 15 },
  countUp: { duration: 800, easing: Easing.out(Easing.ease) },
  buttonPress: { duration: 100, scale: 0.96 },
  pullRefresh: { duration: 500, damping: 15 },
  shimmer: { duration: 1500 },
  success: { duration: 400, damping: 12 },
  bottomSheet: { duration: 350, damping: 20 },
} as const;
