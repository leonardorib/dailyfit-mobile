import React from "react";
import { Keyboard, Platform, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import inputTheme from "../utils/inputTheme";

import {
  SafeAreaView,
  ContentContainer,
  TouchableWithoutFeedback,
  LogoImage,
  Input,
  Title,
  LogoText,
  Button,
  ButtonText,
  SignUpContainer,
  SignUpText,
  KeyboardAvoidingView,
  ScrollView,
} from "./styles";

type FormData = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const SignUp: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  const navigation = useNavigation();

  return (
    <PaperProvider theme={DefaultTheme}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <ContentContainer>
                <LogoImage source={logoImg} resizeMode="contain" />
                <LogoText>
                  daily<Text style={{ color: "#76C7C5" }}>Fit</Text>
                </LogoText>

                <Title>Faça seu cadastro</Title>
                <Controller
                  control={control}
                  defaultValue=""
                  name="name"
                  render={({ onChange, value }) => {
                    return (
                      <Input
                        label="Nome"
                        mode="outlined"
                        autoCapitalize="none"
                        value={value}
                        theme={inputTheme}
                        onChangeText={(value) => onChange(value)}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="lastName"
                  render={({ onChange, value }) => {
                    return (
                      <Input
                        label="Sobrenome"
                        mode="outlined"
                        autoCapitalize="none"
                        value={value}
                        theme={inputTheme}
                        onChangeText={(value) => onChange(value)}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="email"
                  render={({ onChange, value }) => {
                    return (
                      <Input
                        label="E-mail"
                        mode="outlined"
                        autoCapitalize="none"
                        value={value}
                        theme={inputTheme}
                        onChangeText={(value) => onChange(value)}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="password"
                  render={({ onChange, value }) => {
                    return (
                      <Input
                        label="Senha"
                        mode="outlined"
                        autoCapitalize="none"
                        theme={inputTheme}
                        value={value}
                        secureTextEntry={true}
                        onChangeText={(value) => onChange(value)}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  defaultValue=""
                  name="passwordConfirmation"
                  render={({ onChange, value }) => {
                    return (
                      <Input
                        label="Confirmar senha"
                        mode="outlined"
                        autoCapitalize="none"
                        theme={inputTheme}
                        value={value}
                        secureTextEntry={true}
                        onChangeText={(value) => onChange(value)}
                      />
                    );
                  }}
                />

                <Button
                  onPress={() => {
                    handleSubmit(onSubmit)();
                  }}
                >
                  <ButtonText>Cadastrar</ButtonText>
                </Button>

                <SignUpContainer
                  onPress={() => {
                    navigation.navigate("Login");
                  }}
                >
                  <Feather name="log-in" size={24} color="#9CA9A7" />
                  <SignUpText>Voltar para o login</SignUpText>
                </SignUpContainer>
              </ContentContainer>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default SignUp;
