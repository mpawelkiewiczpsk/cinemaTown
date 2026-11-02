// src/navigation/RepertoireStack.tsx – Stack zagnieżdżony w zakładce „Repertuar”
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useAppTheme } from "@/theme/theme";
import type { RepertoireStackParamList } from "./types";
import { MoviesScreen } from "@/screens/movies/MoviesScreen";
import { MovieDetailsScreen } from "@/screens/movies/MovieDetailsScreen";
import { FiltersScreen } from "@/screens/movies/FiltersScreen";
import { MovieHeaderActions } from "@/components/MovieHeaderActions";

const Stack = createNativeStackNavigator<RepertoireStackParamList>();

export function RepertoireStack() {
  const theme = useAppTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.primary,
        headerBackButtonDisplayMode: "minimal",
        headerTitleAlign: "center", // Android: tytuł na środku (iOS – zawsze)
      }}
    >
      <Stack.Screen
        name="Movies"
        component={MoviesScreen}
        options={{
          title: "Repertuar",
          headerLargeTitle: true, // iOS: duży tytuł zwijany przy przewijaniu
          headerLeft: () => <DrawerToggleButton tintColor={theme.colors.primary} />,
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetailsScreen}
        // Unikalny identyfikator: kolejny film to nowy ekran, nie aktualizacja parametrów
        getId={({ params }) => params.movieId}
        // options jako funkcja – dostęp do route (parametrów ekranu)
        options={({ route }) => ({
          title: "",
          headerTransparent: true, // treść wchodzi pod nagłówek
          headerBlurEffect: "systemChromeMaterial", // iOS: rozmyte tło nagłówka
          headerTintColor: "#FFFFFF",
          headerRight: () => <MovieHeaderActions movieId={route.params.movieId} />,
        })}
      />
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          title: "Filtry",
          presentation: "formSheet", // arkusz od dołu
          sheetAllowedDetents: [0.5, 1], // pół ekranu lub cały ekran
          sheetGrabberVisible: true, // uchwyt do przeciągania
          sheetCornerRadius: 24,
        }}
      />
    </Stack.Navigator>
  );
}
