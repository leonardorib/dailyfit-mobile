import { showMessage } from "react-native-flash-message";

export const showError = (message: string) => {
	showMessage({
		position: "top",
		message: message,
		type: "danger",
	});
}

export const showSuccess = (message: string) => {
	showMessage({
		position: "top",
		message: message,
		type: "success",
	});
}