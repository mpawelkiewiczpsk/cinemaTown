// src/screens/tickets/TicketsScreen.tsx – lista kupionych biletów
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SCREENINGS, findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { SegmentedControl } from "@/components/SegmentedControl";
import type { TabScreenProps } from "@/navigation/types";
import { useTickets } from "@/state/TicketsContext";
import { formatDayLabel, formatPrice, formatTime } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";

type Filter = "upcoming" | "past";

export function TicketsScreen({ navigation }: TabScreenProps<"TicketsTab">) {
  const theme = useAppTheme();
  const { tickets } = useTickets();
  const [filter, setFilter] = useState<Filter>("upcoming");

  // Czas odczytujemy raz (leniwy inicjalizator) – render musi być „czysty”
  const [now] = useState(() => Date.now());
  const visible = tickets.filter((t) => {
    const s = SCREENINGS.find((x) => x.id === t.screeningId);
    const isPast = s ? new Date(s.startsAt).getTime() < now : false;
    return filter === "past" ? isPast : !isPast;
  });

  return (
    <View style={styles.flex}>
      <View style={styles.segmented}>
        <SegmentedControl<Filter>
          options={[
            { value: "upcoming", label: "Nadchodzące" },
            { value: "past", label: "Archiwalne" },
          ]}
          value={filter}
          onChange={setFilter}
        />
      </View>
      <FlatList
        data={visible}
        keyExtractor={(t) => t.id}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<EmptyState icon="ticket-outline" title="Brak biletów" />}
        renderItem={({ item }) => {
          const screening = SCREENINGS.find((s) => s.id === item.screeningId);
          const movie = screening && findMovie(screening.movieId);
          return (
            <Pressable
              onPress={() => navigation.navigate("TicketDetails", { ticketId: item.id })}
              style={[styles.card, { backgroundColor: theme.colors.surface }]}
            >
              <Ionicons name="ticket" size={28} color={theme.colors.primary} />
              <View style={styles.flex}>
                <AppText variant="subtitle">{movie?.title}</AppText>
                {screening && (
                  <AppText variant="caption" muted>
                    {formatDayLabel(screening.startsAt)}, {formatTime(screening.startsAt)} ·
                    miejsca: {item.seats.join(", ")}
                  </AppText>
                )}
              </View>
              <AppText variant="subtitle">{formatPrice(item.total)}</AppText>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  segmented: { paddingVertical: spacing.md },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  separator: { height: spacing.sm },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
});
