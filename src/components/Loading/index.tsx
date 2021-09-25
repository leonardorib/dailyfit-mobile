import React from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import { Container } from "./styles";

interface IProps {
	variant?: "white" | "green";
	containerStyle?: StyleProp<ViewStyle>;
}

export const Loading: React.FC<IProps> = (props) => {
	const { variant, containerStyle } = props;
	return (
		<Container style={containerStyle} >
			<ActivityIndicator color={variant === "white" ? "#fff" : "#76c7c5"} />
		</Container>
	);
};
