// src/components/MovieHeaderActions.tsx – przyciski w nagłówku ekranu szczegółów filmu
import { useState } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "@react-navigation/elements";
import { findMovie } from "@/data/mockData";

// Komponent przekazujemy w `options` nawigatora (a nie przez setOptions z ekranu),
// dzięki czemu działa też z navigation.preload() – ekran wczytany zawczasu
// nie może wywoływać setOptions.
export function MovieHeaderActions({ movieId }: { movieId: string }) {
  const movie = findMovie(movieId);
  const [favorite, setFavorite] = useState(false); // w W04 przeniesiemy do globalnego store

  return (
    <View style={styles.row}>
      <HeaderButton
        accessibilityLabel="Udostępnij"
        onPress={() =>
          movie && Share.share({ message: `Idę na „${movie.title}”! kino://movie/${movie.id}` })
        }
      >
        <Ionicons name="share-outline" size={22} color="#FFFFFF" />
      </HeaderButton>
      <HeaderButton
        accessibilityLabel={favorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        onPress={() => setFavorite((f) => !f)}
      >
        <Ionicons name={favorite ? "heart" : "heart-outline"} size={22} color="#FFFFFF" />
      </HeaderButton>
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row" } });
