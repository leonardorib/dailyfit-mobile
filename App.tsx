import { StatusBar } from "expo-status-bar";
import React from "react";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Routes />
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
