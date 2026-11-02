// src/navigation/ScreeningsTopTabs.tsx – górne zakładki (przesuwane gestem) z dniami
import { ActivityIndicator } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { fonts, useAppTheme } from "@/theme/theme";
import type { ScreeningsTopTabParamList } from "./types";
import { ScreeningsDayScreen } from "@/screens/screenings/ScreeningsDayScreen";

const TopTab = createMaterialTopTabNavigator<ScreeningsTopTabParamList>();

export function ScreeningsTopTabs() {
  const theme = useAppTheme();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary, height: 3 },
        tabBarLabelStyle: { fontFamily: fonts.semibold, textTransform: "none" },
        swipeEnabled: true, // przełączanie przesunięciem palca
        lazy: true, // ekran tworzony dopiero przy pierwszym wejściu
        lazyPlaceholder: () => <ActivityIndicator style={{ marginTop: 32 }} />,
      }}
    >
      <TopTab.Screen
        name="Today"
        component={ScreeningsDayScreen}
        initialParams={{ dayOffset: 0 }} // parametr początkowy ekranu
        options={{ title: "Dziś" }}
      />
      <TopTab.Screen
        name="Tomorrow"
        component={ScreeningsDayScreen}
        initialParams={{ dayOffset: 1 }}
        options={{ title: "Jutro" }}
      />
      <TopTab.Screen
        name="DayAfter"
        component={ScreeningsDayScreen}
        initialParams={{ dayOffset: 2 }}
        options={{ title: "Pojutrze" }}
      />
    </TopTab.Navigator>
  );
}
