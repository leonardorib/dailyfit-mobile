import React from "react";
import { Keyboard } from "react-native";
import {
	SelectFoodText,
	Container,
	ContainerTouchable,
	QuantityInput,
	UnitRow,
	UnitText,
	NutrientsRow,
	IndividualNutrientBox,
	NutrientText,
} from "./styles";
import { formatNutrient } from "../../services/format"
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
			<ContainerTouchable onPress={() => { Keyboard.dismiss() }} >
				<Container>
					<SelectFoodText>Informe a quantidade</SelectFoodText>
					<UnitRow>
						<QuantityInput
							value={value}
							onChangeText={onChangeText}
							keyboardType="numeric"
						/>

						<UnitText>gramas</UnitText>
					</UnitRow>
					<NutrientsRow>
						<IndividualNutrientBox>
							<NutrientText>Calorias</NutrientText>
							<NutrientText>
								{formatNutrient(nutrients.energy_kcal)} kcal
							</NutrientText>
						</IndividualNutrientBox>
						<IndividualNutrientBox>
							<NutrientText>Carboidratos</NutrientText>
							<NutrientText>{formatNutrient(nutrients.carbs)} g</NutrientText>
						</IndividualNutrientBox>
						<IndividualNutrientBox>
							<NutrientText>Proteínas</NutrientText>
							<NutrientText>
								{formatNutrient(nutrients.proteins)} g
							</NutrientText>
						</IndividualNutrientBox>
						<IndividualNutrientBox>
							<NutrientText>Gorduras</NutrientText>
							<NutrientText>{formatNutrient(nutrients.fats)} g</NutrientText>
						</IndividualNutrientBox>
					</NutrientsRow>
				</Container>
			</ContainerTouchable>
		);
	}
);
