// src/screens/movies/MovieDetailsScreen.tsx – szczegóły filmu + lista seansów
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SCREENINGS, findHall, findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { AgeBadge } from "@/components/AgeBadge";
import { EmptyState } from "@/components/EmptyState";
import { RatingStars } from "@/components/RatingStars";
import { ScreeningRow } from "@/components/ScreeningRow";
import type { RepertoireScreenProps } from "@/navigation/types";
import { formatDuration } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function MovieDetailsScreen({ navigation, route }: RepertoireScreenProps<"MovieDetails">) {
  const theme = useAppTheme();
  const movie = findMovie(route.params.movieId);

  if (!movie) {
    return (
      <EmptyState title="Nie znaleziono filmu" message="Film mógł zostać zdjęty z repertuaru." />
    );
  }

  const screenings = SCREENINGS.filter((s) => s.movieId === movie.id);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View>
        <Image source={movie.backdropUrl} style={styles.backdrop} contentFit="cover" />
        <LinearGradient
          colors={["rgba(0,0,0,0.6)", "transparent", theme.colors.background]}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.body}>
        <AppText variant="hero">{movie.title}</AppText>
        <View style={styles.meta}>
          <AgeBadge rating={movie.ageRating} />
          <AppText muted>{formatDuration(movie.durationMin)}</AppText>
          <RatingStars rating={movie.rating} />
        </View>
        <AppText>{movie.description}</AppText>

        <Pressable
          // Ekran Trailer jest w głównym Stacku – navigate „szuka” go w nawigatorach nadrzędnych
          onPress={() => navigation.navigate("Trailer", { movieId: movie.id })}
          style={[styles.trailer, { borderColor: theme.colors.primary }]}
        >
          <Ionicons name="play-circle" size={22} color={theme.colors.primary} />
          <AppText variant="subtitle" color={theme.colors.primary}>
            Zwiastun
          </AppText>
        </Pressable>

        <AppText variant="title">Seanse</AppText>
      </View>
      {screenings.length === 0 ? (
        <EmptyState icon="calendar-outline" title="Brak seansów" />
      ) : (
        screenings.map((s) => {
          const hall = findHall(s.hallId);
          return hall ? (
            <View key={s.id} style={styles.screening}>
              <ScreeningRow
                screening={s}
                movie={movie}
                hall={hall}
                onPress={() => navigation.navigate("SeatSelection", { screeningId: s.id })}
              />
            </View>
          ) : null;
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xxl },
  backdrop: { width: "100%", aspectRatio: 4 / 3 },
  body: { padding: spacing.lg, gap: spacing.md },
  meta: { flexDirection: "row", alignItems: "center", gap: spacing.md, flexWrap: "wrap" },
  trailer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderWidth: 1.5,
    borderRadius: radius.pill,
  },
  screening: { marginBottom: spacing.sm },
});
