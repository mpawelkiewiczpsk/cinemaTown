// src/screens/HallView.tsx – plan sali dla wybranego seansu + pasek podsumowania
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { findHall, findMovie } from "@/data/mockData";
import type { Screening } from "@/data/types";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { SeatMap } from "@/components/SeatMap";
import { formatDayLabel, formatPrice, formatTime } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";

type Props = { screening: Screening | null };

export function HallView({ screening }: Props) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<string[]>([]);

  if (!screening) {
    return (
      <EmptyState
        icon="grid-outline"
        title="Wybierz seans"
        message="Przejdź do zakładki „Seanse” i dotknij wybranego seansu."
      />
    );
  }

  const hall = findHall(screening.hallId);
  const movie = findMovie(screening.movieId);
  if (!hall || !movie) return null;

  // Rozmiar fotela dopasowany do szerokości ekranu i liczby miejsc w rzędzie
  const seatSize = Math.min(
    28,
    Math.floor((width - 80) / (hall.seatsPerRow + 1)),
  );

  const toggleSeat = (seat: string) =>
    setSelected((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title">{movie.title}</AppText>
        <AppText muted>
          {formatDayLabel(screening.startsAt)}, {formatTime(screening.startsAt)}{" "}
          · {hall.name} ({hall.type})
        </AppText>
        {/* Poziomy ScrollView – szeroka sala zmieści się także na małym telefonie */}
        <ScrollView horizontal contentContainerStyle={styles.mapScroll}>
          <SeatMap
            hall={hall}
            taken={screening.takenSeats}
            selected={selected}
            onToggle={toggleSeat}
            seatSize={seatSize}
          />
        </ScrollView>
      </ScrollView>

      {/* Pasek przyklejony do dołu, z odstępem nad paskiem gestów systemu */}
      <View
        style={[
          styles.summary,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingBottom: insets.bottom + spacing.md,
          },
        ]}
      >
        <View style={styles.flex}>
          <AppText variant="caption" muted>
            {selected.length > 0
              ? `Miejsca: ${selected.join(", ")}`
              : "Nie wybrano miejsc"}
          </AppText>
          <AppText variant="subtitle">
            {formatPrice(selected.length * screening.price)}
          </AppText>
        </View>
        <Pressable
          disabled={selected.length === 0}
          onPress={() => setSelected([])}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.colors.primary },
            (pressed || selected.length === 0) && styles.buttonDim,
          ]}
          accessibilityRole="button"
        >
          <AppText variant="subtitle" color={theme.colors.onPrimary}>
            Wyczyść
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.sm },
  mapScroll: {
    paddingVertical: spacing.xl,
    minWidth: "100%",
    justifyContent: "center",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  buttonDim: { opacity: 0.5 },
});
