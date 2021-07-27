import React from "react";
import { Portal } from "react-native-paper";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenStore from "../../store";
import roundOneDecimal from "../../../utils/roundOneDecimal";
import { AddFoodModal } from "../../../../components/AddFoodModal";
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
import { IMeal } from "../../../../services/api/Meals";
import { useCallback } from "react";
import { useState } from "react";

export interface IAddFood {
	mealId: string;
	foodId: string;
	quantity: number;
	quantity_unit: string;
}

interface MealProps {
	meal: IMeal;
	screenStore: ScreenStore;
}

export const Meal: React.FC<MealProps> = observer((props: MealProps) => {
	const { meal, screenStore } = props;

	const { navigate } = useNavigation();

	const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);

	const handleDeleteMeal = async (mealId: string) => {
		await screenStore.deleteMeal({ mealId });
	};

	const handleAddFood = useCallback (async ({
		mealId,
		foodId,
		quantity,
		quantity_unit,
	}: IAddFood) => {
		console.log("add food to: ", {name: meal.name, id: meal.id});
		await screenStore.addFoodToMeal({
			mealId,
			foodId,
			quantity,
			quantity_unit,
		});
	}, [meal.id]);

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
					console.log({id: meal.id, name: meal.name})
					setIsAddFoodModalVisible(true);
				}}
			>
				<AddFoodText>+ Adicionar alimento</AddFoodText>
			</AddFoodButton>
			<Portal>
				<AddFoodModal
					key={meal.id}
					meal={meal}
					handleAddFood={handleAddFood}
					isAddFoodModalVisible={isAddFoodModalVisible}
					setIsAddFoodModalVisible={setIsAddFoodModalVisible}
				/>
			</Portal>
		</Container>
	);
});
