import React from "react";
import DailyDiet from "../pages/DailyDiet";

import { createStackNavigator } from "@react-navigation/stack";

const PrivateStack = createStackNavigator();

const PrivateRoutes: React.FC = () => {
  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <PrivateStack.Screen name="DailyDiet" component={DailyDiet} />
    </PrivateStack.Navigator>
  );
};

export default PrivateRoutes;
