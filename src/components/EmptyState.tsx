// src/components/EmptyState.tsx – komunikat dla pustej listy
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
};

export function EmptyState({ icon = "film-outline", title, message }: Props) {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={48} color={theme.colors.textMuted} />
      <AppText variant="subtitle">{title}</AppText>
      {!!message && (
        <AppText muted style={styles.message}>
          {message}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: spacing.xxl, gap: spacing.sm },
  message: { textAlign: "center" },
});
