// src/screens/auth/SignInScreen.tsx – uproszczone logowanie (pełny formularz w W05)
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useAuth } from "@/auth/AuthContext";
import { AppText } from "@/components/AppText";
import type { RootStackScreenProps } from "@/navigation/types";
import { fonts, radius, spacing, useAppTheme } from "@/theme/theme";

export function SignInScreen({ route }: RootStackScreenProps<"SignIn">) {
  const theme = useAppTheme();
  const { signIn } = useAuth();
  // Parametr opcjonalny (np. z deep linku kino://login?email=...)
  const [email, setEmail] = useState(route.params?.email ?? "");
  const canSubmit = email.includes("@");

  return (
    <View style={styles.container}>
      <AppText variant="title">Witaj ponownie</AppText>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        placeholderTextColor={theme.colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[
          styles.input,
          {
            color: theme.colors.text,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          },
        ]}
      />
      <Pressable
        disabled={!canSubmit}
        onPress={() => signIn({ name: email.split("@")[0], email, isGuest: false })}
        style={[styles.button, { backgroundColor: theme.colors.primary }, !canSubmit && styles.dim]}
      >
        <AppText variant="subtitle" color={theme.colors.onPrimary}>
          Zaloguj
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.xl, gap: spacing.lg },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  button: { height: 50, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  dim: { opacity: 0.5 },
});
