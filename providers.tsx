import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React from 'react';
import { useColorScheme } from './src/hooks/useColorScheme.web';

export default function Providers({ children }: { children: React.ReactNode }) {

    const colorScheme = useColorScheme();
      const [loaded] = useFonts({
        SpaceMono: require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      });
    
      if (!loaded) {
        // Async font loading only occurs in development.
        return null;
      }
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}