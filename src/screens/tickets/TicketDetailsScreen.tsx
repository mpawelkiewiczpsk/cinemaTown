// src/screens/tickets/TicketDetailsScreen.tsx – szczegóły biletu + nawigacja zagnieżdżona
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { SCREENINGS, findHall, findMovie } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import type { RootStackScreenProps } from "@/navigation/types";
import { useTickets } from "@/state/TicketsContext";
import { formatDayLabel, formatPrice, formatTime } from "@/utils/format";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function TicketDetailsScreen({ navigation, route }: RootStackScreenProps<"TicketDetails">) {
  const theme = useAppTheme();
  const { tickets } = useTickets();
  const ticket = tickets.find((t) => t.id === route.params.ticketId);
  const screening = ticket && SCREENINGS.find((s) => s.id === ticket.screeningId);
  const movie = screening && findMovie(screening.movieId);
  const hall = screening && findHall(screening.hallId);

  if (!ticket || !screening || !movie || !hall) {
    return <EmptyState icon="ticket-outline" title="Nie znaleziono biletu" />;
  }

  // Pełna ścieżka do ekranu w głęboko zagnieżdżonym nawigatorze
  const openMovie = () =>
    navigation.navigate("Main", {
      screen: "HomeTabs",
      params: {
        screen: "RepertoireTab",
        params: { screen: "MovieDetails", params: { movieId: movie.id } },
      },
    });

  // reset: nowa historia – lista biletów jako jedyny ekran pod spodem
  const goToTickets = () =>
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Main", params: { screen: "HomeTabs", params: { screen: "TicketsTab" } } },
        ],
      }),
    );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.ticket, { backgroundColor: theme.colors.surface }]}>
        <AppText variant="label" color={theme.colors.primary}>
          Bilet {ticket.id}
        </AppText>
        <AppText variant="hero">{movie.title}</AppText>
        <Row
          label="Termin"
          value={`${formatDayLabel(screening.startsAt)}, ${formatTime(screening.startsAt)}`}
        />
        <Row label="Sala" value={`${hall.name} (${hall.type})`} />
        <Row label="Miejsca" value={ticket.seats.join(", ")} />
        <Row label="Cena" value={formatPrice(ticket.total)} />
        <AppText variant="caption" muted>
          Kod QR biletu dodamy w W07.
        </AppText>
      </View>
      <Pressable style={[styles.button, { borderColor: theme.colors.primary }]} onPress={openMovie}>
        <AppText color={theme.colors.primary}>Szczegóły filmu</AppText>
      </Pressable>
      <Pressable
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        onPress={goToTickets}
      >
        <AppText color={theme.colors.onPrimary}>Moje bilety</AppText>
      </Pressable>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <AppText muted>{label}</AppText>
      <AppText variant="subtitle">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  ticket: { padding: spacing.xl, borderRadius: radius.lg, gap: spacing.md },
  row: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  button: {
    height: 50,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
});
