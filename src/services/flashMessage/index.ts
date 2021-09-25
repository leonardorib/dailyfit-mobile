import { showMessage } from "react-native-flash-message";

export const showError = (message: string, duration = 3000) => {
	showMessage({
		position: "top",
		message: message,
		type: "danger",
		duration,
	});
}

export const showSuccess = (message: string, duration = 3000) => {
	showMessage({
		position: "top",
		message: message,
		type: "success",
		duration,
	});
}