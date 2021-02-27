import React, { useContext } from "react";
import { Text } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import AuthContext from "../../contexts/auth";

import {
  Container,
  shadowStyles,
  ContentContainer,
  LogoText,
  MenuButton,
  MenuIcon,
} from "./styles";

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);

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

export default Header;
