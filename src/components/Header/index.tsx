import React, { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Menu, Divider, Provider } from "react-native-paper";

import AuthContext from "../../contexts/auth";

import {
  Container,
  TextContainer,
  WelcomeText,
  UserNameText,
  MenuButton,
  MenuIcon,
} from "./styles";

const Header: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const { user, handleSignOut } = useContext(AuthContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <Container>
        <TextContainer>
          <WelcomeText>Bem vindo,</WelcomeText>
          <UserNameText>
            {`${user?.firstName} ${user?.lastName}!  ;)`}
          </UserNameText>
        </TextContainer>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <MenuButton onPress={openMenu}>
              <MenuIcon name="ios-menu" size={40} color="black" />
            </MenuButton>
          }
        >
          <Menu.Item
            onPress={() => {
              // Later will go to edit profile page
              console.log("Alterar dados");
            }}
            title="Alterar dados"
            icon="account"
          />
          <Divider />
          <Menu.Item onPress={handleSignOut} title="Sair" icon="logout">
            <MenuIcon name="ios-menu" size={40} color="black" />
          </Menu.Item>
        </Menu>
      </Container>
    </Provider>
  );
};

export default Header;
