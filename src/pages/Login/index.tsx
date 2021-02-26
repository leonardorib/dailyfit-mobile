import React, { useContext } from "react";
import { Alert, Keyboard, Platform, Text } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthContext from "../../contexts/auth";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import inputTheme from "../utils/inputTheme";

import {
  SafeAreaView,
  ContentContainer,
  LogoImage,
  Input,
  ErrorText,
  Title,
  LogoText,
  Button,
  ButtonText,
  SignUpContainer,
  SignUpText,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "./styles";

type FormData = {
  email: string;
  password: string;
};

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("E-mail obrigatório"),
  password: yup.string().required("Digite sua senha"),
});

const Login: React.FC = () => {
  const { handleSignIn } = useContext(AuthContext);

  const { control, handleSubmit, errors } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const navigation = useNavigation();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
    handleSignIn(formData);
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <TouchableWithoutFeedback
              style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <ContentContainer>
                <LogoImage source={logoImg} resizeMode="contain" />
                <LogoText>
                  daily<Text style={{ color: "#76C7C5" }}>Fit</Text>
                </LogoText>

                <Title>Faça seu login</Title>

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
                        onChangeText={(value) => onChange(value)}
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
                  name="password"
                  defaultValue=""
                  render={({ value, onChange }) => {
                    return (
                      <Input
                        label="Senha"
                        mode="outlined"
                        autoCapitalize="none"
                        theme={inputTheme}
                        value={value}
                        secureTextEntry={true}
                        onChangeText={(value) => onChange(value)}
                        error={!!errors.password?.message}
                      />
                    );
                  }}
                />

                {errors.password?.message ? (
                  <ErrorText>{errors.password?.message}</ErrorText>
                ) : null}

                <Button
                  onPress={() => {
                    handleSubmit(onSubmit)();
                  }}
                >
                  <ButtonText>Entrar</ButtonText>
                </Button>

                <SignUpContainer
                  onPress={() => {
                    navigation.navigate("SignUp");
                  }}
                >
                  <Feather name="log-in" size={24} color="#9CA9A7" />
                  <SignUpText>Criar conta</SignUpText>
                </SignUpContainer>
              </ContentContainer>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Login;
