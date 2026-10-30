// src/components/SeatMap.tsx – plan sali zbudowany wyłącznie z Flexboxa
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Hall } from "@/data/types";
import { seatId } from "@/utils/format";
import { spacing, useAppTheme } from "@/theme/theme";
import { AppText } from "./AppText";

type Props = {
  hall: Hall;
  taken: string[];
  selected: string[];
  onToggle: (seat: string) => void;
  seatSize?: number;
};

export function SeatMap({ hall, taken, selected, onToggle, seatSize = 22 }: Props) {
  const theme = useAppTheme();
  const aisleAfter = Math.floor(hall.seatsPerRow / 2) - 1; // przejście na środku rzędu

  return (
    <View style={styles.container}>
      {/* Ekran: zaokrąglona belka nad salą */}
      <View style={[styles.screen, { borderColor: theme.colors.primary }]} />
      <AppText variant="label" muted style={styles.screenLabel}>
        Ekran
      </AppText>

      {Array.from({ length: hall.rows }, (_, row) => (
        <View key={row} style={styles.row}>
          <AppText variant="caption" muted style={styles.rowLabel}>
            {String.fromCharCode(65 + row)}
          </AppText>
          {Array.from({ length: hall.seatsPerRow }, (_, seat) => {
            const id = seatId(row, seat);
            const isTaken = taken.includes(id);
            const isSelected = selected.includes(id);
            const isVip = hall.vipRows.includes(row);
            const color = isTaken
              ? theme.colors.seatTaken
              : isSelected
                ? theme.colors.primary
                : isVip
                  ? theme.colors.seatVip
                  : theme.colors.seatFree;
            return (
              <Pressable
                key={id}
                disabled={isTaken}
                onPress={() => onToggle(id)}
                hitSlop={2}
                style={seat === aisleAfter ? styles.aisle : undefined}
                accessibilityRole="checkbox"
                accessibilityLabel={`Miejsce ${id}${isVip ? ", VIP" : ""}`}
                accessibilityState={{ checked: isSelected, disabled: isTaken }}
              >
                <MaterialCommunityIcons
                  name={isTaken ? "seat" : isSelected ? "seat" : "seat-outline"}
                  size={seatSize}
                  color={color}
                />
              </Pressable>
            );
          })}
        </View>
      ))}

      <View style={styles.legend}>
        <Legend color={theme.colors.seatFree} label="Wolne" />
        <Legend color={theme.colors.seatVip} label="VIP" />
        <Legend color={theme.colors.primary} label="Wybrane" />
        <Legend color={theme.colors.seatTaken} label="Zajęte" />
      </View>
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <AppText variant="caption" muted>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: 4 },
  screen: {
    width: "80%",
    height: 18,
    borderTopWidth: 4,
    borderTopLeftRadius: 120, // „wygięty” ekran
    borderTopRightRadius: 120,
  },
  screenLabel: { marginBottom: spacing.md },
  row: { flexDirection: "row", alignItems: "center", gap: 2 },
  rowLabel: { width: 18, textAlign: "center" },
  aisle: { marginRight: spacing.md },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap", // na wąskim ekranie legenda przejdzie do nowej linii
    justifyContent: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  legendDot: { width: 12, height: 12, borderRadius: 3 },
});
