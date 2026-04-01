import { View, Text } from "react-native";

const avatarColors = ["#1E3A5F", "#16A34A", "#D97706", "#8B5CF6", "#EC4899", "#3B82F6", "#EF4444", "#14B8A6"];

interface AvatarProps { name: string; size?: number; }

export function Avatar({ name, size = 44 }: AvatarProps) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const colorIndex = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % avatarColors.length;
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: avatarColors[colorIndex], alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: size * 0.36, color: "#FFFFFF" }}>{initials}</Text>
    </View>
  );
}
