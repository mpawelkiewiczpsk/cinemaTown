// src/navigation/HomeTabs.tsx – dolne zakładki
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useTickets } from "@/state/TicketsContext";
import { useAppTheme } from "@/theme/theme";
import { RepertoireStack } from "./RepertoireStack";
import { ScreeningsTopTabs } from "./ScreeningsTopTabs";
import type { TabParamList } from "./types";
import { TicketsScreen } from "@/screens/tickets/TicketsScreen";
import { ProfileScreen } from "@/screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator<TabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;
const ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
  RepertoireTab: ["film", "film-outline"],
  ScreeningsTab: ["calendar", "calendar-outline"],
  TicketsTab: ["ticket", "ticket-outline"],
  ProfileTab: ["person-circle", "person-circle-outline"],
};

export function HomeTabs() {
  const theme = useAppTheme();
  const { tickets } = useTickets();

  return (
    <Tab.Navigator
      backBehavior="history" // „wstecz” wraca do poprzednio odwiedzonej zakładki
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const [active, inactive] = ICONS[route.name];
          return <Ionicons name={focused ? active : inactive} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarHideOnKeyboard: true, // Android: pasek znika, gdy pojawia się klawiatura
        animation: "shift", // animacja przy przełączaniu zakładek
        headerLeft: () => <DrawerToggleButton tintColor={theme.colors.primary} />,
      })}
      // Nasłuchiwanie zdarzeń wszystkich zakładek
      screenListeners={{
        tabPress: (e) => console.log("[zakładka]", e.target),
      }}
    >
      <Tab.Screen
        name="RepertoireTab"
        component={RepertoireStack}
        options={{
          title: "Repertuar",
          headerShown: false, // nagłówek pochodzi z zagnieżdżonego Stacka
          popToTopOnBlur: true, // po opuszczeniu zakładki wraca do listy filmów
        }}
      />
      <Tab.Screen
        name="ScreeningsTab"
        component={ScreeningsTopTabs}
        options={{ title: "Seanse" }}
      />
      <Tab.Screen
        name="TicketsTab"
        component={TicketsScreen}
        options={{
          title: "Bilety",
          tabBarBadge: tickets.length > 0 ? tickets.length : undefined,
        }}
        // Zdarzenie tylko dla tej zakładki – można je anulować
        listeners={{
          tabPress: (e) => {
            if (tickets.length === 0) {
              e.preventDefault();
              Alert.alert("Brak biletów", "Kup pierwszy bilet w zakładce Seanse.");
            }
          },
        }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ title: "Profil" }} />
    </Tab.Navigator>
  );
}
