// src/screens/movies/MoviesScreen.tsx – repertuar: wyszukiwarka w nagłówku, filtry w arkuszu
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useScrollToTop } from "@react-navigation/native";
import { MOVIES } from "@/data/mockData";
import type { Movie } from "@/data/types";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { MovieCard } from "@/components/MovieCard";
import { PremiereCarousel } from "@/components/PremiereCarousel";
import type { RepertoireScreenProps } from "@/navigation/types";
import { spacing, useAppTheme } from "@/theme/theme";

export function MoviesScreen({ navigation, route }: RepertoireScreenProps<"Movies">) {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState("");
  const listRef = useRef<FlatList<Movie>>(null);

  // Ponowne dotknięcie aktywnej zakładki przewija listę na górę
  useScrollToTop(listRef);

  // Filtry przechowujemy w parametrach trasy – ustawia je ekran Filters
  // useMemo: bez niego „?? []” tworzyłoby nową tablicę przy każdym renderze
  const genres = useMemo(() => route.params?.genres ?? [], [route.params?.genres]);
  const onlyPremieres = route.params?.onlyPremieres ?? false;
  const activeFilters = genres.length + (onlyPremieres ? 1 : 0);

  // Opcje nagłówka zależne od stanu ekranu ustawiamy przez setOptions
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Szukaj filmu",
        onChangeText: (e) => setQuery(e.nativeEvent.text),
        hideWhenScrolling: true,
      },
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("Filters", { genres, onlyPremieres })}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`Filtry, aktywne: ${activeFilters}`}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={22} color={theme.colors.primary} />
          {activeFilters > 0 && (
            <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
              <AppText variant="caption" color={theme.colors.onPrimary}>
                {activeFilters}
              </AppText>
            </View>
          )}
        </Pressable>
      ),
    });
  }, [navigation, genres, onlyPremieres, activeFilters, theme]);

  const numColumns = width >= 900 ? 4 : width >= 600 ? 3 : 2;
  const filtered = useMemo(
    () =>
      MOVIES.filter((m) => m.title.toLowerCase().includes(query.trim().toLowerCase()))
        .filter((m) => genres.length === 0 || m.genres.some((g) => genres.includes(g)))
        .filter((m) => !onlyPremieres || m.isPremiere),
    [query, genres, onlyPremieres],
  );

  const openMovie = useCallback(
    (movie: Movie) => navigation.navigate("MovieDetails", { movieId: movie.id }),
    [navigation],
  );
  // preload (v7): ekran szczegółów renderuje się w tle już przy dotknięciu karty
  const preloadMovie = useCallback(
    (movie: Movie) => navigation.preload("MovieDetails", { movieId: movie.id }),
    [navigation],
  );

  return (
    <FlatList
      ref={listRef}
      key={numColumns}
      data={filtered}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      // iOS: lista współpracuje z dużym tytułem i paskiem wyszukiwania
      contentInsetAdjustmentBehavior="automatic"
      renderItem={({ item }) => (
        <View style={[styles.cell, { maxWidth: `${100 / numColumns}%` }]}>
          <MovieCard movie={item} onPress={openMovie} onPressIn={preloadMovie} />
        </View>
      )}
      ListHeaderComponent={
        query === "" ? (
          <View style={styles.header}>
            <PremiereCarousel movies={MOVIES.filter((m) => m.isPremiere)} onPress={openMovie} />
            <AppText variant="label" muted style={styles.count}>
              Filmy: {filtered.length}
            </AppText>
          </View>
        ) : undefined
      }
      ListEmptyComponent={<EmptyState title="Brak filmów" message="Zmień frazę lub filtry." />}
      columnWrapperStyle={styles.columns}
      contentContainerStyle={styles.content}
      keyboardDismissMode="on-drag"
    />
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.md, paddingTop: spacing.md, marginBottom: spacing.md },
  count: { marginHorizontal: spacing.lg },
  content: { paddingBottom: spacing.xxl },
  columns: { paddingHorizontal: spacing.lg - spacing.sm / 2 },
  cell: { flex: 1, padding: spacing.sm / 2, paddingBottom: spacing.md },
  filterButton: { padding: 4 },
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
});
