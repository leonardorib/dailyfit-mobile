import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { RectButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

interface IDietContainerProps {
	visible: boolean;
}

export const SafeAreaView = styled.SafeAreaView`
	flex: 1;
	margin-top: ${getStatusBarHeight()}px;
	align-items: center;
	width: 100%;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
	flex: 1;
	width: 100%;
	align-items: center;
`;

export const ScrollView = styled.ScrollView`
	width: 100%;
	flex: 1;
	height: 100%;
`;

export const Container = styled.View`
	flex: 1;
	width: 100%;
	align-items: center;
`;

export const DietContainer = styled.View<IDietContainerProps>`
	flex: 1;
	width: 100%;
	align-items: center;

	${(props) =>
		!props.visible &&
		css`
		display: none;
    `}
`;

export const AddMealButton = styled(RectButton)`
	flex-direction: row;
	background-color: #fff;
	width: 280px;
	height: 65px;
	margin-bottom: 10px;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	position: absolute;
	align-self: center;
	bottom: 0;
`;

export const AddMealButtonText = styled.Text`
	font-size: 18px;
	font-family: Roboto_700Bold;
	color: #76c7c5;
	margin-left: 20px;
`;

export const AddMealModalInnerView = styled.KeyboardAvoidingView`
	background-color: #fff;
	width: 90%;
	align-items: center;
	height: 200px;
	border-radius: 10px;
	align-self: center;
	margin-bottom: 30px;
`;

export const AddMealModalText = styled.Text`
	font-size: 18px;
	font-family: Roboto_700Bold;
	color: #444540;
	margin-top: 20px;
`;

export const AddMealModalInput = styled.TextInput`
	width: 90%;
	margin-top: 20px;
	height: 40px;
	background-color: #d3d3d3;
	border: 1px #444540;
	border-radius: 5px;
	background-color: #fff;
	padding: 0 8px 0 8px;
	font-size: 16px;
	font-family: Roboto_400Regular;
	color: #444540;
`;

export const ErrorText = styled.Text`
	margin-top: 5px;
	margin-bottom: -18px;
	font-size: 14px;
	color: #444540;
`;

export const AddMealModalButtonsView = styled.View`
	margin-top: 30px;
	flex-direction: row;
	justify-content: center;
	width: 100%;
`;

export const AddMealModalButton = styled(RectButton)`
	background-color: #76c7c5;
	width: 100px;
	height: 40px;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	margin: 0 10px 0 10px;
`;

export const AddMealModalButtonText = styled.Text`
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
