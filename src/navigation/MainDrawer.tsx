// src/navigation/MainDrawer.tsx – menu boczne z własną zawartością
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { useAuth } from "@/auth/AuthContext";
import { AppText } from "@/components/AppText";
import { spacing, useAppTheme } from "@/theme/theme";
import { HomeTabs } from "./HomeTabs";
import type { DrawerParamList } from "./types";
import { HallsScreen } from "@/screens/drawer/HallsScreen";
import { SettingsScreen } from "@/screens/drawer/SettingsScreen";
import { AboutScreen } from "@/screens/drawer/AboutScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerContent(props: DrawerContentComponentProps) {
  const theme = useAppTheme();
  const { user, signOut } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
          <AppText variant="title" color={theme.colors.onPrimary}>
            {user?.name.charAt(0).toUpperCase() ?? "?"}
          </AppText>
        </View>
        <AppText variant="subtitle">{user?.name}</AppText>
        <AppText variant="caption" muted>
          {user?.isGuest ? "Gość" : user?.email}
        </AppText>
      </View>
      {/* Standardowe pozycje generowane z ekranów nawigatora */}
      <DrawerItemList {...props} />
      <DrawerItem
        label="Wyloguj"
        icon={({ size }) => (
          <Ionicons name="log-out-outline" size={size} color={theme.colors.danger} />
        )}
        labelStyle={{ color: theme.colors.danger }}
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
}

export function MainDrawer() {
  const theme = useAppTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerType: "front", // „slide” przesuwa też ekran, „permanent” – stałe menu (tablet)
        drawerActiveTintColor: theme.colors.primary,
        drawerActiveBackgroundColor: theme.dark ? "#2A1215" : "#FDECEC",
        swipeEdgeWidth: 40, // obszar przy krawędzi, z którego można wysunąć menu gestem
        headerTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{
          title: "Kino",
          headerShown: false, // nagłówki pokazują zakładki i ich stacki
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Halls"
        component={HallsScreen}
        options={{
          title: "Sale kinowe",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Ustawienia",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: "O aplikacji",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: { padding: spacing.lg, gap: 4 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
});
