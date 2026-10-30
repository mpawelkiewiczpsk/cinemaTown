// App.tsx – etap W02: jeden ekran, widoki przełączane stanem (nawigacja w W03)
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import type { Movie, Screening } from "@/data/types";
import { AppText } from "@/components/AppText";
import { MovieDetailsModal } from "@/components/MovieDetailsModal";
import { SegmentedControl } from "@/components/SegmentedControl";
import { HallView } from "@/screens/HallView";
import { RepertoireView } from "@/screens/RepertoireView";
import { ScreeningsView } from "@/screens/ScreeningsView";
import { spacing, useAppTheme } from "@/theme/theme";

// Ekran startowy (splash) zostaje, dopóki nie załadujemy fontów
SplashScreen.preventAutoHideAsync();

type Tab = "movies" | "screenings" | "hall";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

function Main() {
  const theme = useAppTheme();
  const [tab, setTab] = useState<Tab>("movies");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [screening, setScreening] = useState<Screening | null>(null);

  const openScreening = (s: Screening) => {
    setScreening(s);
    setTab("hall");
  };

  return (
    // Dół obsługuje pasek podsumowania w HallView – tu tylko góra i boki
    <SafeAreaView
      style={[styles.flex, { backgroundColor: theme.colors.background }]}
      edges={["top", "left", "right"]}
    >
      {/* „auto”: ciemne ikony w jasnym motywie, jasne w ciemnym */}
      <StatusBar style="auto" />
      <View style={styles.header}>
        <AppText variant="label" color={theme.colors.primary}>
          Kino Pod Gwiazdami
        </AppText>
        <AppText variant="hero">Co dziś oglądamy?</AppText>
      </View>
      <SegmentedControl<Tab>
        options={[
          { value: "movies", label: "Repertuar" },
          { value: "screenings", label: "Seanse" },
          { value: "hall", label: "Sala" },
        ]}
        value={tab}
        onChange={setTab}
      />
      <View style={styles.flex}>
        {tab === "movies" && <RepertoireView onOpenMovie={setMovie} />}
        {tab === "screenings" && <ScreeningsView onSelectScreening={openScreening} />}
        {tab === "hall" && <HallView key={screening?.id} screening={screening} />}
      </View>
      <MovieDetailsModal movie={movie} onClose={() => setMovie(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: 2 },
});
