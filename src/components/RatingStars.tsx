// src/components/RatingStars.tsx – ocena 0–10 jako 5 gwiazdek
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

export function RatingStars({ rating, size = 14 }: { rating: number; size?: number }) {
  const theme = useAppTheme();
  const stars = rating / 2; // skala 0–5
  return (
    <View style={styles.row} accessible accessibilityLabel={`Ocena ${rating} na 10`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const name = stars >= i + 1 ? "star" : stars >= i + 0.5 ? "star-half" : "star-outline";
        return <Ionicons key={i} name={name} size={size} color={theme.colors.gold} />;
      })}
      <AppText variant="caption" muted style={styles.value}>
        {rating.toFixed(1)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
  value: { marginLeft: 4 },
});
