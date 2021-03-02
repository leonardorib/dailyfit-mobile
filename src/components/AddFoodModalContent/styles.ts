import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  align-items: center;
  height: 90%;

  background-color: #fff;
`;

export const SearchInput = styled(Searchbar)`
  margin-top: 20px;
  width: 90%;
`;

export const ModalButton = styled(RectButton)`
  background-color: #76c7c5;
  width: 100px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-top: auto;
  margin-bottom: 15px;
`;

export const ModalButtonText = styled.Text`
  font-family: Roboto_700Bold;
  color: #fff;
  font-size: 16px;
`;
