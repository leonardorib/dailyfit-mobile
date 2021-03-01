import React from "react";
import { View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IMeal, IMeals } from "../../pages/DailyDiet";

import roundTwoDecimals from "../../pages/utils/roundTwoDecimals";

import {
  Container,
  Food,
  MealHeader,
  MealNameText,
  ExcludeMealButton,
  FoodNameText,
  FoodDescription,
  AddFoodButton,
  AddFoodText,
  shadowStyles,
} from "./styles";
import api from "../../services/api";

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

export interface IMeaaals {
  energy_kcal: number;
  carbs: number;
  proteins: number;
  fats: number;
  meals: IMeal[];
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
  mealsState: IMeals;
  setMealsState: React.Dispatch<React.SetStateAction<IMeals>>;
}

const Meal: React.FC<MealProps> = (props: MealProps) => {
  const handleDeleteMeal = (mealId: string) => {
    api
      .delete(`meals/${mealId}`)
      .then((response) => {
        console.log("Meals state:");
        console.log(props.mealsState);
        const { meals, energy_kcal, carbs, proteins, fats } = props.mealsState;

        const updatedMeals = meals.filter((meal) => meal.id !== mealId);
        props.setMealsState({
          energy_kcal: roundTwoDecimals(energy_kcal - props.energy_kcal),
          carbs: roundTwoDecimals(carbs - props.carbs),
          proteins: roundTwoDecimals(proteins - props.proteins),
          fats: roundTwoDecimals(fats - props.fats),
          meals: updatedMeals,
        });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <Container style={shadowStyles.style}>
      <MealHeader>
        <MealNameText>{props.name}</MealNameText>
        <ExcludeMealButton
          onPress={() => {
            handleDeleteMeal(props.id);
          }}
          style={shadowStyles.style}
        >
          <MaterialCommunityIcons
            name="delete-forever"
            size={24}
            color="#444540"
          />
        </ExcludeMealButton>
      </MealHeader>

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
