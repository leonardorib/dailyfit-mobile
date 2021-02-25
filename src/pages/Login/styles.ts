import styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { RectButton } from "react-native-gesture-handler";

export const SafeAreaView = styled.SafeAreaView``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView``;

export const ScrollView = styled.ScrollView``;

export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback``;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const LogoImage = styled.Image`
  height: 150px;
`;

export const LogoText = styled.Text`
  font-family: "Roboto_700Bold";
  font-size: 40px;
  color: #444540;
`;

export const Title = styled.Text`
  font-family: "Roboto_700Bold";
  margin-top: 20px;
  font-size: 30px;
  margin-bottom: 25px;
  color: #444540;
`;

export const Input = styled(TextInput)`
  width: 80%;
  height: 50px;
  margin-bottom: 10px;
`;

export const ErrorText = styled.Text`
  margin-top: -2px;
  margin-bottom: 10px;
  color: #b00020;
`;

export const Button = styled(RectButton)`
  width: 80%;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #76c7c5;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-family: "Roboto_700Bold";
  font-size: 20px;
`;

export const SignUpContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const SignUpText = styled.Text`
  font-family: "Roboto_400Regular";
  color: #9ca9a7;
  font-size: 18px;
  margin-left: 8px;
`;
