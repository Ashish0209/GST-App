import { View, Text } from "react-native";
import { StatusBadge } from "../ui/StatusBadge";
import type { GSTReturn } from "../../data/types";
import { colors } from "../../theme";
import { formatDate } from "../../utils/format";

interface FilingHistoryProps {
  returns: GSTReturn[];
}

export function FilingHistory({ returns }: FilingHistoryProps) {
  if (returns.length === 0) return null;

  return (
    <View
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
      }}
    >
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: colors.text.primary, marginBottom: 16 }}>
        Filing History
      </Text>

      {returns.map((r, index) => {
        const isLast = index === returns.length - 1;
        const filedDate = r.filedDate ? formatDate(new Date(r.filedDate)) : "—";

        return (
          <View key={r.id} style={{ flexDirection: "row", gap: 12 }}>
            {/* Timeline dot + line */}
            <View style={{ alignItems: "center", width: 16 }}>
              <View style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: r.status === "filed" ? colors.accent.DEFAULT : colors.text.secondary,
                marginTop: 4,
              }} />
              {!isLast && (
                <View style={{ width: 2, flex: 1, backgroundColor: "rgba(30,58,95,0.1)", marginVertical: 4 }} />
              )}
            </View>

            {/* Content */}
            <View style={{ flex: 1, paddingBottom: isLast ? 0 : 16 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                <View>
                  <View style={{ flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 2 }}>
                    <Text style={{ fontFamily: "Inter_700Bold", fontSize: 14, color: colors.text.primary }}>
                      {r.type}
                    </Text>
                    <StatusBadge status={r.status} />
                  </View>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.secondary }}>
                    {r.period}
                  </Text>
                </View>
                <Text style={{ fontFamily: "Inter_500Medium", fontSize: 12, color: colors.text.secondary }}>
                  {filedDate}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
