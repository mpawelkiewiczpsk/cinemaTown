// src/screens/drawer/AboutScreen.tsx – informacje + linki wychodzące (Linking)
import { Alert, Linking, Pressable, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ExpoLinking from "expo-linking";
import { AppText } from "@/components/AppText";
import { radius, spacing, useAppTheme } from "@/theme/theme";

type IconName = keyof typeof Ionicons.glyphMap;

export function AboutScreen() {
  const theme = useAppTheme();

  // Linking.openURL – otwarcie innej aplikacji (przeglądarka, telefon, poczta)
  const open = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) await Linking.openURL(url);
    else Alert.alert("Nie można otworzyć", url);
  };

  const links: { icon: IconName; label: string; url: string }[] = [
    { icon: "globe-outline", label: "Strona kina", url: "https://example.com" },
    { icon: "call-outline", label: "Zadzwoń do kasy", url: "tel:+48123456789" },
    { icon: "mail-outline", label: "Napisz do nas", url: "mailto:kontakt@example.com" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <AppText variant="title">Kino Pod Gwiazdami</AppText>
      <AppText muted>Aplikacja przykładowa do wykładu „Aplikacje mobilne”.</AppText>
      {links.map((l) => (
        <Pressable
          key={l.url}
          onPress={() => open(l.url)}
          style={[styles.item, { backgroundColor: theme.colors.surface }]}
        >
          <Ionicons name={l.icon} size={22} color={theme.colors.primary} />
          <AppText>{l.label}</AppText>
        </Pressable>
      ))}
      <AppText variant="caption" muted selectable>
        Deep link do tego ekranu: {ExpoLinking.createURL("about")}
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg, gap: spacing.md },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
});
