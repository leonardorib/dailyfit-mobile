import React, { useContext, useEffect, useState } from "react";
import { Platform, Text, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Modal,
} from "react-native-paper";
import { observer } from "mobx-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import roundOneDecimal from "../utils/roundOneDecimal";
import Header from "../../components/Header";
import Meal from "../../components/Meal";
import { MealsStoreContext } from "../../stores/MealsStore";

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

export interface IAddFood {
  foodId: string;
  quantity: number;
  quantity_unit: string;
}

export interface IMealFood {
  id: string;
  name: string;
  quantity: number;
  quantity_unit: string;
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
}

export interface IMeal {
  id: string;
  name: string;
  date: Date;
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
  foods: IMealFood[];
}

export interface IMeals {
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
  meals: IMeal[];
}

interface AddMealForm {
  mealName: string;
}

const addMealSchema = yup.object().shape({
  mealName: yup.string().required("Informe um nome!"),
});

const DailyDiet: React.FC = observer(() => {
  const mealsStore = useContext(MealsStoreContext);
  const {
    selectedDate,
    setSelectedDate,
    addDay,
    subtractDay,
    getDailyDiet,
    dailyDiet,
  } = mealsStore;
  const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isAddMealModalVisible, setIsAddMealModalVisible] = useState(false);

  const {
    control: controlAddMeal,
    handleSubmit: handleSubmitAddMeal,
    errors: errorsAddMeal,
    getValues: getAddMealValue,
  } = useForm<AddMealForm>({
    resolver: yupResolver(addMealSchema),
  });

  const onSubmitAddMeal = async (formData: AddMealForm) => {
    await mealsStore.createMeal(formData.mealName);
  };

  useEffect(() => {
    getDailyDiet();
  }, [mealsStore.selectedDate]);

  useEffect(() => {}, [showDatePicker]);

  return (
    <PaperProvider theme={DefaultTheme}>
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Header />
          <ScrollView>
            <Container>
              {/* Selecting date */}
              <DateSelectionRow style={shadowStyles.style}>
                <ArrowLeftButton
                  onPress={() => {
                    subtractDay();
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
                    addDay();
                  }}
                >
                  <Feather name="chevron-right" size={24} color="#444540" />
                </ArrowRightButton>
              </DateSelectionRow>

              {/* Date Picker Modal */}
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
                <TotalConsumptionTitle>
                  Total: {roundOneDecimal(dailyDiet.energy_kcal)} calorias
                </TotalConsumptionTitle>
                <NutrientsOutterBox>
                  <NutrientInnerBox>
                    <NutrientsText>Carboidratos</NutrientsText>
                    <NutrientsText>
                      {roundOneDecimal(dailyDiet.carbs)} g
                    </NutrientsText>
                  </NutrientInnerBox>
                  <NutrientInnerBox>
                    <NutrientsText>Proteínas</NutrientsText>
                    <NutrientsText>
                      {roundOneDecimal(dailyDiet.proteins)} g
                    </NutrientsText>
                  </NutrientInnerBox>
                  <NutrientInnerBox>
                    <NutrientsText>Gorduras</NutrientsText>
                    <NutrientsText>
                      {roundOneDecimal(dailyDiet.fats)} g
                    </NutrientsText>
                  </NutrientInnerBox>
                </NutrientsOutterBox>
              </TotalConsumption>

              {/* Rendering meals list */}
              {dailyDiet.meals &&
                dailyDiet.meals.map((meal) => {
                  return (
                    <Meal
                      key={meal.id}
                      meal={meal}
                      mealsStore={mealsStore}
                      isAddFoodModalVisible={isAddFoodModalVisible}
                      setIsAddFoodModalVisible={setIsAddFoodModalVisible}
                    />
                  );
                })}
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
        {/* Add Meal Modal */}
        <Modal
          visible={isAddMealModalVisible}
          onDismiss={() => {
            setIsAddMealModalVisible(false);
          }}
        >
          <View>
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
          </View>
        </Modal>
      </SafeAreaView>
    </PaperProvider>
  );
});

export default DailyDiet;
