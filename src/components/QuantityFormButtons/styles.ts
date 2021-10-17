import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const ContainerTouchable = styled.TouchableWithoutFeedback`
	flex: 1;
	width: 100%;
	height: 100%;
`;

export const Container = styled.View`
	width: 100%;
	justify-content: center;
	flex-direction: row;
	margin-top: auto;
`;

export const Button = styled(RectButton)`
	background-color: #76c7c5;
	width: 100px;
	height: 40px;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	margin-bottom: 15px;
	margin-left: 20px;
	margin-right: 20px;
`;

export const ButtonText = styled.Text`
	font-family: Roboto_700Bold;
	color: #fff;
	font-size: 16px;
`;
