// src/screens/profile/ProfileScreen.tsx – profil + przykłady nawigacji między nawigatorami
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useAuth } from "@/auth/AuthContext";
import { AppText } from "@/components/AppText";
import type { TabScreenProps } from "@/navigation/types";
import { useTickets } from "@/state/TicketsContext";
import { radius, spacing, useAppTheme } from "@/theme/theme";

type IconName = keyof typeof Ionicons.glyphMap;

export function ProfileScreen({ navigation }: TabScreenProps<"ProfileTab">) {
  const theme = useAppTheme();
  const { user, signOut } = useAuth();
  const { tickets } = useTickets();

  const items: { icon: IconName; label: string; onPress: () => void }[] = [
    // Inna zakładka tego samego nawigatora
    {
      icon: "ticket-outline",
      label: `Moje bilety (${tickets.length})`,
      onPress: () => navigation.navigate("TicketsTab"),
    },
    // Ekran nawigatora nadrzędnego (Drawer) – navigate przechodzi w górę drzewa
    {
      icon: "settings-outline",
      label: "Ustawienia",
      onPress: () => navigation.navigate("Settings"),
    },
    // Akcja nawigatora nadrzędnego wysłana przez dispatch
    {
      icon: "menu-outline",
      label: "Otwórz menu",
      onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
    },
    // Zagnieżdżony ekran w innej zakładce
    {
      icon: "calendar-outline",
      label: "Jutrzejsze seanse",
      onPress: () =>
        navigation.navigate("ScreeningsTab", { screen: "Tomorrow", params: { dayOffset: 1 } }),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <AppText variant="hero" color={theme.colors.onPrimary}>
            {user?.name.charAt(0).toUpperCase()}
          </AppText>
        </View>
        <AppText variant="title">{user?.name}</AppText>
        <AppText muted>{user?.isGuest ? "Konto gościa" : user?.email}</AppText>
      </View>
      {items.map((item) => (
        <Pressable
          key={item.label}
          onPress={item.onPress}
          style={[styles.item, { backgroundColor: theme.colors.surface }]}
        >
          <Ionicons name={item.icon} size={22} color={theme.colors.primary} />
          <AppText style={styles.flex}>{item.label}</AppText>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.textMuted} />
        </Pressable>
      ))}
      {/* Wylogowanie zmienia stan -> RootNavigator usuwa ekrany aplikacji */}
      <Pressable onPress={signOut} style={[styles.item, { backgroundColor: theme.colors.surface }]}>
        <Ionicons name="log-out-outline" size={22} color={theme.colors.danger} />
        <AppText color={theme.colors.danger}>Wyloguj</AppText>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.sm },
  header: { alignItems: "center", gap: 4, marginBottom: spacing.lg },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
});
