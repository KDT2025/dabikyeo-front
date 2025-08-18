import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    SpaceMono: require("./src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return <ThemeProvider value={DefaultTheme}>{children}</ThemeProvider>;
}
