import React from "react";
import { StatusBar } from "expo-status-bar";
import Constants from 'expo-constants';
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import {
	DefaultTheme,
	Provider as PaperProvider,
} from "react-native-paper";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";

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
      <AuthProvider>
	    <PaperProvider theme={DefaultTheme}>
          <Routes />
          <StatusBar style="dark" />
	    </PaperProvider>
      </AuthProvider>
	  <FlashMessage
		position="top"
		floating
		statusBarHeight={Constants.statusBarHeight}
	  />
    </NavigationContainer>
  );
}
