// src/components/ScreeningRow.tsx – wiersz seansu w SectionList
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import type { Hall, Movie, Screening } from "@/data/types";
import { formatPrice, formatTime } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props = {
  screening: Screening;
  movie: Movie;
  hall: Hall;
  onPress: (screening: Screening) => void;
};

export function ScreeningRow({ screening, movie, hall, onPress }: Props) {
  const theme = useAppTheme();
  const capacity = hall.rows * hall.seatsPerRow;
  const free = capacity - screening.takenSeats.length;

  return (
    <Pressable
      onPress={() => onPress(screening)}
      android_ripple={{ color: theme.colors.border }}
      style={[styles.row, { backgroundColor: theme.colors.surface }]}
      accessibilityRole="button"
      accessibilityLabel={`${movie.title}, godzina ${formatTime(screening.startsAt)}, ${hall.name}`}
    >
      <View style={[styles.time, { backgroundColor: theme.colors.surfaceAlt }]}>
        <AppText variant="subtitle">{formatTime(screening.startsAt)}</AppText>
        <AppText variant="caption" muted>
          {hall.type}
        </AppText>
      </View>
      <Image source={movie.posterUrl} style={styles.thumb} contentFit="cover" />
      {/* flex: 1 – środkowa kolumna zajmuje całe wolne miejsce */}
      <View style={styles.middle}>
        <AppText variant="subtitle" numberOfLines={1}>
          {movie.title}
        </AppText>
        <AppText variant="caption" muted numberOfLines={1}>
          {hall.name} · {screening.language} · {formatPrice(screening.price)}
        </AppText>
        <AppText variant="caption" color={free < 10 ? theme.colors.warning : theme.colors.success}>
          Wolne miejsca: {free}
        </AppText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  time: {
    width: 64,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  thumb: { width: 40, height: 60, borderRadius: 6 },
  middle: { flex: 1, gap: 2 },
});
