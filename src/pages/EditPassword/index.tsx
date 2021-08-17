import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Platform, Keyboard, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import AuthContext from "../../contexts/auth";
import api from "../../services/api";
import { showError, showSuccess } from "../../services/flashMessage";
import { Header } from "../../components";
import inputTheme from "../utils/inputTheme";
import { updatePasswordSchema } from "./validation";
import {
	SafeAreaView,
	ContentContainer,
	Input,
	ErrorText,
	Title,
	Button,
	ButtonText,
	LinkButton,
	LinkButtonText,
	KeyboardAvoidingView,
	ScrollView,
	TouchableWithoutFeedback,
} from "./styles";

type FormData = {
	password: string;
	newPassword: string;
	newPasswordConfirmation: string;
};

export const EditPassword: React.FC = () => {
	const { control, handleSubmit, errors, clearErrors } = useForm<FormData>({
		resolver: yupResolver(updatePasswordSchema),
		mode: "onSubmit",
	});

	const [isLoading, setIsLoading] = useState(false);

	const { updateLocalUser } = useContext(AuthContext);

	const navigation = useNavigation();

	const resetFields = () => {
		const { setValue } = control;
		clearErrors();
		setValue("password", "");
		setValue("newPassword", "");
		setValue("newPasswordConfirmation", "");
	};

	const onSubmit = async (formData: FormData) => {
		if (isLoading) {
			return;
		}
		setIsLoading(true);
		try {
			const response = await api.users.updatePassword(formData);
			const user = response.data;
			await updateLocalUser(user);
			resetFields();
			showSuccess("Senha atualizada");
		} catch (e) {
			showError(
				e.response.data.message ||
					e.message ||
					"Erro ao atualizar senha"
			);
		} finally {
			setIsLoading(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			resetFields();
		}, [])
	);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<Header />
				<Title>Alterar senha</Title>
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
							<Controller
								control={control}
								defaultValue=""
								name="password"
								render={({ onChange, value }) => {
									return (
										<Input
											label="Informe sua senha atual"
											mode="outlined"
											autoCapitalize="none"
											theme={inputTheme}
											value={value}
											secureTextEntry={true}
											onChangeText={(value) =>
												onChange(value)
											}
											error={!!errors.password?.message}
										/>
									);
								}}
							/>
							{errors.password?.message ? (
								<ErrorText>
									{errors.password?.message}
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
											label="Confirme sua nova senha"
											mode="outlined"
											autoCapitalize="none"
											theme={inputTheme}
											value={value}
											secureTextEntry={true}
											onChangeText={(value) =>
												onChange(value)
											}
											error={
												!!errors.newPasswordConfirmation
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
								enabled={!isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="white" />
								) : (
									<ButtonText>Salvar</ButtonText>
								)}
							</Button>

							<LinkButton
								onPress={() => {
									navigation.navigate("DailyDiet");
								}}
							>
								<Feather
									name="arrow-left"
									size={24}
									color="#9CA9A7"
								/>
								<LinkButtonText>
									Voltar para dieta
								</LinkButtonText>
							</LinkButton>
						</ContentContainer>
					</TouchableWithoutFeedback>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
