import React from "react";
import { Text } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import {
	Container,
	shadowStyles,
	ContentContainer,
	LogoText,
	MenuButton,
	MenuIcon,
} from "./styles";

export const Header: React.FC = () => {
	const navigation = useNavigation();

	return (
		<Container style={shadowStyles.headerShadow}>
			<ContentContainer>
				<LogoText>
					daily<Text style={{ color: "#fff" }}>Fit</Text>
				</LogoText>
			</ContentContainer>

			<MenuButton
				onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
			>
				<MenuIcon name="ios-menu" size={40} color="black" />
			</MenuButton>
		</Container>
	);
};
