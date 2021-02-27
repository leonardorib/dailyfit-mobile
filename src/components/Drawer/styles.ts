import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  margin-top: ${StatusBar.currentHeight}px;
`;

export const Header = styled.View`
  margin-left: 20px;
  margin-bottom: 20px;
`;

export const WelcomeText = styled.Text`
  font-size: 20px;
  font-family: "Roboto_700Bold";
`;

export const UserNameText = styled.Text`
  font-size: 20px;
  font-family: "Roboto_700Bold";
  color: #329899;
`;
