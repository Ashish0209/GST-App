import { useRef, useState, useMemo } from "react";
import { View, Text, SectionList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import { MonthPicker } from "../../components/ledger/MonthPicker";
import { LedgerSummary } from "../../components/ledger/LedgerSummary";
import { EntryRow } from "../../components/ledger/EntryRow";
import { AddEntrySheet } from "../../components/ledger/AddEntrySheet";
import { FilterTabs } from "../../components/ui/FilterTabs";
import { FAB } from "../../components/ui/FAB";
import { useLedgerStore } from "../../store/useLedgerStore";
import type { Transaction } from "../../data/types";
import { colors } from "../../theme";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FILTER_TABS = ["All", "Income", "Expense"];

function formatSectionDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate().toString().padStart(2, "0");
  const month = MONTH_NAMES[d.getMonth()];
  return `${day} ${month} ${d.getFullYear()}`;
}

export default function Ledger() {
  const [selectedMonth, setSelectedMonth] = useState(2); // March = index 2
  const [selectedYear, setSelectedYear] = useState(2026);
  const [activeFilter, setActiveFilter] = useState(0);
  const sheetRef = useRef<BottomSheet>(null);

  const { getByMonth, getTotals, addTransaction } = useLedgerStore();

  const totals = getTotals(selectedYear, selectedMonth);

  const transactions = useMemo(() => {
    const all = getByMonth(selectedYear, selectedMonth);
    if (activeFilter === 1) return all.filter((t) => t.type === "income");
    if (activeFilter === 2) return all.filter((t) => t.type === "expense");
    return all;
  }, [selectedMonth, selectedYear, activeFilter, getByMonth]);

  const sections = useMemo(() => {
    const grouped: Record<string, Transaction[]> = {};
    for (const txn of transactions) {
      if (!grouped[txn.date]) grouped[txn.date] = [];
      grouped[txn.date].push(txn);
    }
    return Object.entries(grouped)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, data]) => ({ title: formatSectionDate(date), data }));
  }, [transactions]);

  const handleSave = (partial: Partial<Transaction>) => {
    const txn: Transaction = {
      id: `txn_${Date.now()}`,
      type: partial.type ?? "income",
      amount: partial.amount ?? 0,
      category: partial.category ?? "Other",
      description: partial.description ?? "",
      date: partial.date ?? new Date().toISOString().split("T")[0],
      time: partial.time ?? "12:00",
    };
    addTransaction(txn);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12 }}>
        <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 28, color: colors.primary.DEFAULT }}>
          Ledger
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={
          <View>
            {/* Month Picker */}
            <View style={{ paddingBottom: 12 }}>
              <MonthPicker
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onSelect={(m, y) => { setSelectedMonth(m); setSelectedYear(y); }}
              />
            </View>

            {/* Summary Card */}
            <LedgerSummary income={totals.income} expense={totals.expense} net={totals.net} />

            {/* Filter Tabs */}
            <FilterTabs
              tabs={FILTER_TABS}
              activeTab={activeFilter}
              onTabChange={setActiveFilter}
            />
          </View>
        }
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: "rgba(248,250,252,0.95)", paddingHorizontal: 16, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "rgba(30,58,95,0.06)" }}>
            <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.secondary }}>
              {title}
            </Text>
          </View>
        )}
        renderItem={({ item, index }) => (
          <EntryRow transaction={item} index={index} />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: "center", paddingTop: 60 }}>
            <Text style={{ fontFamily: "Inter_500Medium", fontSize: 15, color: colors.text.secondary }}>
              No transactions this month
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* FAB */}
      <FAB onPress={() => sheetRef.current?.expand()} />

      {/* Add Entry Sheet */}
      <AddEntrySheet ref={sheetRef} onSave={handleSave} />
    </SafeAreaView>
  );
}
