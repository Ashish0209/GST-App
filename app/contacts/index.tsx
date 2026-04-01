import { useState, useMemo } from "react";
import { View, Text, SectionList, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ContactRow } from "../../components/contacts/ContactRow";
import { SearchBar } from "../../components/ui/SearchBar";
import { FilterTabs } from "../../components/ui/FilterTabs";
import { FAB } from "../../components/ui/FAB";
import { useContactStore } from "../../store/useContactStore";
import type { Contact } from "../../data/types";
import { colors } from "../../theme";

const FILTER_TABS = ["Customers", "Suppliers"];

function groupAlphabetically(contacts: Contact[]): { title: string; data: Contact[] }[] {
  const grouped: Record<string, Contact[]> = {};
  for (const contact of contacts) {
    const letter = contact.name[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(contact);
  }
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, data]) => ({ title: letter, data }));
}

export default function Contacts() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  const { getCustomers, getSuppliers, search } = useContactStore();

  const filteredContacts = useMemo(() => {
    let base = activeFilter === 0 ? getCustomers() : getSuppliers();
    if (query.trim()) {
      const results = search(query);
      base = base.filter((c) => results.some((r) => r.id === c.id));
    }
    return base.sort((a, b) => a.name.localeCompare(b.name));
  }, [query, activeFilter, getCustomers, getSuppliers, search]);

  const sections = useMemo(() => groupAlphabetically(filteredContacts), [filteredContacts]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }} edges={["top"]}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 28, color: colors.primary.DEFAULT }}>
          Contacts
        </Text>
      </View>

      {/* Sticky SearchBar */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <SearchBar
          placeholder="Search by name, GSTIN, or phone..."
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Filter Tabs */}
      <FilterTabs
        tabs={FILTER_TABS}
        activeTab={activeFilter}
        onTabChange={setActiveFilter}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: "rgba(248,250,252,0.97)", paddingHorizontal: 16, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.06)" }}>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 13, color: colors.primary.DEFAULT }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <ContactRow
            contact={item}
            index={index}
            onPress={() => router.push(`/contacts/${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 15, color: colors.text.secondary }}>
              {query ? "No contacts found" : "No contacts yet"}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <FAB onPress={() => Alert.alert("Add Contact", "Add contact form coming soon")} />
    </SafeAreaView>
  );
}
