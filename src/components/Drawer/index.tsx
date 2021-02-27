import React, { useContext } from "react";
import { Text, Button } from "react-native";
import {
  DrawerItemList,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import AuthContext from "../../contexts/auth";

import { Container, Header, WelcomeText, UserNameText } from "./styles";

const Drawer: React.FC<DrawerContentComponentProps> = ({
  ...props
}: DrawerContentComponentProps) => {
  const { user, handleSignOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView>
      <Container>
        <Header>
          <WelcomeText>Olá,</WelcomeText>
          <UserNameText>{user?.firstName} ! ;)</UserNameText>
        </Header>
        <DrawerItemList {...props} />
        <Button title="Sair" onPress={handleSignOut} />
      </Container>
    </DrawerContentScrollView>
  );
};

export default Drawer;
