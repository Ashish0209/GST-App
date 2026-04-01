import { View, TextInput, type TextInputProps } from "react-native";
import { Search } from "lucide-react-native";
import { colors } from "../../theme";

interface SearchBarProps extends TextInputProps { placeholder?: string; }

export function SearchBar({ placeholder = "Search...", ...props }: SearchBarProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: "rgba(30,58,95,0.08)", gap: 10 }}>
      <Search size={20} color={colors.text.secondary} />
      <TextInput placeholder={placeholder} placeholderTextColor={colors.text.secondary}
        style={{ flex: 1, fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text.primary, padding: 0 }} {...props} />
    </View>
  );
}
