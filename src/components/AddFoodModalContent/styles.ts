import styled, { css } from "styled-components/native";
import { Searchbar } from "react-native-paper";
import { RectButton } from "react-native-gesture-handler";
import { StyleSheet, Dimensions } from "react-native";

interface FoodContainerProps {
  isSelected: boolean;
}

export const Container = styled.View`
  align-items: center;
  background-color: #e5e5e5;
  min-height: 400px;
  max-height: 95%;
`;

export const SearchInput = styled(Searchbar)`
  margin-top: 20px;
  width: 95%;
  margin-bottom: 10px;
`;

export const SelectFoodText = styled.Text`
  font-family: Roboto_700Bold;
  font-size: 18px;
  margin-right: auto;
  margin-left: 25px;
  margin-bottom: 10px;
`;

export const FoodContainer = styled(RectButton)<FoodContainerProps>`
  height: 40px;
  margin-bottom: 8px;
  justify-content: center;
  background-color: #fff;
  width: ${Dimensions.get("window").width
    ? Math.round(0.85 * Dimensions.get("window").width)
    : 320}px;

  border-radius: 5px;
  background-color: #fff;

  ${(props) =>
    props.isSelected &&
    css`
      background-color: #76c7c5;
      transform: scale(0.97);
    `}
`;

export const FoodName = styled.Text<FoodContainerProps>`
  font-size: 16px;
  margin-left: 20px;
  color: #444540;

  ${(props) =>
    props.isSelected &&
    css`
      color: #fff;
      font-family: Roboto_700Bold;
    `}
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

export const shadowStyles = StyleSheet.create({
  style: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
