// src/screens/movies/FiltersScreen.tsx – arkusz (formSheet) przekazujący wynik wstecz
import { useState } from "react";
import { Pressable, StyleSheet, Switch, View } from "react-native";
import { GENRES } from "@/data/mockData";
import type { Genre } from "@/data/types";
import { AppText } from "@/components/AppText";
import { GenreChips } from "@/components/GenreChips";
import type { RepertoireScreenProps } from "@/navigation/types";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function FiltersScreen({ navigation, route }: RepertoireScreenProps<"Filters">) {
  const theme = useAppTheme();
  const [genres, setGenres] = useState<Genre[]>(route.params?.genres ?? []);
  const [onlyPremieres, setOnlyPremieres] = useState(route.params?.onlyPremieres ?? false);

  const toggle = (g: Genre) =>
    setGenres((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));

  // popTo + merge: wracamy do ekranu Movies i scalamy nowe parametry z obecnymi
  const apply = () => navigation.popTo("Movies", { genres, onlyPremieres }, { merge: true });

  return (
    <View style={styles.container}>
      <AppText variant="label" muted>
        Gatunki
      </AppText>
      <View style={styles.chips}>
        <GenreChips genres={GENRES} selected={genres} onToggle={toggle} />
      </View>
      <View style={styles.row}>
        <AppText>Tylko premiery</AppText>
        <Switch value={onlyPremieres} onValueChange={setOnlyPremieres} />
      </View>
      <View style={styles.actions}>
        <Pressable
          style={[styles.button, { borderColor: theme.colors.border }]}
          onPress={() => {
            setGenres([]);
            setOnlyPremieres(false);
          }}
        >
          <AppText>Wyczyść</AppText>
        </Pressable>
        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={apply}
        >
          <AppText color={theme.colors.onPrimary}>Zastosuj</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  chips: { marginHorizontal: -spacing.lg },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actions: { flexDirection: "row", gap: spacing.md },
  button: {
    flex: 1,
    height: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
