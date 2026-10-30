// src/components/GenreChips.tsx – poziomy pasek filtrów gatunków
import { Pressable, ScrollView, StyleSheet } from "react-native";
import type { Genre } from "@/data/types";
import { radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props = {
  genres: Genre[];
  selected: Genre[];
  onToggle: (genre: Genre) => void;
};

export function GenreChips({ genres, selected, onToggle }: Props) {
  const theme = useAppTheme();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      keyboardShouldPersistTaps="handled"
    >
      {genres.map((genre) => {
        const active = selected.includes(genre);
        return (
          <Pressable
            key={genre}
            onPress={() => onToggle(genre)}
            hitSlop={6} // większy obszar dotyku niż widoczny element
            style={[
              styles.chip,
              {
                backgroundColor: active ? theme.colors.primary : theme.colors.surface,
                borderColor: active ? theme.colors.primary : theme.colors.border,
              },
            ]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: active }}
          >
            <AppText variant="caption" color={active ? theme.colors.onPrimary : theme.colors.text}>
              {genre}
            </AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 16, gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
});
