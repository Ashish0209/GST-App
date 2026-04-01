import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Animated, { FadeInDown, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { AlertCircle, AlertTriangle, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react-native";
import type { GSTError } from "../../data/types";
import { colors } from "../../theme";

interface ErrorPanelProps {
  errors: GSTError[];
}

export function ErrorPanel({ errors }: ErrorPanelProps) {
  const [expanded, setExpanded] = useState(false);

  const errorCount = errors.filter((e) => e.severity === "error").length;
  const warnCount = errors.filter((e) => e.severity === "warning").length;

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(400).springify().damping(15)}
      style={{
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: errors.length > 0 ? "rgba(220,38,38,0.2)" : "rgba(30,58,95,0.1)",
        marginHorizontal: 16,
        marginBottom: 12,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Pressable
        onPress={() => setExpanded((prev) => !prev)}
        style={{ flexDirection: "row", alignItems: "center", padding: 16, gap: 12 }}
      >
        <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "rgba(220,38,38,0.1)", alignItems: "center", justifyContent: "center" }}>
          <ShieldAlert size={18} color={colors.error} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 15, color: colors.text.primary }}>
            Pre-filing Checks
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12, color: colors.text.secondary, marginTop: 2 }}>
            {errors.length === 0
              ? "No issues found"
              : `${errorCount} error${errorCount !== 1 ? "s" : ""}, ${warnCount} warning${warnCount !== 1 ? "s" : ""}`}
          </Text>
        </View>

        {errors.length > 0 && (
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            {errorCount > 0 && (
              <View style={{ backgroundColor: "rgba(220,38,38,0.12)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9999 }}>
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 12, color: colors.error }}>{errorCount}</Text>
              </View>
            )}
            {warnCount > 0 && (
              <View style={{ backgroundColor: "rgba(217,119,6,0.12)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 9999 }}>
                <Text style={{ fontFamily: "Inter_700Bold", fontSize: 12, color: colors.warning }}>{warnCount}</Text>
              </View>
            )}
            {expanded ? <ChevronUp size={18} color={colors.text.secondary} /> : <ChevronDown size={18} color={colors.text.secondary} />}
          </View>
        )}
      </Pressable>

      {/* Error List */}
      {expanded && errors.length > 0 && (
        <View style={{ borderTopWidth: 1, borderTopColor: "rgba(30,58,95,0.06)", paddingBottom: 8 }}>
          {errors.map((error, i) => (
            <View
              key={error.id}
              style={{
                flexDirection: "row",
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderBottomWidth: i < errors.length - 1 ? 1 : 0,
                borderBottomColor: "rgba(30,58,95,0.05)",
              }}
            >
              {error.severity === "error" ? (
                <AlertCircle size={18} color={colors.error} style={{ marginTop: 1 }} />
              ) : (
                <AlertTriangle size={18} color={colors.warning} style={{ marginTop: 1 }} />
              )}
              <Text style={{ flex: 1, fontFamily: "Inter_400Regular", fontSize: 13, color: colors.text.primary, lineHeight: 19 }}>
                {error.message}
              </Text>
            </View>
          ))}
        </View>
      )}

      {expanded && errors.length === 0 && (
        <View style={{ paddingHorizontal: 16, paddingBottom: 16, alignItems: "center" }}>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.accent.DEFAULT }}>
            All checks passed
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
