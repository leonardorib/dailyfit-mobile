import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 99%;

  margin-top: 5px;
  align-items: center;
  flex-direction: row;
  background-color: #76c7c5;
  padding: 20px 20px 20px 20px;
  border-radius: 8px;
`;

export const shadowStyles = StyleSheet.create({
  headerShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});

export const ContentContainer = styled.View`
  flex: 1;
  margin-left: auto;
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuIcon = styled(Ionicons)`
  margin-right: auto;
`;

export const LogoText = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 25px;
  color: #444540;
`;

export const PageTitle = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 18px;
  color: #444540;
`;
