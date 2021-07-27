import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import { DailyDiet, Profile, EditMeal } from "../pages";
import { Drawer as CustomDrawer } from "../components";

const PrivateRoutesDrawer = createDrawerNavigator();
const DietRoutesStack = createStackNavigator();

const DietRoutes: React.FC = () => (
	<DietRoutesStack.Navigator
		screenOptions={{
			headerShown: false,
		}}
		initialRouteName="DailyDiet"
	>
		<DietRoutesStack.Screen name="DailyDiet" component={DailyDiet} />
		<DietRoutesStack.Screen name="EditMeal" component={EditMeal} />
	</DietRoutesStack.Navigator>
);

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
			<PrivateRoutesDrawer.Screen
				name="DailyDiet"
				component={DietRoutes}
			/>

			<PrivateRoutesDrawer.Screen name="Profile" component={Profile} />
		</PrivateRoutesDrawer.Navigator>
	);
};

export default PrivateRoutes;
