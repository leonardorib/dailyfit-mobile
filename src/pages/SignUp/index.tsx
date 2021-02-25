import React from "react";
import {
  Container,
  LogoImage,
  Input,
  Title,
  LogoText,
  Button,
  ButtonText,
  SignUpContainer,
  SignUpText,
} from "./styles";
import { Feather } from "@expo/vector-icons";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native";
import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";

import inputTheme from "../utils/inputTheme";

import api from "../../services/api";

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
      <KeyboardAvoidingView>
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
            <Container>
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
            </Container>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default SignUp;
