import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { AnimatedButton } from "../../components/ui/AnimatedButton";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#1E3A5F" }}>
      <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 24, color: "#FFFFFF" }}>Welcome to BillBook</Text>
      <AnimatedButton title="Skip to Dashboard" variant="accent" onPress={() => router.replace("/(tabs)")} style={{ marginTop: 24 }} />
    </View>
  );
}
