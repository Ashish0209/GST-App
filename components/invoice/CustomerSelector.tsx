import { useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useRef, useCallback } from "react";
import { SearchBar } from "../ui/SearchBar";
import { Avatar } from "../ui/Avatar";
import { colors } from "../../theme";
import { useContactStore } from "../../store/useContactStore";
import type { Contact } from "../../data/types";

interface CustomerSelectorProps {
  selected: Contact | null;
  onSelect: (contact: Contact) => void;
}

export function CustomerSelector({ selected, onSelect }: CustomerSelectorProps) {
  const [query, setQuery] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const contacts = useContactStore((s) => s.contacts);
  const customers = contacts.filter((c) => c.type === "customer");

  const filtered = query
    ? customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.gstin.includes(query))
    : customers;

  const openSheet = useCallback(() => { bottomSheetRef.current?.expand(); }, []);
  const closeSheet = useCallback(() => { bottomSheetRef.current?.close(); }, []);

  return (
    <>
      <Pressable onPress={openSheet} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "rgba(30,58,95,0.08)" }}>
        {selected ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Avatar name={selected.name} size={36} />
            <View>
              <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 15, color: colors.text.primary }}>{selected.name}</Text>
              {selected.gstin ? <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>{selected.gstin}</Text> : null}
            </View>
          </View>
        ) : (
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14, color: colors.text.secondary }}>Select customer</Text>
        )}
      </Pressable>
      <BottomSheet ref={bottomSheetRef} index={-1} snapPoints={["70%"]} enablePanDownToClose>
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          <SearchBar placeholder="Search customers..." value={query} onChangeText={setQuery} />
          <FlatList data={filtered} keyExtractor={(c) => c.id} style={{ marginTop: 12 }}
            renderItem={({ item }) => (
              <Pressable onPress={() => { onSelect(item); closeSheet(); setQuery(""); }}
                style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 12, borderRadius: 8 }}>
                <Avatar name={item.name} size={36} />
                <View>
                  <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.text.primary }}>{item.name}</Text>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary }}>{item.gstin || "No GSTIN"}</Text>
                </View>
              </Pressable>
            )}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
