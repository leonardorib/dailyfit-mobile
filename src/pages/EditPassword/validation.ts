import * as yup from "yup";

export const updatePasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Informe sua senha atual"),
	newPassword: yup
		.string()
		.min(5, "Nova senha deve ter no mínimo 5 caracteres")
		.required("Informe sua nova senha"),
	newPasswordConfirmation: yup
		.string()
		.oneOf(
			[yup.ref("newPassword")],
			"A confirmação deve ser igual à nova senha"
		)
		.required("Confirmação obrigatória"),
});
