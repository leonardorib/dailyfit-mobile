import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface IProps {
	height?: number;
}

export const BottomFadeout: React.FC<IProps> = (props) => {
	const { height } = props;
	return (
		<LinearGradient
			style={{
				position: "absolute",
				bottom: 0,
				width: "100%",
				height: height || 65,
			}}
			colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.8)"]}
			pointerEvents={"none"}
		/>
	);
};
