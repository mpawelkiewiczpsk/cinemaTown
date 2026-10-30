// src/theme/theme.ts – jedno źródło kolorów, odstępów i typografii
import { useColorScheme } from "react-native";

const brand = {
  primary: "#E50914", // czerwień kinowa
  primaryDark: "#B20710",
  gold: "#F5C518", // gwiazdki ocen
  success: "#2E9E5B",
  warning: "#F59E0B",
  danger: "#DC2626",
  info: "#2563EB",
};

export const lightTheme = {
  dark: false,
  colors: {
    ...brand,
    background: "#F6F6F8",
    surface: "#FFFFFF",
    surfaceAlt: "#EEEEF2",
    border: "#E2E2E8",
    text: "#14141A",
    textMuted: "#5E5E6B",
    onPrimary: "#FFFFFF",
    seatFree: "#D4D4DC",
    seatTaken: "#7A7A86",
    seatVip: "#C9A227",
  },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    ...brand,
    background: "#0E0E12",
    surface: "#1A1A21",
    surfaceAlt: "#24242D",
    border: "#2E2E38",
    text: "#F4F4F6",
    textMuted: "#A3A3B2",
    onPrimary: "#FFFFFF",
    seatFree: "#3A3A46",
    seatTaken: "#6B6B78",
    seatVip: "#B8921E",
  },
};

export type AppTheme = typeof lightTheme;

// Skala odstępów – zamiast „magicznych liczb” w stylach
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;

// Każda grubość kroju to osobna rodzina (na Androidzie fontWeight nie działa z własnymi fontami)
export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  black: "Inter_900Black",
} as const;

// Motyw zależny od ustawień systemu (jasny / ciemny)
export function useAppTheme(): AppTheme {
  const scheme = useColorScheme();
  return scheme === "dark" ? darkTheme : lightTheme;
}
