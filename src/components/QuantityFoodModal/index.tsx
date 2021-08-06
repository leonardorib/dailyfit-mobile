import React, { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Modal } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import api from "../../services/api";
import roundOneDecimal from "../../pages/utils/roundOneDecimal";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { IMeal } from "../../services/api/Meals";

import {
	Container,
	SearchInput,
	SelectFoodText,
	FoodContainer,
	FoodName,
	shadowStyles,
} from "./styles";
import { observer } from "mobx-react";
import { QuantityInputForm } from "../QuantityInputForm";
import { QuantityFormButtons } from "../QuantityFormButtons";
import { INutrients } from "../../services/api/Nutrients";
import { IFood } from "../../services/api/Foods";
import {
	IAddFoodToMealRequest,
	IMealFood,
	IUpdateMealFoodRequest,
} from "../../services/api/MealFoods";

interface FoodQuantityInput {
	quantity: number;
}

const foodQuantitySchema = yup.object().shape({
	quantity: yup.number().moreThan(0).required(),
});

interface IQuantityFoodModalProps {
	meal: IMeal;
	mode: "addMealFood" | "editMealFood";
	initialMealFood?: IMealFood;
	isAddFoodModalVisible: boolean;
	handleAddFood: (addFoodData: IAddFoodToMealRequest) => Promise<void>;
	handleEditFood: (editFoodData: IUpdateMealFoodRequest) => Promise<void>;
	setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	onSubmit?: () => void;
}

const initialNutrients: INutrients = {
	quantity: 0,
	energy_kcal: 0,
	energy_kj: 0,
	carbs: 0,
	proteins: 0,
	fats: 0,
};

export const QuantityFoodModal: React.FC<IQuantityFoodModalProps> = observer(
	(props: IQuantityFoodModalProps) => {
		const { handleAddFood, handleEditFood, mode, initialMealFood, onSubmit } = props;
		const [searchInput, setSearchInput] = useState("");
		const [foods, setFoods] = useState<IFood[]>([]);
		const [selectedFood, setSelectedFood] = useState<IFood | undefined>(
			undefined
		);
		const [nutrientsConsumed, setNutrientsConsumed] =
			useState<INutrients>(initialNutrients);

		const { control, handleSubmit, errors } = useForm<FoodQuantityInput>({
			resolver: yupResolver(foodQuantitySchema),
		});

		const onSubmitAddFood = async (formData: FoodQuantityInput) => {
			if (selectedFood) {
				await handleAddFood({
					mealId: props.meal.id,
					foodId: selectedFood?.id,
					quantity: formData.quantity,
					quantity_unit: "g",
				});
			}

			if (onSubmit) {
				onSubmit();
			}

			props.setIsAddFoodModalVisible(false);

			setSelectedFood(undefined);
			setFoods([]);
			setSearchInput("");
			setNutrientsConsumed(initialNutrients);
		};

		const onSubmitEditMealFood = async (formData: FoodQuantityInput) => {
			if (!initialMealFood) {
				return;
			}
			await handleEditFood({
				foodId: initialMealFood.food_id,
				mealFoodId:initialMealFood.id,
				quantity: formData.quantity,
			});
			setSelectedFood(undefined);
			setNutrientsConsumed(initialNutrients);
			if (onSubmit) {
				onSubmit();
			}
			props.setIsAddFoodModalVisible(false);
		};

		const onChangeSearchInput = (value: string) => {
			setSearchInput(value);
		};

		const onChangeQuantityInput = (value: number) => {
			if (Number.isNaN(value)) {
				setNutrientsConsumed(initialNutrients);

				return;
			}

			if (selectedFood) {
				const proportionFactor = value / selectedFood.standard_quantity;

				setNutrientsConsumed({
					quantity: value,
					energy_kcal: roundOneDecimal(
						proportionFactor * selectedFood.energy_kcal
					),
					energy_kj: roundOneDecimal(
						proportionFactor * selectedFood.energy_kj
					),
					carbs: roundOneDecimal(
						proportionFactor * selectedFood.carbs
					),
					proteins: roundOneDecimal(
						proportionFactor * selectedFood.proteins
					),
					fats: roundOneDecimal(proportionFactor * selectedFood.fats),
				});
			}
		};

		const apiRequestFoods = async (foodName: string) => {
			const response = await api.foods.listByName({ foodName });

			setFoods(response.data);
		};

		useEffect(() => {
			const quantityInput = control.getValues().quantity;
			if (quantityInput) onChangeQuantityInput(quantityInput);
			if(initialMealFood) setSelectedFood(initialMealFood.food);
		}, [selectedFood]);

		useEffect(() => {
			const timeOut = setTimeout(() => {
				if (searchInput.length > 1) {
					apiRequestFoods(searchInput);
					Keyboard.dismiss();
				}
			}, 1500);

			return () => {
				clearTimeout(timeOut);
			};
		}, [searchInput]);

		return (
			<Modal
				visible={props.isAddFoodModalVisible}
				onDismiss={() => {
					props.setIsAddFoodModalVisible(false);
					setSelectedFood(undefined);
					setFoods([]);
					setSearchInput("");
				}}
			>
				<Container
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					keyboardVerticalOffset={30}
					isAdding={mode === "addMealFood"}
				>
					{mode === "addMealFood" && (
						<SearchInput
							placeholder="Procure por um alimento"
							onChangeText={onChangeSearchInput}
							value={searchInput}
							autoFocus={true}
							onBlur={Keyboard.dismiss}
							clearIcon="delete"
						/>
					)}

					{foods.length > 0 && mode === "addMealFood" && (
						<>
							<SelectFoodText>
								Toque para selecionar o alimento
							</SelectFoodText>
							<FlatList
								onScrollBeginDrag={Keyboard.dismiss}
								style={{
									marginBottom: 20,
								}}
								contentContainerStyle={{
									alignItems: "center",
									flexDirection: "column",
								}}
								data={foods}
								keyExtractor={(food) => food.id}
								renderItem={({ item }) => {
									return (
										<FoodContainer
											style={shadowStyles.style}
											isSelected={
												item.id === selectedFood?.id
											}
											onPress={() => {
												setSelectedFood(item);
											}}
										>
											<FoodName
												isSelected={
													item.id === selectedFood?.id
												}
											>
												{item.name}
											</FoodName>
										</FoodContainer>
									);
								}}
							/>
						</>
					)}

					{selectedFood && (
						<Controller
							control={control}
							name="quantity"
							defaultValue=""
							render={({ value, onChange }) => (
								<QuantityInputForm
									value={value}
									onChangeText={(value) => {
										onChange(value);

										onChangeQuantityInput(Number(value));
									}}
									nutrients={nutrientsConsumed}
								/>
							)}
						/>
					)}
					<QuantityFormButtons
						onConfirm={() => {
							handleSubmit(
								mode === "addMealFood"
									? onSubmitAddFood
									: onSubmitEditMealFood
							)();
						}}
						onCancel={() => {
							props.setIsAddFoodModalVisible(false);
							setSelectedFood(undefined);
							setFoods([]);
							setSearchInput("");
						}}
					/>
				</Container>
			</Modal>
		);
	}
);
