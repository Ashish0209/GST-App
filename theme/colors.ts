export const colors = {
  primary: {
    DEFAULT: "#1E3A5F",
    light: "#2A4F7A",
  },
  accent: {
    DEFAULT: "#16A34A",
    light: "#22C55E",
    glow: "rgba(22,163,74,0.2)",
  },
  warning: "#D97706",
  error: "#DC2626",
  surface: "#F8FAFC",
  card: "#FFFFFF",
  glass: {
    bg: "rgba(255,255,255,0.7)",
    border: "rgba(255,255,255,0.3)",
  },
  text: {
    primary: "#1E293B",
    secondary: "#64748B",
    inverse: "#FFFFFF",
  },
  gradient: {
    navy: ["#1E3A5F", "#2A4F7A"] as const,
    green: ["#16A34A", "#22C55E"] as const,
  },
} as const;
