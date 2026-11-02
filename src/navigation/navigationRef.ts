// src/navigation/navigationRef.ts – nawigacja spoza komponentów (np. z powiadomień w W07)
import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Bezpieczne wywołanie: nawigator może jeszcze nie być gotowy
export function navigateToTicket(ticketId: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate("TicketDetails", { ticketId });
  }
}
