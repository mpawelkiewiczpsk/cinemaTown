// src/screens/drawer/HallsScreen.tsx – lista sal (ekran menu bocznego)
import { FlatList, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HALLS } from "@/data/mockData";
import { AppText } from "@/components/AppText";
import { radius, spacing, useAppTheme } from "@/theme/theme";

export function HallsScreen() {
  const theme = useAppTheme();
  return (
    <FlatList
      data={HALLS}
      keyExtractor={(h) => h.id}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <MaterialCommunityIcons name="theater" size={32} color={theme.colors.primary} />
          <View style={styles.flex}>
            <AppText variant="subtitle">{item.name}</AppText>
            <AppText variant="caption" muted>
              {item.type} · {item.rows} rzędów · {item.rows * item.seatsPerRow} miejsc
            </AppText>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg },
  separator: { height: spacing.sm },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
  },
});
