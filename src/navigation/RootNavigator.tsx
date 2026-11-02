// src/navigation/RootNavigator.tsx – kontener nawigacji + główny Stack z ochroną tras
import { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/auth/AuthContext";
import { useAppTheme } from "@/theme/theme";
import { linking } from "./linking";
import { navigationRef } from "./navigationRef";
import { toNavigationTheme } from "./navTheme";
import { MainDrawer } from "./MainDrawer";
import type { RootStackParamList } from "./types";
import { WelcomeScreen } from "@/screens/auth/WelcomeScreen";
import { SignInScreen } from "@/screens/auth/SignInScreen";
import { SeatSelectionScreen } from "@/screens/booking/SeatSelectionScreen";
import { TrailerScreen } from "@/screens/movies/TrailerScreen";
import { TicketDetailsScreen } from "@/screens/tickets/TicketDetailsScreen";
import { NotFoundScreen } from "@/screens/NotFoundScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const theme = useAppTheme();
  const { user } = useAuth();
  const routeNameRef = useRef<string | undefined>(undefined);

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={toNavigationTheme(theme)}
      linking={linking}
      fallback={<ActivityIndicator style={{ flex: 1 }} />} // podczas obsługi deep linku
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      // Śledzenie ekranów – podstawa analityki (rozwijamy w W09)
      onStateChange={() => {
        const current = navigationRef.getCurrentRoute()?.name;
        if (current && current !== routeNameRef.current) {
          console.log(`[nawigacja] ${routeNameRef.current} -> ${current}`);
        }
        routeNameRef.current = current;
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerTintColor: theme.colors.primary,
          headerBackButtonDisplayMode: "minimal", // iOS: sama strzałka, bez tekstu
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        {user === null ? (
          // Niezalogowany: istnieją tylko ekrany logowania (guard przez renderowanie warunkowe)
          <Stack.Group
            screenOptions={{ headerShown: false, animation: "fade" }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: true,
                title: "Logowanie",
                animation: "slide_from_right",
              }}
            />
          </Stack.Group>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainDrawer}
              options={{ headerShown: false }}
            />
            {/* Grupa modalna: ekran nasuwa się od dołu */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name="SeatSelection"
                component={SeatSelectionScreen}
                options={{ title: "Wybór miejsc", gestureEnabled: false }}
              />
            </Stack.Group>
            <Stack.Screen
              name="TicketDetails"
              component={TicketDetailsScreen}
              // Tytuł zależny od parametru trasy
              options={({ route }) => ({
                title: `Bilet ${route.params.ticketId}`,
              })}
            />
            {/* Przezroczysty modal: poprzedni ekran prześwituje pod spodem */}
            <Stack.Screen
              name="Trailer"
              component={TrailerScreen}
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
              }}
            />
          </>
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Nie znaleziono" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
