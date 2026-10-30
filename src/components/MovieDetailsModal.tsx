// src/components/MovieDetailsModal.tsx – szczegóły filmu w oknie modalnym
import { useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Movie } from "@/data/types";
import { formatDuration } from "@/utils/format";
import { fonts, radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";
import { AgeBadge } from "./AgeBadge";
import { RatingStars } from "./RatingStars";

type Props = { movie: Movie | null; onClose: () => void };

export function MovieDetailsModal({ movie, onClose }: Props) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);

  return (
    <Modal
      visible={movie !== null}
      animationType="slide"
      presentationStyle="pageSheet" // iOS: karta nasunięta na ekran; Android: pełny ekran
      onRequestClose={onClose} // Android: systemowy przycisk „wstecz”
      onDismiss={() => setExpanded(false)}
    >
      {movie && (
        <View style={[styles.flex, { backgroundColor: theme.colors.background }]}>
          <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}>
            <Image source={movie.backdropUrl} style={styles.backdrop} contentFit="cover" />
            <View style={styles.body}>
              <AppText variant="hero" selectable>
                {movie.title}
              </AppText>
              <View style={styles.meta}>
                <AgeBadge rating={movie.ageRating} />
                <AppText muted>{formatDuration(movie.durationMin)}</AppText>
                <RatingStars rating={movie.rating} />
              </View>
              <AppText muted>Reżyseria: {movie.director}</AppText>
              {/* Zagnieżdżony Text dziedziczy styl rodzica i może go nadpisać */}
              <AppText numberOfLines={expanded ? undefined : 3}>
                <AppText style={styles.bold}>Opis: </AppText>
                {movie.description}
              </AppText>
              <Pressable onPress={() => setExpanded((v) => !v)} hitSlop={8}>
                <AppText color={theme.colors.primary}>
                  {expanded ? "Zwiń" : "Czytaj więcej"}
                </AppText>
              </Pressable>
            </View>
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={[styles.close, { backgroundColor: "rgba(0,0,0,0.55)" }]}
            accessibilityRole="button"
            accessibilityLabel="Zamknij"
            hitSlop={10}
          >
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  backdrop: { width: "100%", aspectRatio: 16 / 9 },
  body: { padding: spacing.lg, gap: spacing.md },
  meta: { flexDirection: "row", alignItems: "center", gap: spacing.md, flexWrap: "wrap" },
  // Własny font: pogrubienie przez inną rodzinę, nie fontWeight (Android)
  bold: { fontFamily: fonts.bold },
  close: {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
});
