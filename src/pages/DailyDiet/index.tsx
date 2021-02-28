import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Platform, Text } from "react-native";
import { startOfDay, endOfDay, subDays, addDays, format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
  TotalConsumption,
  TotalConsumptionTitle,
  NutrientsOutterBox,
  NutrientInnerBox,
  NutrientsText,
  AddMealButton,
  AddMealButtonText,
  AddMealModalInnerView,
  AddMealModalText,
  AddMealModalInput,
  ErrorText,
  AddMealModalButtonsView,
  AddMealModalButton,
  AddMealModalButtonText,
  shadowStyles,
} from "./styles";

import Header from "../../components/Header";
import Meal from "../../components/Meal";
import { Modal } from "react-native-paper";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

interface AddMealForm {
  mealName: string;
}

const addMealSchema = yup.object().shape({
  mealName: yup.string().required("Informe um nome!"),
});

const DailyDiet: React.FC = () => {
  const {
    control: controlAddMeal,
    handleSubmit: handleSubmitAddMeal,
    errors: errorsAddMeal,
    getValues: getAddMealValue,
  } = useForm<AddMealForm>({
    resolver: yupResolver(addMealSchema),
  });

  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddMealModalVisible, setIsAddMealModalVisible] = useState(false);

  const onSubmitAddMeal = (formData: AddMealForm) => {
    console.log(formData);
    api
      .post("meals", {
        name: formData.mealName,
        date: new Date(),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        Alert.alert("Erro ao criar refeição", "Tente novamente");
        console.log(error.message);
      });
  };

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

            <DateSelectionRow style={shadowStyles.style}>
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

            <TotalConsumption style={shadowStyles.style}>
              <TotalConsumptionTitle>Total: 0 calorias</TotalConsumptionTitle>
              <NutrientsOutterBox>
                <NutrientInnerBox>
                  <NutrientsText>Carboidratos</NutrientsText>
                  <NutrientsText>0 g</NutrientsText>
                </NutrientInnerBox>
                <NutrientInnerBox>
                  <NutrientsText>Proteínas</NutrientsText>
                  <NutrientsText>0 g</NutrientsText>
                </NutrientInnerBox>
                <NutrientInnerBox>
                  <NutrientsText>Gorduras</NutrientsText>
                  <NutrientsText>0 g</NutrientsText>
                </NutrientInnerBox>
              </NutrientsOutterBox>
            </TotalConsumption>
            <Meal />
          </Container>
        </ScrollView>

        <AddMealButton
          style={shadowStyles.style}
          onPress={() => {
            setIsAddMealModalVisible(true);
          }}
        >
          <AntDesign name="pluscircleo" size={40} color="#76c7c5" />
          <AddMealButtonText>Adicionar refeição</AddMealButtonText>
        </AddMealButton>
      </KeyboardAvoidingView>
      <Modal
        visible={isAddMealModalVisible}
        onDismiss={() => {
          setIsAddMealModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <AddMealModalInnerView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <AddMealModalText>Dê um nome para sua refeição</AddMealModalText>
            <Controller
              name="mealName"
              defaultValue=""
              control={controlAddMeal}
              render={({ value, onChange }) => {
                return (
                  <>
                    <AddMealModalInput
                      autoFocus={true}
                      value={value}
                      onChangeText={(value) => onChange(value)}
                      returnKeyType="send"
                      onSubmitEditing={() => {
                        handleSubmitAddMeal(onSubmitAddMeal)();

                        if (value.length > 0) {
                          setIsAddMealModalVisible(false);
                        }
                      }}
                    />
                  </>
                );
              }}
            />

            {errorsAddMeal.mealName?.message && (
              <ErrorText>{errorsAddMeal.mealName?.message}</ErrorText>
            )}

            <AddMealModalButtonsView>
              <AddMealModalButton
                onPress={() => {
                  setIsAddMealModalVisible(false);
                }}
              >
                <AddMealModalButtonText>Cancelar</AddMealModalButtonText>
              </AddMealModalButton>
              <AddMealModalButton
                onPress={() => {
                  handleSubmitAddMeal(onSubmitAddMeal)();
                  if (getAddMealValue("mealName").length > 0) {
                    setIsAddMealModalVisible(false);
                  }
                }}
              >
                <AddMealModalButtonText>Confirmar</AddMealModalButtonText>
              </AddMealModalButton>
            </AddMealModalButtonsView>
          </AddMealModalInnerView>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

export default DailyDiet;
