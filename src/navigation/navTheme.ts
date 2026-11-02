// src/navigation/navTheme.ts – motyw React Navigation zbudowany z motywu aplikacji
import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
import { fonts, type AppTheme } from "@/theme/theme";

export function toNavigationTheme(theme: AppTheme): Theme {
  const base = theme.dark ? DarkTheme : DefaultTheme;
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.primary, // aktywne elementy (np. zakładka)
      background: theme.colors.background, // tło ekranów
      card: theme.colors.surface, // nagłówki, pasek zakładek, drawer
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary, // kolor badge
    },
    // W v7 motyw zawiera też fonty używane w nagłówkach i zakładkach
    fonts: {
      regular: { fontFamily: fonts.regular, fontWeight: "400" },
      medium: { fontFamily: fonts.medium, fontWeight: "500" },
      bold: { fontFamily: fonts.bold, fontWeight: "700" },
      heavy: { fontFamily: fonts.black, fontWeight: "900" },
    },
  };
}
