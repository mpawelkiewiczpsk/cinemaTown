// src/navigation/linking.ts – deep linki: adres URL -> ekran (z parametrami)
import * as Linking from "expo-linking";
import type { LinkingOptions } from "@react-navigation/native";
import type { RootStackParamList } from "./types";

export const linking: LinkingOptions<RootStackParamList> = {
  // createURL("/") w Expo Go zwraca exp://IP:8081/--/, w buildzie: kino://
  prefixes: [Linking.createURL("/"), "kino://", "https://kino.example.com"],
  config: {
    // Struktura odpowiada zagnieżdżeniu nawigatorów
    screens: {
      Welcome: "welcome",
      SignIn: "login",
      Main: {
        screens: {
          HomeTabs: {
            screens: {
              RepertoireTab: {
                screens: {
                  Movies: "movies",
                  MovieDetails: "movie/:movieId",
                  Filters: "filters",
                },
              },
              ScreeningsTab: {
                screens: {
                  Today: "screenings/today",
                  Tomorrow: "screenings/tomorrow",
                  DayAfter: "screenings/day-after",
                },
              },
              TicketsTab: "tickets",
              ProfileTab: "profile",
            },
          },
          Halls: "halls",
          Settings: "settings",
          About: "about",
        },
      },
      SeatSelection: "booking/:screeningId",
      TicketDetails: "ticket/:ticketId",
      Trailer: "trailer/:movieId",
      NotFound: "*", // każdy nieznany adres
    },
  },
};
