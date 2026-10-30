// src/components/AgeBadge.tsx – oznaczenie kategorii wiekowej
import { StyleSheet, View } from "react-native";
import type { AgeRating } from "@/data/types";
import { AppText } from "./AppText";

const COLORS: Record<AgeRating, string> = {
  BO: "#2E9E5B",
  "7+": "#3B82F6",
  "12+": "#F59E0B",
  "16+": "#EA580C",
  "18+": "#DC2626",
};

export function AgeBadge({ rating }: { rating: AgeRating }) {
  return (
    <View
      style={[styles.badge, { backgroundColor: COLORS[rating] }]}
      accessibilityLabel={rating === "BO" ? "Bez ograniczeń wiekowych" : `Od ${rating} lat`}
    >
      <AppText variant="caption" color="#FFFFFF">
        {rating}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start", // badge nie rozciąga się na całą szerokość rodzica
  },
});
