import { StyleSheet } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
	background-color: #fff;
	align-items: center;
	justify-content: center;
	width: 98%;
	border-radius: 5px;
	padding: 12px 0 12px 0;
	margin-top: 5px;
	margin-bottom: 8px;
`;

export const TotalConsumptionTitle = styled.Text`
	font-family: Roboto_700Bold;
	font-size: 18px;
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
