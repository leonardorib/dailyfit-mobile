import React, { useContext, useEffect, useState } from "react";
import { Platform, View } from "react-native";
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
import { Header, TotalConsumptionBox, Meal } from "../../components"
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
interface AddMealForm {
  mealName: string;
}

const addMealSchema = yup.object().shape({
  mealName: yup.string().required("Informe um nome!"),
});

export const DailyDiet: React.FC = observer(() => {
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

              <TotalConsumptionBox
			  	energy_kcal={dailyDiet.energy_kcal}
				carbs={dailyDiet.carbs}
				proteins={dailyDiet.proteins}
				fats={dailyDiet.fats}
			  />

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
