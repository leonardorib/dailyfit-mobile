import * as yup from "yup";

export const updateProfileSchema = yup.object().shape({
	firstName: yup.string(),
	lastName: yup.string(),
	email: yup.string().email("E-mail inválido"),
	password: yup.string().required("Informe sua senha para atualizar seus dados"),
});