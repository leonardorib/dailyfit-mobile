import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import styled from "styled-components/native";

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  margin-top: ${getStatusBarHeight()}px;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ScrollView = styled.ScrollView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const ArrowRightButton = styled.TouchableOpacity``;

export const ArrowLeftButton = styled.TouchableOpacity``;

export const DateText = styled.Text`
  margin-right: 8px;
  font-size: 18px;
  font-family: "Roboto_400Regular";
  color: #444540;
`;

export const DateSelectionRow = styled.View`
  width: 98%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 5px;
  padding: 10px 0 10px 0;
  background-color: #fff;
  border-radius: 5px;
`;

export const SelectedDateContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 150px;
  justify-content: center;
`;

export const shadowStyles = StyleSheet.create({
  dateSelectionShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
