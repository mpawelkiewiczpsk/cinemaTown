// src/screens/RepertoireView.tsx – repertuar: karuzel + filtry + responsywna siatka
import { useCallback, useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GENRES, MOVIES } from "@/data/mockData";
import type { Genre, Movie } from "@/data/types";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { GenreChips } from "@/components/GenreChips";
import { MovieCard } from "@/components/MovieCard";
import { PremiereCarousel } from "@/components/PremiereCarousel";
import { fonts, radius, spacing, useAppTheme } from "@/theme/theme";

type Props = { onOpenMovie: (movie: Movie) => void };

export function RepertoireView({ onOpenMovie }: Props) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [onlyPremieres, setOnlyPremieres] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Liczba kolumn zależy od szerokości okna (telefon / obrót / tablet)
  const numColumns = width >= 900 ? 4 : width >= 600 ? 3 : 2;

  // Filtrowanie liczymy tylko, gdy zmienią się dane wejściowe
  const filtered = useMemo(
    () =>
      MOVIES.filter((m) => m.title.toLowerCase().includes(query.trim().toLowerCase()))
        .filter((m) => genres.length === 0 || m.genres.some((g) => genres.includes(g)))
        .filter((m) => !onlyPremieres || m.isPremiere),
    [query, genres, onlyPremieres],
  );

  const toggleGenre = (genre: Genre) =>
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );

  // Symulacja „pociągnij, aby odświeżyć” (od W06 – prawdziwe pobranie z API)
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  // useCallback: stała referencja funkcji – memo w MovieCard ma sens
  const onLongPress = useCallback((movie: Movie) => {
    Alert.alert(movie.title, "Co chcesz zrobić?", [
      { text: "Pokaż szczegóły", onPress: () => onOpenMovie(movie) },
      { text: "Anuluj", style: "cancel" },
    ]);
  }, [onOpenMovie]);

  const header = (
    <View style={styles.header}>
      <PremiereCarousel movies={MOVIES.filter((m) => m.isPremiere)} onPress={onOpenMovie} />

      <View style={[styles.search, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="search" size={18} color={theme.colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Szukaj filmu..."
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.searchInput, { color: theme.colors.text }]}
          returnKeyType="search"
          clearButtonMode="while-editing" // iOS: przycisk czyszczenia
          autoCorrect={false}
        />
      </View>

      <GenreChips genres={GENRES} selected={genres} onToggle={toggleGenre} />

      <View style={styles.switchRow}>
        <AppText>Tylko premiery</AppText>
        <Switch
          value={onlyPremieres}
          onValueChange={setOnlyPremieres}
          trackColor={{ true: theme.colors.primary, false: theme.colors.border }}
          thumbColor="#FFFFFF"
        />
      </View>
      <AppText variant="label" muted style={styles.count}>
        Filmy: {filtered.length}
      </AppText>
    </View>
  );

  return (
    <FlatList
      // Zmiana numColumns „w locie” wymaga nowego klucza – inaczej błąd
      key={numColumns}
      data={filtered}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <View style={[styles.cell, { maxWidth: `${100 / numColumns}%` }]}>
          <MovieCard movie={item} onPress={onOpenMovie} onLongPress={onLongPress} />
        </View>
      )}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState title="Brak filmów" message="Zmień kryteria wyszukiwania lub filtry." />
      }
      columnWrapperStyle={styles.columns}
      contentContainerStyle={styles.content}
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyboardDismissMode="on-drag" // przewinięcie listy chowa klawiaturę
      initialNumToRender={6}
    />
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.lg, paddingTop: spacing.md, marginBottom: spacing.md },
  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    height: 44,
  },
  searchInput: { flex: 1, fontFamily: fonts.regular, fontSize: 15 },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: spacing.lg,
  },
  count: { marginHorizontal: spacing.lg },
  content: { paddingBottom: spacing.xxl },
  columns: { paddingHorizontal: spacing.lg - spacing.sm / 2 },
  cell: { flex: 1, padding: spacing.sm / 2, paddingBottom: spacing.md },
});
