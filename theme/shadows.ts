import { Platform } from "react-native";

export const shadows = {
  card: Platform.select({
    ios: { shadowColor: "#1E3A5F", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 20 },
    android: { elevation: 4 },
  }),
  elevated: Platform.select({
    ios: { shadowColor: "#1E3A5F", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 32 },
    android: { elevation: 8 },
  }),
  glow: Platform.select({
    ios: { shadowColor: "#16A34A", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 20 },
    android: { elevation: 6 },
  }),
} as const;
