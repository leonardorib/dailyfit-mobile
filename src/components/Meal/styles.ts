import { RectButton } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  min-height: 80px;
  width: 98%;
  background-color: #fff;
  margin-bottom: 5px;
  border-radius: 8px;
  padding: 10px 0 15px;
`;

export const Food = styled.View`
  height: 40px;

  margin-bottom: 10px;
  justify-content: center;
`;

export const MealNameText = styled.Text`
  font-size: 18px;
  margin-left: 20px;
  font-family: Roboto_700Bold;
  color: #000;
`;

export const FoodNameText = styled.Text`
  font-size: 16px;
  margin-left: 20px;
  font-family: Roboto_400Regular;
  color: #444540;
`;

export const FoodDescription = styled.Text`
  font-size: 14px;
  margin-left: 20px;
  font-family: Roboto_400Regular;
  color: #444540;
`;

export const AddFoodButton = styled(RectButton)`
  justify-content: center;
  height: 30px;
  margin-left: 10px;
`;

export const AddFoodText = styled.Text`
  font-family: Roboto_700Bold;
  margin-left: 20px;
  font-size: 16px;
  color: #76c7c5;
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
