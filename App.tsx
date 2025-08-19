import * as Linking from "expo-linking";
import React from "react";
import Providers from "./providers";
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  const prefix = Linking.createURL("/");
  console.log("prefix", prefix);

  return (
    <Providers>
      <StackNavigator />
    </Providers>
  );
}