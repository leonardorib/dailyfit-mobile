import { configureFonts, DefaultTheme } from "react-native-paper";

const inputTheme = {
	...DefaultTheme,
	dark: false,
	colors: {
		primary: "#39AFB0",
		text: "#444540",
		placeholder: "#a09e9e",
		background: "#fcfcfc",
	},

	roundess: 0.4,
	fonts: configureFonts({
		default: {
			regular: {
				fontFamily: "Roboto_400Regular",
				fontWeight: "normal",
			},
			medium: {
				fontFamily: "Roboto_500Medium",
				fontWeight: "normal",
			},
			light: {
				fontFamily: "Roboto_400Regular",
				fontWeight: "normal",
			},
			thin: {
				fontFamily: "Roboto_400Regular",
				fontWeight: "normal",
			},
		},
	}),
};

export default inputTheme;
