// src/navigation/types.ts – mapa całej nawigacji aplikacji w typach
import type { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps } from "@react-navigation/drawer";
import type { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import type { Genre } from "@/data/types";

// ── Poziom 1: główny Stack ───────────────────────────────────────────
export type RootStackParamList = {
  Welcome: undefined;
  SignIn: { email?: string } | undefined;
  Main: NavigatorScreenParams<DrawerParamList> | undefined;
  SeatSelection: { screeningId: string };
  TicketDetails: { ticketId: string };
  Trailer: { movieId: string };
  NotFound: undefined;
};

// ── Poziom 2: Drawer (menu boczne) ───────────────────────────────────
export type DrawerParamList = {
  HomeTabs: NavigatorScreenParams<TabParamList> | undefined;
  Halls: undefined;
  Settings: undefined;
  About: undefined;
};

// ── Poziom 3: dolne zakładki ─────────────────────────────────────────
export type TabParamList = {
  RepertoireTab: NavigatorScreenParams<RepertoireStackParamList> | undefined;
  ScreeningsTab: NavigatorScreenParams<ScreeningsTopTabParamList> | undefined;
  TicketsTab: undefined;
  ProfileTab: undefined;
};

// ── Poziom 4a: Stack wewnątrz zakładki „Repertuar” ───────────────────
export type MovieFilters = { genres?: Genre[]; onlyPremieres?: boolean };

export type RepertoireStackParamList = {
  Movies: MovieFilters | undefined;
  MovieDetails: { movieId: string };
  Filters: MovieFilters | undefined;
};

// ── Poziom 4b: górne zakładki w „Seansach” ───────────────────────────
export type ScreeningsTopTabParamList = {
  Today: { dayOffset: number };
  Tomorrow: { dayOffset: number };
  DayAfter: { dayOffset: number };
};

// ── Typy propsów ekranów (łączą nawigatory od dołu do góry) ─────────
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type DrawerScreenPropsOf<T extends keyof DrawerParamList> = CompositeScreenProps<
  DrawerScreenProps<DrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  DrawerScreenPropsOf<keyof DrawerParamList>
>;

export type RepertoireScreenProps<T extends keyof RepertoireStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<RepertoireStackParamList, T>,
  TabScreenProps<keyof TabParamList>
>;

export type ScreeningsTopTabScreenProps<T extends keyof ScreeningsTopTabParamList> =
  CompositeScreenProps<
    MaterialTopTabScreenProps<ScreeningsTopTabParamList, T>,
    TabScreenProps<keyof TabParamList>
  >;

// Domyślny typ dla useNavigation() bez generyka
declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
