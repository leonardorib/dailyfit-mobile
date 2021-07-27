import React from "react";
import { Portal } from "react-native-paper";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MealsStore } from "../../stores/MealsStore";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";
import { AddFoodModal } from "../AddFoodModal";
import {
	Container,
	Food,
	MealHeader,
	MealNameText,
	ActionButton,
	FoodNameText,
	FoodDescription,
	AddFoodButton,
	AddFoodText,
	shadowStyles,
	ButtonsBox,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { IMeal } from "../../services/api/Meals";

export interface IAddFood {
	foodId: string;
	quantity: number;
	quantity_unit: string;
}

interface MealProps {
	meal: IMeal;
	mealsStore: MealsStore;
	isAddFoodModalVisible: boolean;
	setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Meal: React.FC<MealProps> = observer((props: MealProps) => {
	const { meal, mealsStore } = props;

	const { navigate } = useNavigation();

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
				<ButtonsBox>
					<ActionButton
						onPress={() => {
							navigate("EditMeal", {
								mealId: meal.id,
							});
						}}
						style={shadowStyles.style}
					>
						<MaterialCommunityIcons
							name="square-edit-outline"
							size={24}
							color="#444540"
						/>
					</ActionButton>
					<ActionButton
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
					</ActionButton>
				</ButtonsBox>
			</MealHeader>

			{meal.mealFoods.length > 0 &&
				meal.mealFoods.map((food) => {
					return (
						<Food key={food.id}>
							<FoodNameText>{food.name}</FoodNameText>
							<FoodDescription>{`${roundOneDecimal(
								food.quantity
							)} ${food.quantity_unit}   -   ${roundOneDecimal(
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
				/>
			</Portal>
		</Container>
	);
});
