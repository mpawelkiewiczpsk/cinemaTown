// src/utils/format.ts – formatowanie przez wbudowane Intl (bez dodatkowych bibliotek)
const timeFmt = new Intl.DateTimeFormat("pl-PL", { hour: "2-digit", minute: "2-digit" });
const dayFmt = new Intl.DateTimeFormat("pl-PL", { weekday: "long", day: "numeric", month: "long" });
const priceFmt = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" });

export const formatTime = (iso: string) => timeFmt.format(new Date(iso));
export const formatPrice = (value: number) => priceFmt.format(value);

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

// „Dziś”, „Jutro” albo pełna data
export function formatDayLabel(iso: string) {
  const date = new Date(iso);
  const today = new Date();
  const diffDays = Math.round(
    (startOfDay(date).getTime() - startOfDay(today).getTime()) / 86_400_000,
  );
  if (diffDays === 0) return "Dziś";
  if (diffDays === 1) return "Jutro";
  return dayFmt.format(date);
}

export function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Oznaczenie miejsca: rząd 0 -> „A”, miejsce 4 -> „A5”
export const seatId = (row: number, seat: number) =>
  `${String.fromCharCode(65 + row)}${seat + 1}`;
