import React from "react";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";
import {
	Container,
	MealHeader,
	MealNameText,
	NutrientsOutterBox,
	NutrientInnerBox,
	NutrientsText,
	ActionButton,
	QuantityAndCaloriesRow,
	shadowStyles,
	ButtonsBox,
} from "./styles";
import { IMealFood } from "../../services/api/MealFoods";

interface IProps {
	mealFood: IMealFood;
	deleteMealFood: () => void;
	editMealFood: () => void;
}

export const FoodCard: React.FC<IProps> = observer((props: IProps) => {
	const { mealFood, deleteMealFood, editMealFood } = props;

	return (
		<Container style={shadowStyles.style}>
			<MealHeader>
				<MealNameText>{mealFood.name}</MealNameText>
				<ButtonsBox>
					<ActionButton
						onPress={editMealFood}
						style={shadowStyles.style}
					>
						<MaterialCommunityIcons
							name="square-edit-outline"
							size={24}
							color="#444540"
						/>
					</ActionButton>
					<ActionButton
						onPress={deleteMealFood}
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
			<QuantityAndCaloriesRow>
				{`${roundOneDecimal(mealFood.quantity)} ${
					mealFood.quantity_unit
				}   -   ${roundOneDecimal(mealFood.energy_kcal)} calorias`}
			</QuantityAndCaloriesRow>

			<NutrientsOutterBox>
				<NutrientInnerBox>
					<NutrientsText>Carboidratos</NutrientsText>
					<NutrientsText>
						{roundOneDecimal(mealFood.carbs)} g
					</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Proteínas</NutrientsText>
					<NutrientsText>
						{roundOneDecimal(mealFood.proteins)} g
					</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Gorduras</NutrientsText>
					<NutrientsText>
						{roundOneDecimal(mealFood.fats)} g
					</NutrientsText>
				</NutrientInnerBox>
			</NutrientsOutterBox>
		</Container>
	);
});
