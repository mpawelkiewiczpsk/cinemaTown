// src/screens/drawer/SettingsScreen.tsx – ustawienia (działające opcje dodamy w W04)
import { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { AppText } from "@/components/AppText";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function SettingsScreen() {
  const theme = useAppTheme();
  const [reminders, setReminders] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Row label="Przypomnienia o seansach" value={reminders} onChange={setReminders} />
        <Row label="Newsletter z premierami" value={newsletter} onChange={setNewsletter} />
      </View>
      <AppText variant="caption" muted>
        Motyw, ulubione i trwały zapis ustawień – w W04.
      </AppText>
    </ScrollView>
  );
}

function Row({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <AppText style={styles.flex}>{label}</AppText>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg, gap: spacing.md },
  card: { borderRadius: radius.md, paddingHorizontal: spacing.lg },
  row: { flexDirection: "row", alignItems: "center", minHeight: 56, gap: spacing.md },
});
