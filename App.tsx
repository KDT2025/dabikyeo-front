import * as Linking from 'expo-linking';
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Providers from "./providers";
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const prefix = Linking.createURL('/');
  console.log("prefix", prefix);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Providers>
        <StackNavigator />
      </Providers>
    </GestureHandlerRootView>
  );
}