// src/screens/screenings/ScreeningsDayScreen.tsx – seanse jednego dnia (górna zakładka)
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SCREENINGS, findHall, findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { ScreeningRow } from "@/components/ScreeningRow";
import type { ScreeningsTopTabScreenProps, ScreeningsTopTabParamList } from "@/navigation/types";
import { formatDayLabel, startOfDay } from "@/utils/format";
import { spacing } from "@/theme/theme";

type Props = ScreeningsTopTabScreenProps<keyof ScreeningsTopTabParamList>;

export function ScreeningsDayScreen({ navigation, route }: Props) {
  const { dayOffset } = route.params;
  const isFocused = useIsFocused(); // czy ta zakładka jest aktualnie widoczna

  const day = useMemo(() => {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() + dayOffset);
    return d;
  }, [dayOffset]);

  const screenings = useMemo(
    () =>
      SCREENINGS.filter((s) => startOfDay(new Date(s.startsAt)).getTime() === day.getTime()).sort(
        (a, b) => a.startsAt.localeCompare(b.startsAt),
      ),
    [day],
  );

  return (
    <FlatList
      data={screenings}
      keyExtractor={(s) => s.id}
      renderItem={({ item }) => {
        const movie = findMovie(item.movieId);
        const hall = findHall(item.hallId);
        return movie && hall ? (
          <ScreeningRow
            screening={item}
            movie={movie}
            hall={hall}
            onPress={() => navigation.navigate("SeatSelection", { screeningId: item.id })}
          />
        ) : null;
      }}
      ListHeaderComponent={
        <View style={styles.header}>
          <AppText variant="title">{formatDayLabel(day.toISOString())}</AppText>
          {isFocused && (
            <AppText variant="caption" muted>
              Przesuń w bok, aby zmienić dzień
            </AppText>
          )}
        </View>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<EmptyState icon="calendar-outline" title="Brak seansów tego dnia" />}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.lg, gap: 2 },
  separator: { height: spacing.sm },
  content: { paddingBottom: spacing.xxl },
});
