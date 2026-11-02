// src/components/SegmentedControl.tsx – przełącznik widoków (do W03 zastępuje nawigację)
import { Pressable, StyleSheet, View } from "react-native";
import { radius, spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

// Komponent generyczny: T to unia dozwolonych wartości (np. "movies" | "screenings")
export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  const theme = useAppTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.surfaceAlt }]}
      accessibilityRole="tablist"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.segment, active && { backgroundColor: theme.colors.surface }]}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <AppText variant="caption" color={active ? theme.colors.text : theme.colors.textMuted}>
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 3,
    borderRadius: radius.md,
    marginHorizontal: spacing.lg,
  },
  segment: {
    flex: 1, // każdy segment zajmuje równą część szerokości
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
});
