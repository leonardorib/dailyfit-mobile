import React, { useContext } from "react";
import {
	DrawerItemList,
	DrawerContentComponentProps,
	DrawerContentScrollView,
	DrawerItem,
} from "@react-navigation/drawer";

import AuthContext from "../../contexts/auth";

import { Container, Header, WelcomeText, UserNameText } from "./styles";

export const Drawer: React.FC<DrawerContentComponentProps> = ({
	...props
}: DrawerContentComponentProps) => {
	const { user, handleSignOut } = useContext(AuthContext);

	return (
		<DrawerContentScrollView>
			<Container>
				<Header>
					<WelcomeText>Olá,</WelcomeText>
					<UserNameText>{`${user?.firstName} ! ;)`}</UserNameText>
				</Header>
				<DrawerItemList
					{...props}
					activeTintColor="#329899"
					labelStyle={{fontWeight: "700"}}
				/>
				<DrawerItem
					label="Sair"
					onPress={handleSignOut}
					activeTintColor="#329899"
					labelStyle={{fontWeight: "700"}}
				/>
			</Container>
		</DrawerContentScrollView>
	);
};
