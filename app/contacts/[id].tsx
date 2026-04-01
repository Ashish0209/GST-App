import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function ContactDetail() {
  const { id } = useLocalSearchParams();
  return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#F8FAFC" }}>
    <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 20, color: "#1E3A5F" }}>Contact {id}</Text>
  </View>);
}
