import React, { useEffect, useState } from "react";
import { Modal, View, ModalProps, Button, Text, Keyboard } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import api from "../../services/api";

import {
  Container,
  SearchInput,
  SelectFoodText,
  FoodContainer,
  FoodName,
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

interface AddFoodModalContent {
  isAddFoodModalVisible: boolean;
  setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodModal: React.FC<AddFoodModalContent> = (
  props: AddFoodModalContent
) => {
  const [searchInput, setSearchInput] = useState("");
  const [foods, setFoods] = useState<Food[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food>({} as Food);

  const onChangeSearchInput = (value: string) => {
    setSearchInput(value);
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
                  isSelected={item.id === selectedFood.id ? true : false}
                  onPress={() => {
                    setSelectedFood(item);
                  }}
                >
                  <FoodName
                    isSelected={item.id === selectedFood.id ? true : false}
                  >
                    {item.name}
                  </FoodName>
                </FoodContainer>
              );
            }}
          />
        </>
      )}

      <ModalButton
        onPress={() => {
          props.setIsAddFoodModalVisible(false);
        }}
      >
        <ModalButtonText>Cancelar</ModalButtonText>
      </ModalButton>
    </Container>
  );
};

export default AddFoodModal;
