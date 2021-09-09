import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { Container } from "./styles";

interface IProps {
	containerStyle?: StyleProp<ViewStyle>
}

export const Loading: React.FC<IProps> = (props) => {
	const { containerStyle } = props;
	return (
		<Container style={containerStyle} >
			<ActivityIndicator color="#76c7c5" />
		</Container>
	);
};
