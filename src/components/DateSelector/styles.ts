import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

interface ContentContainerProps {
	isEnabled: boolean;
}

export const Container = styled.View`
	width: 98%;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	margin-top: 5px;
	height: 40px;
	background-color: #fff;
	border-radius: 5px;
`;

export const Content = styled.View<ContentContainerProps>`
	background-color: transparent;
	flex: 1;
	flex-direction: row;
	
	${(props) =>
		!props.isEnabled &&
		css`
		opacity: 0.6;
    `}
`

export const ArrowRightButton = styled(RectButton)`
	width: auto;
	flex: 1;
	align-items: center;
`;

export const ArrowLeftButton = styled(RectButton)`
	width: auto;
	flex: 1;
	align-items: center;
`;

export const DateText = styled.Text`
	margin-right: 8px;
	font-size: 18px;
	font-family: "Roboto_400Regular";
	color: #444540;
`;

export const SelectedDateContainer = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	width: 150px;
	justify-content: center;
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
