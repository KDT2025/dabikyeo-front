import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Dimensions, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../core/types/RootStackParamList";
import Detail from "./Detail";
import Home from "./Home";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<BottomDrawerParamList>();

const DrawerMenu = () => {
  const { width } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();

  const { fontScale } = useWindowDimensions();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </>
  );
};

export default DrawerMenu;