import React from "react";
import { Portal } from "react-native-paper";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IMealFood } from "../../pages/DailyDiet";
import { MealsStore } from "../../stores/MealsStore";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";
import AddFoodModal from "../AddFoodModal";
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

export interface IAddFood {
  foodId: string;
  quantity: number;
  quantity_unit: string;
}

interface IMeal {
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

interface MealProps {
  meal: IMeal;
  mealsStore: MealsStore;
  isAddFoodModalVisible: boolean;
  setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Meal: React.FC<MealProps> = observer((props: MealProps) => {
  const { meal, mealsStore } = props;

  const handleDeleteMeal = async (mealId: string) => {
    await mealsStore.deleteMeal({ mealId });
  };

  const handleAddFood = async ({
    foodId,
    quantity,
    quantity_unit,
  }: IAddFood) => {
    await mealsStore.addFoodToMeal({
      mealId: meal.id,
      foodId,
      quantity,
      quantity_unit,
    });
  };

  return (
    <Container style={shadowStyles.style}>
      <MealHeader>
        <MealNameText>{meal.name}</MealNameText>
        <ExcludeMealButton
          onPress={() => {
            handleDeleteMeal(meal.id);
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

      {meal.foods.length > 0 &&
        meal.foods.map((food) => {
          return (
            <Food key={food.id}>
              <FoodNameText>{food.name}</FoodNameText>
              <FoodDescription>{`${roundOneDecimal(food.quantity)} ${
                food.quantity_unit
              }   -   ${roundOneDecimal(
                food.energy_kcal
              )} calorias`}</FoodDescription>
            </Food>
          );
        })}

      <AddFoodButton
        onPress={() => {
          props.setIsAddFoodModalVisible(true);
        }}
      >
        <AddFoodText>+ Adicionar alimento</AddFoodText>
      </AddFoodButton>
      <Portal>
        <AddFoodModal
          meal={meal}
          handleAddFood={handleAddFood}
          isAddFoodModalVisible={props.isAddFoodModalVisible}
          setIsAddFoodModalVisible={props.setIsAddFoodModalVisible}
          mealsStore={mealsStore}
        />
      </Portal>
    </Container>
  );
});

export default Meal;
