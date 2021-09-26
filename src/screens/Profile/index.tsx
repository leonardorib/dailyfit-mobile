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
import inputTheme from "../../themes/inputTheme";
import { updateProfileSchema } from "./validation";
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
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export const Profile: React.FC = () => {
	const { control, handleSubmit, errors, clearErrors } = useForm<FormData>({
		resolver: yupResolver(updateProfileSchema),
		mode: "all",
	});

	const [isLoading, setIsLoading] = useState(false);

	const { user, updateLocalUser } = useContext(AuthContext);

	const navigation = useNavigation();

	const onSubmit = async (formData: FormData) => {
		if (isLoading) {
			return;
		}
		setIsLoading(true);
		try {
			const response = await api.users.update(formData);
			const user = response.data;
			await updateLocalUser(user);
			control.setValue("password", "");
			showSuccess("Perfil atualizado");
		} catch (e) {
			showError(
				e.response.data.message ||
					e.message ||
					"Erro ao atualizar perfil"
			);
		} finally {
			setIsLoading(false);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			if (isLoading) {
				return;
			}
			setIsLoading(true);
			clearErrors();
			setIsLoading(false);
		}, [])
	);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<Header />
				<Title>Seus dados</Title>
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
								defaultValue={user?.firstName || ""}
								name="firstName"
								render={({ onChange, value }) => {
									return (
										<Input
											label="Nome"
											mode="outlined"
											autoCapitalize="none"
											value={value}
											theme={inputTheme}
											onChangeText={(value) =>
												onChange(value)
											}
											error={!!errors.firstName?.message}
										/>
									);
								}}
							/>

							{errors.firstName?.message ? (
								<ErrorText>
									{errors.firstName?.message}
								</ErrorText>
							) : null}

							<Controller
								control={control}
								defaultValue={user?.lastName || ""}
								name="lastName"
								render={({ onChange, value }) => {
									return (
										<Input
											label="Sobrenome"
											mode="outlined"
											autoCapitalize="none"
											value={value}
											theme={inputTheme}
											onChangeText={(value) =>
												onChange(value)
											}
											error={!!errors.lastName?.message}
										/>
									);
								}}
							/>
							{errors.lastName?.message ? (
								<ErrorText>
									{errors.lastName?.message}
								</ErrorText>
							) : null}

							<Controller
								control={control}
								defaultValue={user?.email || ""}
								name="email"
								render={({ onChange, value }) => {
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

							<Controller
								control={control}
								defaultValue=""
								name="password"
								render={({ onChange, value }) => {
									return (
										<Input
											label="Informe sua senha"
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
									navigation.navigate("EditPassword");
								}}
							>
								<Feather
									name="lock"
									size={24}
									color="#9CA9A7"
								/>
								<LinkButtonText>Alterar senha</LinkButtonText>
							</LinkButton>

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
