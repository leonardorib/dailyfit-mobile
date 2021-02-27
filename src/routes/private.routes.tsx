import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import DailyDiet from "../pages/DailyDiet";
import Profile from "../pages/Profile";
import CustomDrawer from "../components/Drawer";
import { DrawerHeaderProps } from "@react-navigation/drawer/lib/typescript/src/types";
import Header from "../components/Header";

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
      <PrivateRoutesDrawer.Screen name="DailyDiet" component={DailyDiet} />
      <PrivateRoutesDrawer.Screen name="Profile" component={Profile} />
    </PrivateRoutesDrawer.Navigator>
  );
};

export default PrivateRoutes;
