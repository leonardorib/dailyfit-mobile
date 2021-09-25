import React, { useState } from "react";
import { Keyboard, Platform, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logoImg from "../../assets/logo.png";
import inputTheme from "../utils/inputTheme";

import {
	SafeAreaView,
	ContentContainer,
	LogoImage,
	Input,
	BaseText,
	ErrorText,
	Title,
	LogoText,
	Button,
	ButtonText,
	LinksContainer,
	LinkButton,
	LinkText,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "./styles";
import api from "../../services/api";
import { showError, showSuccess } from "../../services/flashMessage";
import { Loading } from "../../components";

type FormData = {
	email: string;
	token: string;
	newPassword: string;
	newPasswordConfirmation: string;
};

const resetPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Digite um email válido")
		.required("E-mail obrigatório"),
	token: yup
		.string()
		.min(5, "Informe um token válido")
		.required("Informe um token"),
	newPassword: yup
		.string()
		.min(5, "A senha deve ter no mínimo 5 caracteres")
		.required("Informe uma senha"),
	newPasswordConfirmation: yup
		.string()
		.oneOf([yup.ref("newPassword"), null], "Deve ser igual à senha")
		.required("Confirmação de senha obrigatória"),
});

export const ResetPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { control, handleSubmit, errors } = useForm<FormData>({
		resolver: yupResolver(resetPasswordSchema),
	});

	const navigation = useNavigation();

	const onSubmit = async (formData: FormData) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			await api.users.resetPassword(formData);
			navigation.navigate("Login");
			showSuccess("Senha redefinida com sucesso. Voce já pode efetuar seu login");
		} catch (e) {
			showError("Erro ao redefinir senha. Cheque os dados enviados e tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<PaperProvider theme={DefaultTheme}>
			<SafeAreaView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<ScrollView>
						<TouchableWithoutFeedback
							style={{
								backgroundColor: "#fff",
								flex: 1,
								alignItems: "center",
							}}
							onPress={Keyboard.dismiss}
							accessible={false}
						>
							<ContentContainer>
								<LogoImage
									source={logoImg}
									resizeMode="contain"
								/>
								<LogoText>
									daily
									<Text style={{ color: "#76C7C5" }}>
										Fit
									</Text>
								</LogoText>

								<Title>Redefinir senha</Title>

								<BaseText>Informe o token que você recebeu por e-mail, o e-mail utilizado no cadastro e sua nova senha.{"\n\n"}Caso não tenha recebido o token, não esqueça de checar sua caixa de spam.</BaseText>
								<Controller
									control={control}
									name="token"
									defaultValue=""
									render={({ value, onChange }) => {
										return (
											<Input
												label="Token"
												mode="outlined"
												autoCapitalize="none"
												value={value}
												theme={inputTheme}
												onChangeText={(value) =>
													onChange(value)
												}
												error={!!errors.token?.message}
											/>
										);
									}}
								/>
								{errors.token?.message ? (
									<ErrorText>
										{errors.token?.message}
									</ErrorText>
								) : null}
								<Controller
									control={control}
									name="email"
									defaultValue=""
									render={({ value, onChange }) => {
										return (
											<Input
												label="E-mail"
												mode="outlined"
												autoCapitalize="none"
												value={value}
												theme={inputTheme}
												onChangeText={(value) =>
													onChange(value)
												}
												error={!!errors.email?.message}
											/>
										);
									}}
								/>
								{errors.email?.message ? (
									<ErrorText>
										{errors.email?.message}
									</ErrorText>
								) : null}

								<Controller
									control={control}
									defaultValue=""
									name="newPassword"
									render={({ onChange, value }) => {
										return (
											<Input
												label="Nova senha"
												mode="outlined"
												autoCapitalize="none"
												theme={inputTheme}
												value={value}
												secureTextEntry={true}
												onChangeText={(value) =>
													onChange(value)
												}
												error={
													!!errors.newPassword?.message
												}
											/>
										);
									}}
								/>
								{errors.newPassword?.message ? (
									<ErrorText>
										{errors.newPassword?.message}
									</ErrorText>
								) : null}

								<Controller
									control={control}
									defaultValue=""
									name="newPasswordConfirmation"
									render={({ onChange, value }) => {
										return (
											<Input
												label="Confirmar senha"
												mode="outlined"
												autoCapitalize="none"
												theme={inputTheme}
												value={value}
												secureTextEntry={true}
												onChangeText={(value) =>
													onChange(value)
												}
												error={
													!!errors
														.newPasswordConfirmation
														?.message
												}
											/>
										);
									}}
								/>
								{errors.newPasswordConfirmation?.message ? (
									<ErrorText>
										{errors.newPasswordConfirmation?.message}
									</ErrorText>
								) : null}

								<Button
									onPress={() => {
										handleSubmit(onSubmit)();
									}}
								>
									{loading ? (
										<Loading variant="white" />
									) : (
										<ButtonText>Enviar</ButtonText>
									)}
								</Button>
								<LinksContainer>
									<LinkButton
										onPress={() => {
											navigation.navigate("Login");
										}}
									>
										<Feather
											name="arrow-left"
											size={24}
											color="#9CA9A7"
										/>
										<LinkText>Voltar para o login</LinkText>
									</LinkButton>

									<LinkButton
										onPress={() => {
											navigation.navigate("ForgotPassword");
										}}
									>
										<Feather
											name="lock"
											size={24}
											color="#9CA9A7"
										/>
										<LinkText>Ainda não possuo um token</LinkText>
									</LinkButton>
								</LinksContainer>
							</ContentContainer>
						</TouchableWithoutFeedback>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</PaperProvider>
	);
};
