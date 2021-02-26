import React from "react";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";

import { createStackNavigator } from "@react-navigation/stack";

const PublicStack = createStackNavigator();

const PublicRoutes: React.FC = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <PublicStack.Screen name="Login" component={Login} />
      <PublicStack.Screen name="SignUp" component={SignUp} />
    </PublicStack.Navigator>
  );
};

export default PublicRoutes;
