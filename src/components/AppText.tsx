// src/components/AppText.tsx – Text z typografią aplikacji
import { StyleSheet, Text, type TextProps } from "react-native";
import { fonts, useAppTheme } from "@/theme/theme";

type Variant = "hero" | "title" | "subtitle" | "body" | "caption" | "label";

type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
  muted?: boolean;
};

export function AppText({ variant = "body", color, muted, style, ...rest }: AppTextProps) {
  const theme = useAppTheme();
  const textColor = color ?? (muted ? theme.colors.textMuted : theme.colors.text);
  // ...rest przekazuje dalej wszystkie propsy Text (numberOfLines, onPress, selectable...)
  return <Text style={[styles[variant], { color: textColor }, style]} {...rest} />;
}

const styles = StyleSheet.create({
  hero: { fontFamily: fonts.black, fontSize: 30, lineHeight: 36 },
  title: { fontFamily: fonts.bold, fontSize: 22, lineHeight: 28 },
  subtitle: { fontFamily: fonts.semibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16 },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
});
