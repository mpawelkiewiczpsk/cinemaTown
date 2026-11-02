// src/screens/auth/WelcomeScreen.tsx – ekran powitalny (tylko dla niezalogowanych)
import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/auth/AuthContext";
import { AppText } from "@/components/AppText";
import { MOVIES } from "@/data/mockData";
import type { RootStackScreenProps } from "@/navigation/types";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function WelcomeScreen({ navigation }: RootStackScreenProps<"Welcome">) {
  const theme = useAppTheme();
  const { signIn } = useAuth();

  return (
    <View style={styles.flex}>
      <Image source={MOVIES[1].backdropUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient colors={["rgba(0,0,0,0.2)", "#000000"]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={[styles.flex, styles.content]}>
        <AppText variant="label" color={theme.colors.primary}>
          Kino Pod Gwiazdami
        </AppText>
        <AppText variant="hero" color="#FFFFFF">
          Twoje kino w kieszeni
        </AppText>
        <AppText color="#D1D1D6">
          Repertuar, rezerwacje miejsc i bilety – wszystko w jednym miejscu.
        </AppText>
        <Pressable
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate("SignIn")}
        >
          <AppText variant="subtitle" color={theme.colors.onPrimary}>
            Zaloguj się
          </AppText>
        </Pressable>
        {/* Zmiana stanu logowania sama przełączy zestaw ekranów w RootNavigator */}
        <Pressable
          style={[styles.button, styles.ghost]}
          onPress={() => signIn({ name: "Gość", isGuest: true })}
        >
          <AppText variant="subtitle" color="#FFFFFF">
            Kontynuuj jako gość
          </AppText>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { justifyContent: "flex-end", padding: spacing.xl, gap: spacing.md },
  button: {
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  ghost: { borderWidth: 1, borderColor: "rgba(255,255,255,0.4)" },
});
