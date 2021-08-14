import React from "react";
import { observer } from "mobx-react";
import { formatNutrient } from "../../services/format"
import {
	Container,
	TotalConsumptionTitle,
	NutrientsOutterBox,
	NutrientInnerBox,
	NutrientsText,
	shadowStyles,
} from "./styles";

interface IProps {
	energy_kcal: number;
	carbs: number;
	proteins: number;
	fats: number;
}

export const TotalConsumptionBox: React.FC<IProps> = observer((props) => {
	const { energy_kcal, carbs, proteins, fats } = props;

	return (
		<Container style={shadowStyles.style}>
			<TotalConsumptionTitle>
				Total: {formatNutrient(energy_kcal)} calorias
			</TotalConsumptionTitle>
			<NutrientsOutterBox>
				<NutrientInnerBox>
					<NutrientsText>Carboidratos</NutrientsText>
					<NutrientsText>{formatNutrient(carbs)} g</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Proteínas</NutrientsText>
					<NutrientsText>{formatNutrient(proteins)} g</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Gorduras</NutrientsText>
					<NutrientsText>{formatNutrient(fats)} g</NutrientsText>
				</NutrientInnerBox>
			</NutrientsOutterBox>
		</Container>
	);
});
