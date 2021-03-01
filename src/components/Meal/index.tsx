import React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";

import {
  Container,
  Food,
  MealNameText,
  FoodNameText,
  FoodDescription,
  AddFoodButton,
  AddFoodText,
  shadowStyles,
} from "./styles";

interface MealFood {
  id: string;
  name: string;
  quantity: number;
  quantity_unit: string;
  energy_kcal: number;
  carbs: number;
  proteins: number;
  fats: number;
}

interface MealProps {
  id: string;
  name: string;
  date: Date;
  energy_kcal: number;
  carbs: number;
  proteins: number;
  fats: number;
  foods: MealFood[];
}

const Meal: React.FC<MealProps> = (props: MealProps) => {
  return (
    <Container style={shadowStyles.style}>
      <MealNameText>{props.name}</MealNameText>
      {props.foods.length > 0 &&
        props.foods.map((food) => {
          return (
            <Food key={food.id}>
              <FoodNameText>{food.name}</FoodNameText>
              <FoodDescription>{`${food.quantity} ${food.quantity_unit}   -   ${food.energy_kcal} calorias`}</FoodDescription>
            </Food>
          );
        })}
      <AddFoodButton>
        <AddFoodText>+ Adicionar alimento</AddFoodText>
      </AddFoodButton>
    </Container>
  );
};

export default Meal;
