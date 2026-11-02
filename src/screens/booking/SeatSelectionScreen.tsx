// src/screens/booking/SeatSelectionScreen.tsx – wybór miejsc (modal) z blokadą wyjścia
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View, useWindowDimensions } from "react-native";
import { usePreventRemove } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SCREENINGS, findHall, findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import { SeatMap } from "@/components/SeatMap";
import type { RootStackScreenProps } from "@/navigation/types";
import { useTickets } from "@/state/TicketsContext";
import { formatDayLabel, formatPrice, formatTime } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function SeatSelectionScreen({ navigation, route }: RootStackScreenProps<"SeatSelection">) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { addTicket } = useTickets();
  const [selected, setSelected] = useState<string[]>([]);

  // Zapobiegamy przypadkowemu zamknięciu ekranu z niezapisanym wyborem
  usePreventRemove(selected.length > 0, ({ data }) => {
    // Nasze własne „replace” po zakupie przepuszczamy bez pytania (stan nie zdążyłby się zmienić)
    if (data.action.type === "REPLACE") {
      navigation.dispatch(data.action);
      return;
    }
    Alert.alert("Porzucić wybór?", "Wybrane miejsca nie zostaną zarezerwowane.", [
      { text: "Zostań", style: "cancel" },
      // Wykonujemy akcję nawigacji, którą wcześniej zablokowaliśmy
      { text: "Porzuć", style: "destructive", onPress: () => navigation.dispatch(data.action) },
    ]);
  });

  const screening = SCREENINGS.find((s) => s.id === route.params.screeningId);
  const hall = screening && findHall(screening.hallId);
  const movie = screening && findMovie(screening.movieId);
  if (!screening || !hall || !movie) {
    return <EmptyState title="Seans nie istnieje" message="Sprawdź link lub wybierz inny seans." />;
  }

  const seatSize = Math.min(28, Math.floor((width - 80) / (hall.seatsPerRow + 1)));
  const toggleSeat = (seat: string) =>
    setSelected((prev) => (prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]));

  const confirm = () => {
    const ticket = addTicket({
      screeningId: screening.id,
      seats: selected,
      total: selected.length * screening.price,
    });
    // replace: modal wyboru miejsc zostaje zastąpiony biletem – „wstecz” nie wraca do wyboru
    navigation.replace("TicketDetails", { ticketId: ticket.id });
  };

  return (
    <View style={styles.flex}>
      <ScrollView contentContainerStyle={styles.content}>
        <AppText variant="title">{movie.title}</AppText>
        <AppText muted>
          {formatDayLabel(screening.startsAt)}, {formatTime(screening.startsAt)} · {hall.name}
        </AppText>
        <ScrollView horizontal contentContainerStyle={styles.mapScroll}>
          <SeatMap
            hall={hall}
            taken={screening.takenSeats}
            selected={selected}
            onToggle={toggleSeat}
            seatSize={seatSize}
          />
        </ScrollView>
      </ScrollView>
      <View
        style={[
          styles.summary,
          {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
            paddingBottom: insets.bottom + spacing.md,
          },
        ]}
      >
        <View style={styles.flex}>
          <AppText variant="caption" muted>
            {selected.length > 0 ? `Miejsca: ${selected.join(", ")}` : "Wybierz miejsca"}
          </AppText>
          <AppText variant="subtitle">{formatPrice(selected.length * screening.price)}</AppText>
        </View>
        <Pressable
          disabled={selected.length === 0}
          onPress={confirm}
          style={[
            styles.button,
            { backgroundColor: theme.colors.primary },
            selected.length === 0 && styles.dim,
          ]}
        >
          <AppText variant="subtitle" color={theme.colors.onPrimary}>
            Kupuję
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.sm },
  mapScroll: { paddingVertical: spacing.xl, minWidth: "100%", justifyContent: "center" },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  button: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md, borderRadius: radius.md },
  dim: { opacity: 0.5 },
});
