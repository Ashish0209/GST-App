// BillBook/app/(tabs)/index.tsx
import { View, Text } from "react-native";

export default function Dashboard() {
  return (
    <View className="flex-1 items-center justify-center bg-surface">
      <Text className="font-inter-extrabold text-2xl text-primary">
        BillBook
      </Text>
      <Text className="font-inter text-text-secondary mt-2">
        Setup complete!
      </Text>
    </View>
  );
}
