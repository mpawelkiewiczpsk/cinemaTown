// src/components/MovieCard.tsx – kafelek filmu w siatce
import { memo } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import type { Movie } from "@/data/types";
import { formatDuration } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";
import { AgeBadge } from "./AgeBadge";
import { RatingStars } from "./RatingStars";

// Prosty "blurhash" – rozmyta zaślepka widoczna, zanim obraz się pobierze
const BLURHASH = "L6PZfSi_.AyE_3t7t7R**0o#DgR4";

type Props = {
  movie: Movie;
  onPress: (movie: Movie) => void;
  onLongPress?: (movie: Movie) => void;
};

function MovieCardComponent({ movie, onPress, onLongPress }: Props) {
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() => onPress(movie)}
      onLongPress={() => onLongPress?.(movie)}
      delayLongPress={350}
      android_ripple={{ color: "rgba(0,0,0,0.15)", foreground: true }}
      // Funkcja w style dostaje stan { pressed } – efekt wciśnięcia na iOS
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        pressed && Platform.OS === "ios" && styles.pressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`${movie.title}, ${formatDuration(movie.durationMin)}`}
      accessibilityHint="Otwiera szczegóły filmu"
    >
      <Image
        source={movie.posterUrl}
        placeholder={{ blurhash: BLURHASH }}
        contentFit="cover"
        transition={250}
        style={styles.poster}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.info}>
        <AppText variant="subtitle" numberOfLines={1}>
          {movie.title}
        </AppText>
        <View style={styles.metaRow}>
          <AgeBadge rating={movie.ageRating} />
          <AppText variant="caption" muted>
            {formatDuration(movie.durationMin)}
          </AppText>
        </View>
        <RatingStars rating={movie.rating} size={12} />
      </View>
      {movie.isPremiere && (
        <View style={[styles.ribbon, { backgroundColor: theme.colors.primary }]}>
          <AppText variant="label" color={theme.colors.onPrimary}>
            Premiera
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

// memo: karta przerenderuje się tylko, gdy zmienią się jej propsy
export const MovieCard = memo(MovieCardComponent);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth, // najcieńsza linia na danym ekranie
    overflow: "hidden", // przycina obraz i efekt ripple do zaokrąglonych rogów
    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.12)",
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  poster: { width: "100%", aspectRatio: 2 / 3 },
  info: { padding: spacing.md, gap: 6 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  ribbon: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.sm,
  },
});
