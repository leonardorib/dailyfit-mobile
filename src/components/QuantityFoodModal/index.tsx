import React, { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { Modal } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { showMessage } from "react-native-flash-message";
import { observer } from "mobx-react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import api from "../../services/api";
import { IMeal } from "../../services/api/Meals";
import { IFood } from "../../services/api/Foods";
import { INutrients } from "../../services/api/Nutrients";
import {
	IAddFoodToMealRequest,
	IMealFood,
	IUpdateMealFoodRequest,
} from "../../services/api/MealFoods";
import { showError } from "../../services/flashMessage";

import { QuantityInputForm } from "../QuantityInputForm";
import { QuantityFormButtons } from "../QuantityFormButtons";
import { Loading } from "../Loading";

import {
	Container,
	SearchInput,
	SelectFoodText,
	FoodContainer,
	FoodName,
	shadowStyles,
} from "./styles";

interface FoodQuantityInput {
	quantity: number;
}

const foodQuantitySchema = yup.object().shape({
	quantity: yup
				.number()
				.typeError("Quantidade deve ser um número")
				.moreThan(0, "Quantidade deve ser positiva")
				.required("Informe uma quantidade")
				.max(1000000000000, "Valor muito alto!"),
});

interface IQuantityFoodModalProps {
	meal: IMeal;
	mode: "addMealFood" | "editMealFood";
	initialMealFood?: IMealFood;
	isVisible: boolean;
	handleAddFood: (addFoodData: IAddFoodToMealRequest) => Promise<void>;
	handleEditFood: (editFoodData: IUpdateMealFoodRequest) => Promise<void>;
	closeModal: () => void;
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
		const {
			handleAddFood,
			handleEditFood,
			mode,
			initialMealFood,
			onSubmit,
			closeModal,
		} = props;
		const [searchInput, setSearchInput] = useState("");
		const [isSearchRequestLoading, setIsSearchRequestLoading] = useState(false);
		const [isSearchTypingLoading, setIsSearchTypingLoading] = useState(false);
		const [foods, setFoods] = useState<IFood[]>([]);
		const [selectedFood, setSelectedFood] = useState<IFood | undefined>(
			undefined
		);
		const [nutrientsConsumed, setNutrientsConsumed] =
			useState<INutrients>(initialNutrients);

		const { control, handleSubmit, errors } = useForm<FoodQuantityInput>({
			resolver: yupResolver(foodQuantitySchema),
			mode: "onChange",
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

			closeModal();

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
			closeModal();
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
					energy_kcal: proportionFactor * selectedFood.energy_kcal,
					energy_kj: proportionFactor * selectedFood.energy_kj,
					carbs: proportionFactor * selectedFood.carbs,
					proteins: proportionFactor * selectedFood.proteins,
					fats: proportionFactor * selectedFood.fats,
				});
			}
		};

		const apiRequestFoods = async (foodName: string) => {
			setIsSearchRequestLoading(true);
			try {
				const response = await api.foods.listByName({ foodName });
				setFoods(response.data);
			} catch (e) {
				console.error(e.messages || e);
				showError("Erro carregando alimentos");
			} finally {
				setIsSearchRequestLoading(false);
			}
		};

		useEffect(() => {
			const quantityInput = control.getValues().quantity;
			if (quantityInput) onChangeQuantityInput(quantityInput);
		}, [selectedFood]);

		useEffect(() => {
			if(initialMealFood) setSelectedFood(initialMealFood.food);
		}, [initialMealFood]);

		useEffect(() => {
			if (searchInput.length >= 1) {
				setIsSearchTypingLoading(true)
			};
			const timeOut = setTimeout(() => {
				if (searchInput.length > 1) {
					setIsSearchTypingLoading(false);
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
				visible={props.isVisible}
				onDismiss={() => {
					closeModal();
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
							icon={isSearchTypingLoading ? () => <Loading /> : undefined}
						/>
					)}

					{mode === "addMealFood" && (
						<>
							{foods.length > 0 &&
								<SelectFoodText>
									Toque para selecionar o alimento
								</SelectFoodText>
							}
							<FlatList
								onScrollBeginDrag={Keyboard.dismiss}
								style={{
									marginBottom: 20,
									width: "100%",
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
								ListEmptyComponent={
									isSearchRequestLoading ? <Loading /> : undefined
								}
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
										const valueWithPointAsSeparator = value.replace(",", ".");
										onChange(valueWithPointAsSeparator);

										onChangeQuantityInput(Number(valueWithPointAsSeparator));
									}}
									nutrients={nutrientsConsumed}
								/>
							)}
						/>
					)}
					<QuantityFormButtons
						onConfirm={() => {
							if (errors.quantity) {
								showMessage({
									position: "top",
									message: errors.quantity.message || "Valor inválido",
									type: "danger",
								});
							}
							handleSubmit(
								mode === "addMealFood"
									? onSubmitAddFood
									: onSubmitEditMealFood
							)();
						}}
						onCancel={() => {
							closeModal();
							setSelectedFood(undefined);
							setFoods([]);
							setSearchInput("");
							setNutrientsConsumed(initialNutrients);
						}}
					/>
				</Container>
			</Modal>
		);
	}
);
