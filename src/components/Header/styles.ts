import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 90%;
  display: flex;
  margin-top: 5px;
  align-items: center;
  flex-direction: row;
`;

export const TextContainer = styled.View`
  flex: 1;
  margin-left: auto;
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuIcon = styled(Ionicons)`
  margin-right: auto;
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
