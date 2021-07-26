import React from "react";
import { observer } from "mobx-react";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";
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

const TotalConsumptionBox: React.FC<IProps> = observer((props) => {
	const { energy_kcal, carbs, proteins, fats } = props;

	return (
		<Container style={shadowStyles.style}>
			<TotalConsumptionTitle>
				Total: {roundOneDecimal(energy_kcal)} calorias
			</TotalConsumptionTitle>
			<NutrientsOutterBox>
				<NutrientInnerBox>
					<NutrientsText>Carboidratos</NutrientsText>
					<NutrientsText>{roundOneDecimal(carbs)} g</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Proteínas</NutrientsText>
					<NutrientsText>{roundOneDecimal(proteins)} g</NutrientsText>
				</NutrientInnerBox>
				<NutrientInnerBox>
					<NutrientsText>Gorduras</NutrientsText>
					<NutrientsText>{roundOneDecimal(fats)} g</NutrientsText>
				</NutrientInnerBox>
			</NutrientsOutterBox>
		</Container>
	);
});

export default TotalConsumptionBox;
