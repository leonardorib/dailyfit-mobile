import { RectButton } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
	min-height: 80px;
	width: 98%;
	background-color: #fff;
	margin-bottom: 5px;
	border-radius: 8px;
	padding: 10px 20px 15px 20px;
`;

export const NutrientsOutterBox = styled.View`
	margin-top: 10px;
	flex-direction: row;
	width: 100%;
	justify-content: space-evenly;
`;

export const NutrientInnerBox = styled.View`
	align-items: center;
`;

export const NutrientsText = styled.Text`
	font-family: Roboto_400Regular;
	font-size: 14px;
	color: #444540;
`;

export const MealHeader = styled.View`
	flex-direction: row;
	margin-bottom: 5px;
`;

export const MealNameTextContainer = styled.View`
	flex-shrink: 1;
	margin-right: 10px;
`;

export const MealNameText = styled.Text`
	font-size: 18px;
	margin-bottom: 10px;
	font-family: Roboto_700Bold;
	color: #000;
`;

export const ButtonsBox = styled.View`
	flex-direction: row;
	margin-left: auto;
	width: 100px;
`;

export const ActionButton = styled(RectButton)`
	margin-left: auto;
	background-color: #fff;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
	height: 32px;
	width: 32px;
`;

export const QuantityAndCaloriesRow = styled.Text`
	font-size: 16px;
	font-family: Roboto_400Regular;
	color: #444540;
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
