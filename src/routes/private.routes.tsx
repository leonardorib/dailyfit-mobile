import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DailyDiet from "../pages/DailyDiet";
import Profile from "../pages/Profile";
import CustomDrawer from "../components/Drawer";

const PrivateRoutesDrawer = createDrawerNavigator();

const PrivateRoutes: React.FC = () => {
  return (
    <PrivateRoutesDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DailyDiet"
      drawerPosition="right"
      drawerContent={(props) => {
        return <CustomDrawer {...props} />;
      }}
    >
      <PrivateRoutesDrawer.Screen name="Sua dieta" component={DailyDiet} />
      <PrivateRoutesDrawer.Screen name="Alterar dados" component={Profile} />
    </PrivateRoutesDrawer.Navigator>
  );
};

export default PrivateRoutes;
