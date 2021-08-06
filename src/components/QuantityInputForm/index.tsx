import React from "react";
import {
	SelectFoodText,
	Container,
	QuantityInput,
	UnitRow,
	UnitText,
	NutrientsRow,
	IndividualNutrientBox,
	NutrientText,
} from "./styles";
import { observer } from "mobx-react";
import { INutrients } from "../../services/api/Nutrients";


interface IQuantityInputProps {
	value?: string;
	onChangeText: (text: string) => void;
	nutrients: INutrients;
}

export const QuantityInputForm: React.FC<IQuantityInputProps> = observer(
	(props: IQuantityInputProps) => {
		const { value, onChangeText, nutrients } = props;

		return (
			<Container>
				<SelectFoodText>Informe a quantidade</SelectFoodText>
				<UnitRow>
					<QuantityInput
						value={value}
						onChangeText={onChangeText}
						keyboardType="numbers-and-punctuation"
					/>

					<UnitText>gramas</UnitText>
				</UnitRow>
				<NutrientsRow>
					<IndividualNutrientBox>
						<NutrientText>Calorias</NutrientText>
						<NutrientText>
							{nutrients.energy_kcal} kcal
						</NutrientText>
					</IndividualNutrientBox>
					<IndividualNutrientBox>
						<NutrientText>Carboidratos</NutrientText>
						<NutrientText>{nutrients.carbs} g</NutrientText>
					</IndividualNutrientBox>
					<IndividualNutrientBox>
						<NutrientText>Proteínas</NutrientText>
						<NutrientText>
							{nutrients.proteins} g
						</NutrientText>
					</IndividualNutrientBox>
					<IndividualNutrientBox>
						<NutrientText>Gorduras</NutrientText>
						<NutrientText>{nutrients.fats} g</NutrientText>
					</IndividualNutrientBox>
				</NutrientsRow>
			</Container>
		);
	}
);
