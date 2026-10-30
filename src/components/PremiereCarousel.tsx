// src/components/PremiereCarousel.tsx – poziomy karuzel premier
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { Movie } from "@/data/types";
import { radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props = { movies: Movie[]; onPress: (movie: Movie) => void };

export function PremiereCarousel({ movies, onPress }: Props) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(width - spacing.lg * 2, 520); // na tablecie karta nie jest za szeroka
  const [index, setIndex] = useState(0);

  // onScroll + scrollEventThrottle: odczyt pozycji, by zaznaczyć aktywną kropkę
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setIndex(Math.round(x / (cardWidth + spacing.md)));
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + spacing.md} // „przyklejanie” do kolejnej karty
        decelerationRate="fast"
        contentContainerStyle={styles.content}
        onScroll={onScroll}
        scrollEventThrottle={16} // ~60 zdarzeń na sekundę
      >
        {movies.map((movie) => (
          <Pressable
            key={movie.id}
            onPress={() => onPress(movie)}
            style={[styles.card, { width: cardWidth }]}
            accessibilityRole="button"
            accessibilityLabel={`Premiera: ${movie.title}`}
          >
            <Image source={movie.backdropUrl} contentFit="cover" style={StyleSheet.absoluteFill} />
            {/* Gradient przyciemnia dół zdjęcia, żeby tekst był czytelny */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.85)"]}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.caption}>
              <AppText variant="label" color={theme.colors.gold}>
                Premiera
              </AppText>
              <AppText variant="title" color="#FFFFFF" numberOfLines={1}>
                {movie.title}
              </AppText>
              <AppText variant="caption" color="#E5E5EA">
                {movie.genres.join(" · ")}
              </AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.dots} accessibilityElementsHidden importantForAccessibility="no">
        {movies.map((m, i) => (
          <View
            key={m.id}
            style={[
              styles.dot,
              { backgroundColor: i === index ? theme.colors.primary : theme.colors.border },
              i === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: spacing.lg, gap: spacing.md },
  card: {
    aspectRatio: 16 / 9,
    borderRadius: radius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  caption: { padding: spacing.lg, gap: 2 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: spacing.sm },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotActive: { width: 18 },
});
