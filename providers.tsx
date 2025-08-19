import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/store";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loaded] = useFonts({
    SpaceMono: require("./src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate persistor={persistor}>
            <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
          </PersistGate>
        </QueryClientProvider>
      </Provider>
    </SafeAreaProvider>
  );
}