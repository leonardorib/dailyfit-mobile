import React, { useEffect, useState } from "react";
import { Modal, View, ModalProps, Button, Text, Keyboard } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import api from "../../services/api";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Container,
  SearchInput,
  SelectFoodText,
  FoodContainer,
  FoodName,
  SelectedFoodContainer,
  QuantityInput,
  UnitRow,
  UnitText,
  CaloriesText,
  NutrientsRow,
  IndividualNutrientBox,
  NutrientText,
  ModalButtonsRow,
  ModalButton,
  ModalButtonText,
  shadowStyles,
} from "./styles";

interface Food {
  id: string;
  name: string;
  standard_quantity: number;
  standard_unit: string;
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
}

// interface SelectedFood extends Food {
//   quantity: number;
//   energy_kcal_consumed: number;
//   energy_kj_consumed: number;
//   carbs_consumed: number;
//   proteins_consumed: number;
//   fats_consumed: number;
// }

interface NutrientsConsumed {
  quantity: number;
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
}

interface FoodQuantityInput {
  quantity: number;
}

const foodQuantitySchema = yup.object().shape({
  quantity: yup.number().moreThan(0).required(),
});

interface AddFoodModalContent {
  isAddFoodModalVisible: boolean;
  setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodModal: React.FC<AddFoodModalContent> = (
  props: AddFoodModalContent
) => {
  const [searchInput, setSearchInput] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | undefined>(undefined);
  const [nutrientsConsumed, setNutrientsConsumed] = useState<NutrientsConsumed>(
    {
      quantity: 0,
      energy_kcal: 0,
      energy_kj: 0,
      carbs: 0,
      proteins: 0,
      fats: 0,
    }
  );

  const { control, handleSubmit, errors } = useForm<FoodQuantityInput>({
    resolver: yupResolver(foodQuantitySchema),
  });

  const onChangeSearchInput = (value: string) => {
    setSearchInput(value);
  };

  const onChangeQuantityInput = (value: number) => {
    if (Number.isNaN(value)) {
      setNutrientsConsumed({
        quantity: 0,
        energy_kcal: 0,
        energy_kj: 0,
        carbs: 0,
        proteins: 0,
        fats: 0,
      });

      return;
    }

    if (selectedFood) {
      const proportionFactor = value / selectedFood.standard_quantity;

      setNutrientsConsumed({
        quantity: value,
        energy_kcal: roundOneDecimal(
          proportionFactor * selectedFood.energy_kcal
        ),
        energy_kj: roundOneDecimal(proportionFactor * selectedFood.energy_kj),
        carbs: roundOneDecimal(proportionFactor * selectedFood.carbs),
        proteins: roundOneDecimal(proportionFactor * selectedFood.proteins),
        fats: roundOneDecimal(proportionFactor * selectedFood.fats),
      });
    }
  };

  const apiRequestFoods = (foodName: string) => {
    api
      .get("foods", {
        params: {
          foodName,
        },
      })
      .then((response) => {
        setFoods(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (searchInput.length > 1) {
        apiRequestFoods(searchInput);
        Keyboard.dismiss();
      }
    }, 1500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchInput]);

  return (
    <Container>
      <SearchInput
        placeholder="Procure por um alimento"
        onChangeText={onChangeSearchInput}
        value={searchInput}
        autoFocus={true}
        onBlur={Keyboard.dismiss}
        clearIcon="delete"
      />

      {foods.length > 0 && (
        <>
          <SelectFoodText>Toque para selecionar o alimento</SelectFoodText>
          <FlatList
            onScrollBeginDrag={Keyboard.dismiss}
            style={{
              marginBottom: 20,
            }}
            contentContainerStyle={{
              alignItems: "center",
              flexDirection: "column",
            }}
            data={foods}
            keyExtractor={(food) => food.id}
            renderItem={({ item }) => {
              return (
                <FoodContainer
                  style={shadowStyles.style}
                  isSelected={item.id === selectedFood?.id ? true : false}
                  onPress={() => {
                    setSelectedFood(item);
                  }}
                >
                  <FoodName
                    isSelected={item.id === selectedFood?.id ? true : false}
                  >
                    {item.name}
                  </FoodName>
                </FoodContainer>
              );
            }}
          />
        </>
      )}

      {selectedFood && (
        <SelectedFoodContainer>
          <SelectFoodText>Informe a quantidade</SelectFoodText>
          <UnitRow>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ value, onChange }) => {
                return (
                  <QuantityInput
                    value={value}
                    onChangeText={(value) => {
                      onChange(Number(value));
                      onChangeQuantityInput(Number(value));
                    }}
                    keyboardType="number-pad"
                  />
                );
              }}
            />

            <UnitText>gramas</UnitText>
          </UnitRow>
          <NutrientsRow>
            <IndividualNutrientBox>
              <NutrientText>Calorias</NutrientText>
              <NutrientText>{nutrientsConsumed.energy_kcal} kcal</NutrientText>
            </IndividualNutrientBox>
            <IndividualNutrientBox>
              <NutrientText>Carboidratos</NutrientText>
              <NutrientText>{nutrientsConsumed.carbs} g</NutrientText>
            </IndividualNutrientBox>
            <IndividualNutrientBox>
              <NutrientText>Proteínas</NutrientText>
              <NutrientText>{nutrientsConsumed.proteins} g</NutrientText>
            </IndividualNutrientBox>
            <IndividualNutrientBox>
              <NutrientText>Gorduras</NutrientText>
              <NutrientText>{nutrientsConsumed.fats} g</NutrientText>
            </IndividualNutrientBox>
          </NutrientsRow>
        </SelectedFoodContainer>
      )}
      <ModalButtonsRow>
        <ModalButton
          onPress={() => {
            props.setIsAddFoodModalVisible(false);
          }}
        >
          <ModalButtonText>Cancelar</ModalButtonText>
        </ModalButton>
        <ModalButton onPress={() => {}}>
          <ModalButtonText>OK</ModalButtonText>
        </ModalButton>
      </ModalButtonsRow>
    </Container>
  );
};

export default AddFoodModal;
