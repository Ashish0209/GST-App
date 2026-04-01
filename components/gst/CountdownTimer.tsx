import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ProgressRing } from "../ui/ProgressRing";
import { useGSTStore } from "../../store/useGSTStore";
import { colors } from "../../theme";
import { formatDate } from "../../utils/format";

export function CountdownTimer() {
  const getNextDeadline = useGSTStore((s) => s.getNextDeadline);
  const deadline = getNextDeadline();

  if (!deadline) {
    return (
      <Animated.View
        entering={FadeInDown.delay(150).duration(400).springify().damping(15)}
        style={{ alignItems: "center", paddingVertical: 24 }}
      >
        <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 14, color: colors.accent.DEFAULT }}>
          All returns filed
        </Text>
      </Animated.View>
    );
  }

  const isOverdue = deadline.daysLeft < 0;
  const displayDays = Math.abs(deadline.daysLeft);
  // Progress: if 30 days total window, show how much time has passed
  const percent = isOverdue ? 100 : Math.max(5, Math.round(((30 - deadline.daysLeft) / 30) * 100));
  const ringColor = isOverdue ? colors.error : deadline.daysLeft <= 7 ? colors.warning : colors.accent.DEFAULT;
  const formattedDeadline = formatDate(new Date(deadline.deadline));

  return (
    <Animated.View
      entering={FadeInDown.delay(150).duration(400).springify().damping(15)}
      style={{
        alignItems: "center",
        paddingVertical: 20,
        backgroundColor: "rgba(255,255,255,0.85)",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.3)",
        marginHorizontal: 16,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: colors.text.secondary, marginBottom: 12 }}>
        Next Deadline — {deadline.type}
      </Text>

      <View style={{ position: "relative" }}>
        <ProgressRing percent={percent} size={120} strokeWidth={10} color={ringColor} />
        {/* Override center content with days */}
        <View style={{ position: "absolute", inset: 0, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontFamily: "Inter_800ExtraBold", fontSize: 32, color: isOverdue ? colors.error : colors.text.primary }}>
            {displayDays}
          </Text>
          <Text style={{ fontFamily: "Inter_500Medium", fontSize: 10, color: colors.text.secondary }}>
            {isOverdue ? "days ago" : "days left"}
          </Text>
        </View>
      </View>

      <Text style={{ fontFamily: "Inter_500Medium", fontSize: 13, color: colors.text.secondary, marginTop: 12 }}>
        {formattedDeadline}
      </Text>

      {isOverdue && (
        <View style={{ marginTop: 8, backgroundColor: "rgba(220,38,38,0.1)", paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 12, color: colors.error }}>
            OVERDUE
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
