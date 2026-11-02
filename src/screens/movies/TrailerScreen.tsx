// src/screens/movies/TrailerScreen.tsx – przezroczysty modal nad poprzednim ekranem
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import type { RootStackScreenProps } from "@/navigation/types";
import { radius, spacing } from "@/theme/theme";

export function TrailerScreen({ navigation, route }: RootStackScreenProps<"Trailer">) {
  const movie = findMovie(route.params.movieId);

  return (
    <View style={styles.overlay}>
      {/* Dotknięcie tła zamyka modal */}
      <Pressable style={StyleSheet.absoluteFill} onPress={() => navigation.goBack()} />
      <View style={styles.card}>
        <Image source={movie?.backdropUrl} style={styles.video} contentFit="cover" />
        <View style={styles.play}>
          <Ionicons name="play" size={36} color="#FFFFFF" />
        </View>
        <AppText variant="subtitle" color="#FFFFFF" style={styles.title}>
          {movie?.title ?? "Zwiastun"}
        </AppText>
        <AppText variant="caption" color="#D1D1D6" style={styles.title}>
          Odtwarzacz wideo dodamy w W07 – teraz pokazujemy nawigację modalną.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: spacing.lg,
  },
  card: { backgroundColor: "#111114", borderRadius: radius.lg, overflow: "hidden" },
  video: { width: "100%", aspectRatio: 16 / 9 },
  play: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    aspectRatio: 16 / 9,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
});
