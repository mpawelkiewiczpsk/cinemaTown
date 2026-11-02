// src/screens/NotFoundScreen.tsx – nieznany deep link
import { Pressable, StyleSheet, View } from "react-native";
import { useAuth } from "@/auth/AuthContext";
import { AppText } from "@/components/AppText";
import { EmptyState } from "@/components/EmptyState";
import type { RootStackScreenProps } from "@/navigation/types";
import { spacing, useAppTheme } from "@/theme/theme";

export function NotFoundScreen({ navigation }: RootStackScreenProps<"NotFound">) {
  const theme = useAppTheme();
  const { user } = useAuth();
  // Dostępne ekrany zależą od stanu logowania (guard w RootNavigator)
  const goHome = () => (user ? navigation.navigate("Main") : navigation.navigate("Welcome"));
  return (
    <View style={styles.container}>
      <EmptyState
        icon="help-circle-outline"
        title="Nie ma takiej strony"
        message="Link jest nieprawidłowy."
      />
      <Pressable onPress={() => (navigation.canGoBack() ? navigation.goBack() : goHome())}>
        <AppText color={theme.colors.primary}>Wróć</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg },
});
