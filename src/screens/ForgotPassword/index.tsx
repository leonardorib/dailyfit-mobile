import React, { useState } from "react";
import { Keyboard, Platform, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logoImg from "../../assets/logo.png";
import inputTheme from "../../themes/inputTheme";

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
};

const forgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email("Digite um email válido")
		.required("E-mail obrigatório"),
});

export const ForgotPassword: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { control, handleSubmit, errors } = useForm<FormData>({
		resolver: yupResolver(forgotPasswordSchema),
	});

	const navigation = useNavigation();

	const onSubmit = async (formData: FormData) => {
		if (loading) {
			return;
		}
		setLoading(true);
		try {
			await api.users.forgotPassword(formData);
			showSuccess(
				"Solicitação enviada com sucesso. Cheque a sua caixa de e-mails."
			);
			navigation.navigate("ResetPassword");
		} catch (e) {
			console.log(e);
			showError("Erro ao enviar email de recuperação");
		} finally {
			setLoading(false);
		}
	};

	return (
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
							<LogoImage source={logoImg} resizeMode="contain" />
							<LogoText>
								daily
								<Text style={{ color: "#76C7C5" }}>Fit</Text>
							</LogoText>

							<Title>Esqueci minha senha</Title>

							<BaseText>
								Informe o e-mail utilizado no cadastro e em
								instantes enviaremos um token de recuperação de
								senha.
							</BaseText>

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
								<ErrorText>{errors.email?.message}</ErrorText>
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
										navigation.navigate("ResetPassword");
									}}
								>
									<Feather
										name="lock"
										size={24}
										color="#9CA9A7"
									/>
									<LinkText>Já possuo um token</LinkText>
								</LinkButton>
							</LinksContainer>
						</ContentContainer>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
