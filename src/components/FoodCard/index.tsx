import React from "react";
import { observer } from "mobx-react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { formatNutrient } from "../../services/format";
import {
	Container,
	MealHeader,
	MealNameTextContainer,
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
				<MealNameTextContainer>
					<MealNameText>{mealFood.name}</MealNameText>
				</MealNameTextContainer>
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
				{`${formatNutrient(mealFood.quantity)} ${
					mealFood.quantity_unit
				}   -   ${formatNutrient(mealFood.energy_kcal)} calorias`}
			</QuantityAndCaloriesRow>

			<NutrientsOutterBox>
				<NutrientInnerBox>
					<NutrientsText>Carboidratos</NutrientsText>
					<NutrientsText>
						{formatNutrient(mealFood.carbs)} g
					</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Proteínas</NutrientsText>
					<NutrientsText>
						{formatNutrient(mealFood.proteins)} g
					</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Gorduras</NutrientsText>
					<NutrientsText>
						{formatNutrient(mealFood.fats)} g
					</NutrientsText>
				</NutrientInnerBox>
			</NutrientsOutterBox>
		</Container>
	);
});
