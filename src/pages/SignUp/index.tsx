import React, { useState } from "react";
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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from "react-native-paper";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native";
import logoImg from "../../assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigation = useNavigation();

  const inputTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      primary: "#39AFB0",
      text: "#444540",
      placeholder: "#a09e9e",
      background: "#fcfcfc",
    },
    roundess: 0.4,
    fonts: configureFonts({
      default: {
        regular: {
          fontFamily: "Roboto_400Regular",
          fontWeight: "normal",
        },
        medium: {
          fontFamily: "Roboto_500Medium",
          fontWeight: "normal",
        },
        light: {
          fontFamily: "Roboto_400Regular",
          fontWeight: "normal",
        },
        thin: {
          fontFamily: "Roboto_400Regular",
          fontWeight: "normal",
        },
      },
    }),
  };

  return (
    <PaperProvider theme={DefaultTheme}>
      <KeyboardAvoidingView
        style={{
          marginTop: 40,
          marginBottom: 40,
        }}
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
            <Container>
              <LogoImage source={logoImg} resizeMode="contain" />
              <LogoText>
                daily<Text style={{ color: "#76C7C5" }}>Fit</Text>
              </LogoText>

              <Title>Faça seu cadastro</Title>
              <Input
                label="Nome"
                mode="outlined"
                autoCapitalize="none"
                value={name}
                theme={inputTheme}
                onChangeText={(text) => setName(text)}
              />
              <Input
                label="Sobrenome"
                mode="outlined"
                autoCapitalize="none"
                value={lastName}
                theme={inputTheme}
                onChangeText={(text) => setLastName(text)}
              />
              <Input
                label="E-mail"
                mode="outlined"
                autoCapitalize="none"
                value={email}
                theme={inputTheme}
                onChangeText={(text) => setEmail(text)}
              />
              <Input
                label="Senha"
                mode="outlined"
                autoCapitalize="none"
                theme={inputTheme}
                value={password}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
              <Input
                label="Confirmar senha"
                mode="outlined"
                autoCapitalize="none"
                theme={inputTheme}
                value={passwordConfirmation}
                secureTextEntry={true}
                onChangeText={(text) => setPasswordConfirmation(text)}
              />

              <Button>
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
