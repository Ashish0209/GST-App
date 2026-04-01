import { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, RefreshControl, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { IndianRupee, FileText, CalendarClock, ArrowDownCircle, Bell, Settings } from "lucide-react-native";
import { StatWidget } from "../../components/dashboard/StatWidget";
import { QuickActions } from "../../components/dashboard/QuickActions";
import { RecentActivity } from "../../components/dashboard/RecentActivity";
import { MiniChart } from "../../components/dashboard/MiniChart";
import { SkeletonLoader } from "../../components/ui/SkeletonLoader";
import { colors } from "../../theme";
import { getGreeting, formatDate } from "../../utils/format";
import { mockUser } from "../../data/mock/user";
import { useLedgerStore } from "../../store/useLedgerStore";
import { useInvoiceStore } from "../../store/useInvoiceStore";
import { useGSTStore } from "../../store/useGSTStore";

const WEEKLY_DATA = [
  { label: "Mon", value: 18500 },
  { label: "Tue", value: 24000 },
  { label: "Wed", value: 15800 },
  { label: "Thu", value: 32000 },
  { label: "Fri", value: 28500 },
  { label: "Sat", value: 41000 },
  { label: "Sun", value: 12000 },
];

function DashboardSkeleton({ insets }: { insets: { top: number; bottom: number } }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header skeleton */}
      <LinearGradient colors={[...colors.gradient.navy]} style={{ paddingTop: insets.top + 12, paddingBottom: 24, paddingHorizontal: 20, gap: 8 }}>
        <SkeletonLoader width={120} height={13} borderRadius={6} />
        <SkeletonLoader width={200} height={20} borderRadius={8} />
        <SkeletonLoader width={90} height={12} borderRadius={6} />
      </LinearGradient>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: insets.bottom + 24 }} showsVerticalScrollIndicator={false}>
        {/* Stat grid skeleton */}
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <SkeletonLoader width="48%" height={88} borderRadius={16} />
            <SkeletonLoader width="48%" height={88} borderRadius={16} />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <SkeletonLoader width="48%" height={88} borderRadius={16} />
            <SkeletonLoader width="48%" height={88} borderRadius={16} />
          </View>
        </View>
        {/* Quick actions skeleton */}
        <SkeletonLoader width="100%" height={100} borderRadius={16} />
        {/* Chart skeleton */}
        <SkeletonLoader width="100%" height={160} borderRadius={16} />
        {/* Activity skeleton */}
        <View style={{ gap: 10 }}>
          <SkeletonLoader width={120} height={18} borderRadius={8} />
          {[0, 1, 2].map((i) => <SkeletonLoader key={i} width="100%" height={68} borderRadius={12} />)}
        </View>
      </ScrollView>
    </View>
  );
}

export default function Dashboard() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const transactions = useLedgerStore((s) => s.transactions);
  const invoices = useInvoiceStore((s) => s.invoices);
  const gstStore = useGSTStore();

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const todayTransactions = transactions.filter((t) => t.date === todayStr);
  const todaySales = todayTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0) || 43200;
  const todayExpenses = todayTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0) || 12800;
  const pendingInvoices = invoices.filter((inv) => inv.status === "sent" || inv.status === "overdue").length || 7;

  const nextDeadline = gstStore.getNextDeadline();
  const gstDueDays = nextDeadline ? nextDeadline.daysLeft : 12;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date + "T" + b.time).getTime() - new Date(a.date + "T" + a.time).getTime()
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (loading) return <DashboardSkeleton insets={insets} />;

  return (
    <View style={{ flex: 1, backgroundColor: colors.surface }}>
      {/* Header */}
      <LinearGradient
        colors={[...colors.gradient.navy]}
        style={{ paddingTop: insets.top + 12, paddingBottom: 24, paddingHorizontal: 20 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
              {getGreeting()}, {mockUser.name.split(" ")[0]}
            </Text>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, color: "#FFFFFF", marginTop: 2 }}>
              {mockUser.businessName}
            </Text>
            <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>
              {formatDate(today)}
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 12, alignItems: "center", marginTop: 4 }}>
            <Pressable
              onPress={() => Alert.alert("Notifications", "No new notifications")}
              style={{ padding: 6, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 10 }}
            >
              <Bell size={20} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => router.push("/settings" as any)}
              style={{ padding: 6, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 10 }}
            >
              <Settings size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 20, paddingBottom: insets.bottom + 24 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.accent.DEFAULT} />}
      >
        {/* 2x2 Stat Grid */}
        <View style={{ gap: 12 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <StatWidget
              title="Today's Sales" value={todaySales}
              icon={IndianRupee} iconColor={colors.accent.DEFAULT} iconBg={colors.accent.glow}
              trend={{ value: 12, isUp: true }} index={0}
            />
            <StatWidget
              title="Today's Expenses" value={todayExpenses}
              icon={ArrowDownCircle} iconColor={colors.error} iconBg="rgba(220,38,38,0.12)"
              trend={{ value: 5, isUp: false }} index={1}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <StatWidget
              title="Pending Invoices" value={pendingInvoices}
              icon={FileText} iconColor={colors.primary.DEFAULT} iconBg="rgba(30,58,95,0.1)"
              index={2} isCurrency={false}
            />
            <StatWidget
              title="GST Due Days" value={Math.max(0, gstDueDays)}
              icon={CalendarClock} iconColor={colors.warning} iconBg="rgba(217,119,6,0.12)"
              index={3} isCurrency={false} suffix=" days"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16 }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary, marginBottom: 12 }}>
            Quick Actions
          </Text>
          <QuickActions
            onNewInvoice={() => router.push("/invoice/create")}
            onAddExpense={() => router.push("/invoice/create")}
            onAddIncome={() => router.push("/invoice/create")}
            onGSTExport={() => router.push("/(tabs)/gst")}
          />
        </View>

        {/* Weekly Sales Chart */}
        <MiniChart data={WEEKLY_DATA} title="Weekly Sales" />

        {/* Recent Activity */}
        <RecentActivity transactions={sortedTransactions} />
      </ScrollView>
    </View>
  );
}
