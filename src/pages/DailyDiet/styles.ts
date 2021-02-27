import { StatusBar } from "react-native";
import styled from "styled-components/native";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;
