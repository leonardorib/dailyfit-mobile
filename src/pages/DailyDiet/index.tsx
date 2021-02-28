import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { startOfDay, endOfDay, subDays, addDays, format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, Feather } from "@expo/vector-icons";

import api from "../../services/api";

import {
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Container,
  DateSelectionRow,
  SelectedDateContainer,
  DateText,
  ArrowLeftButton,
  ArrowRightButton,
  shadowStyles,
} from "./styles";

import Header from "../../components/Header";
import Meal from "../../components/Meal";

const DailyDiet: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    api
      .get("meals", {
        params: {
          startDate: startOfDay(selectedDate),
          endDate: endOfDay(selectedDate),
        },
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  }, [selectedDate]);

  useEffect(() => {}, [showDatePicker]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView>
          <Container>
            <Header />
            <DateSelectionRow style={shadowStyles.dateSelectionShadow}>
              <ArrowLeftButton
                onPress={() => {
                  setSelectedDate(subDays(selectedDate, 1));
                }}
              >
                <Feather name="chevron-left" size={24} color="#444540" />
              </ArrowLeftButton>
              <SelectedDateContainer
                onPress={() => {
                  setShowDatePicker(true);
                }}
              >
                <DateText>
                  {format(selectedDate, "dd/MM/yyyy") ===
                  format(new Date(), "dd/MM/yyyy")
                    ? "Hoje"
                    : format(selectedDate, "dd/MM/yyyy")}
                </DateText>
                <AntDesign name="caretdown" size={10} color="#444540" />
              </SelectedDateContainer>
              <ArrowRightButton
                onPress={() => {
                  setSelectedDate(addDays(selectedDate, 1));
                }}
              >
                <Feather name="chevron-right" size={24} color="#444540" />
              </ArrowRightButton>
            </DateSelectionRow>

            {showDatePicker && (
              <DateTimePickerModal
                isVisible={showDatePicker}
                headerTextIOS="Selecione uma data"
                confirmTextIOS="Confirmar"
                cancelTextIOS="Cancelar"
                date={selectedDate}
                mode="date"
                onConfirm={(date) => {
                  setShowDatePicker(!showDatePicker);
                  setSelectedDate(date);
                }}
                onCancel={() => setShowDatePicker(!showDatePicker)}
                locale="pt-BR"
              />
            )}

            <Meal />
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DailyDiet;
