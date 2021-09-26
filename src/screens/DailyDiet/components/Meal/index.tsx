import React from "react";
import { Portal } from "react-native-paper";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ScreenStore from "../../store";
import { formatNutrient } from "../../../../services/format";
import { QuantityFoodModal } from "../../../../components/QuantityFoodModal";
import {
	Container,
	Food,
	MealHeader,
	MealNameTextContainer,
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
import { IAddFoodToMealRequest, IUpdateMealFoodRequest } from "../../../../services/api/MealFoods";
import api from "../../../../services/api";
interface MealProps {
	meal: IMeal;
	screenStore: ScreenStore;
}

export const Meal: React.FC<MealProps> = observer((props: MealProps) => {
	const { meal, screenStore } = props;

	const { navigate } = useNavigation();

	const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);

	const closeAddModal = () => {
		setIsAddFoodModalVisible(false);
	}

	const handleDeleteMeal = async (mealId: string) => {
		await screenStore.deleteMeal({ mealId });
	};

	const handleAddFood = useCallback (async ({
		mealId,
		foodId,
		quantity,
		quantity_unit,
	}: IAddFoodToMealRequest) => {
		await screenStore.addFoodToMeal({
			mealId,
			foodId,
			quantity,
			quantity_unit,
		});
	}, [meal.id]);

	const handleEditFood = useCallback (async ({
		mealFoodId,
		foodId,
		quantity,
	}: IUpdateMealFoodRequest) => {
		await api.mealFoods.update({
			mealFoodId,
			foodId,
			quantity,
		})
	}, []);

	return (
		<Container style={shadowStyles.style}>
			<MealHeader>
				<MealNameTextContainer>
					<MealNameText>{meal.name}</MealNameText>
				</MealNameTextContainer>
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
							<FoodDescription>{`${formatNutrient(
								food.quantity
							)} ${food.quantity_unit}   -   ${formatNutrient(
								food.energy_kcal
							)} calorias`}</FoodDescription>
						</Food>
					);
				})}

			<AddFoodButton
				onPress={() => {
					setIsAddFoodModalVisible(true);
				}}
			>
				<AddFoodText>+ Adicionar alimento</AddFoodText>
			</AddFoodButton>
			<Portal>
				<QuantityFoodModal
					key={meal.id}
					meal={meal}
					mode="addMealFood"
					handleAddFood={handleAddFood}
					handleEditFood={handleEditFood}
					isVisible={isAddFoodModalVisible}
					closeModal={closeAddModal}
				/>
			</Portal>
		</Container>
	);
});
