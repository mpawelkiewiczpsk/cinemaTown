// src/screens/ScreeningsView.tsx – seanse pogrupowane według dni (SectionList)
import { useMemo } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import { SCREENINGS, findHall, findMovie } from "@/data/mockData";
import type { Screening } from "@/data/types";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { ScreeningRow } from "@/components/ScreeningRow";
import { formatDayLabel, startOfDay } from "@/utils/format";
import { spacing, useAppTheme } from "@/theme/theme";

type Section = { title: string; data: Screening[] };

type Props = { onSelectScreening: (screening: Screening) => void };

export function ScreeningsView({ onSelectScreening }: Props) {
  const theme = useAppTheme();

  // Grupujemy seanse po dniu i sortujemy po godzinie
  const sections = useMemo<Section[]>(() => {
    const byDay = new Map<number, Screening[]>();
    for (const s of [...SCREENINGS].sort((a, b) => a.startsAt.localeCompare(b.startsAt))) {
      const key = startOfDay(new Date(s.startsAt)).getTime();
      byDay.set(key, [...(byDay.get(key) ?? []), s]);
    }
    return [...byDay.entries()].map(([, data]) => ({
      title: formatDayLabel(data[0].startsAt),
      data,
    }));
  }, []);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const movie = findMovie(item.movieId);
        const hall = findHall(item.hallId);
        if (!movie || !hall) return null;
        return (
          <ScreeningRow screening={item} movie={movie} hall={hall} onPress={onSelectScreening} />
        );
      }}
      renderSectionHeader={({ section }) => (
        <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
          <AppText variant="title">{section.title}</AppText>
          <AppText variant="caption" muted>
            Seanse: {section.data.length}
          </AppText>
        </View>
      )}
      stickySectionHeadersEnabled // nagłówek dnia „przykleja się” podczas przewijania
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
      ListEmptyComponent={<EmptyState icon="calendar-outline" title="Brak seansów" />}
      ListFooterComponent={
        <AppText variant="caption" muted style={styles.footer}>
          Repertuar może ulec zmianie.
        </AppText>
      }
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  separator: { height: spacing.sm },
  sectionGap: { height: spacing.sm },
  footer: { textAlign: "center", marginTop: spacing.xl },
  content: { paddingBottom: spacing.xxl },
});
