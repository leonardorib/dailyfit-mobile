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
import { useNavigation } from "@react-navigation/native";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native";
import logoImg from "../../assets/logo.png";
import { ScrollView } from "react-native-gesture-handler";

import { useForm, Controller } from "react-hook-form";

import inputTheme from "../utils/inputTheme";

type FormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const navigation = useNavigation();

  const onSubmit = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <KeyboardAvoidingView>
        <ScrollView>
          <TouchableWithoutFeedback
            style={{ backgroundColor: "#fff", flex: 1, alignItems: "center" }}
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <Container>
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
                    />
                  );
                }}
              />

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
                    />
                  );
                }}
              />

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
            </Container>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
};

export default Login;
