import React, { useCallback, useState, useEffect } from "react";
import { Platform, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Modal, Portal } from "react-native-paper";
import { observer, useLocalObservable } from "mobx-react";
import {
	Header,
	TotalConsumptionBox,
	FoodCard,
	Loading,
	QuantityFoodModal,
	BottomFadeout,
} from "../../components";
import {
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Container,
	TitleContainer,
	TitleText,
	MealNameText,
	AddFoodButton,
	AddMealButtonText,
	BottomButtonsBox,
	shadowStyles,
	GoBackButton,
} from "./styles";
import Store from "./store";
import {
	IAddFoodToMealRequest,
	IUpdateMealFoodRequest,
} from "../../services/api/MealFoods";
import api from "../../services/api";

interface IProps {
	route: any;
}

export const EditMeal: React.FC<IProps> = observer(({ route }) => {
	const store = useLocalObservable(() => new Store(route.params.mealId));
	const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);
	const [isEditMealFoodModalVisible, setIsEditMealFoodModalVisible] =
		useState(false);
	const { selectedMealFood, setMealFood } = store;
	const handleAddFood = useCallback(
		async ({
			mealId,
			foodId,
			quantity,
			quantity_unit,
		}: IAddFoodToMealRequest) => {
			await api.mealFoods.addFoodToMeal({
				mealId,
				foodId,
				quantity,
				quantity_unit,
			});
		},
		[]
	);

	const handleEditFood = useCallback(
		async ({ mealFoodId, foodId, quantity }: IUpdateMealFoodRequest) => {
			await api.mealFoods.update({
				mealFoodId,
				foodId,
				quantity,
			});
		},
		[]
	);

	useEffect(() => {
		store.loadMeal();
	}, []);

	const closeEditModal = () => {
		setIsEditMealFoodModalVisible(false);
		setMealFood(undefined);
	};

	const closeAddModal = () => {
		setIsAddFoodModalVisible(false);
	};

	const navigation = useNavigation();

	return (
		<SafeAreaView>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				{}
				<Header />
				<ScrollView contentContainerStyle={{ paddingBottom: 80 }} >
					{!store.meal || store.isLoading ? (
						<Loading />
					) : (
						<Container>
							<TitleContainer style={shadowStyles.style}>
								<TitleText>Refeição</TitleText>
								<MealNameText>{store.meal.name}</MealNameText>
							</TitleContainer>

							<TotalConsumptionBox
								energy_kcal={store.meal.energy_kcal}
								carbs={store.meal.carbs}
								proteins={store.meal.proteins}
								fats={store.meal.fats}
							/>

							{store.meal.mealFoods.map((mealFood) => (
								<FoodCard
									key={mealFood.id}
									mealFood={mealFood}
									deleteMealFood={() => {
										store.deleteMealFood(mealFood.id);
									}}
									editMealFood={() => {
										setMealFood(mealFood);
										setIsEditMealFoodModalVisible(true);
									}}
								/>
							))}
							{/* Edit Meal Food Modal */}
							<Portal>
								<QuantityFoodModal
									meal={store.meal}
									isVisible={isEditMealFoodModalVisible}
									closeModal={closeEditModal}
									mode="editMealFood"
									initialMealFood={selectedMealFood}
									handleAddFood={handleAddFood}
									handleEditFood={handleEditFood}
									onSubmit={store.loadMeal}
								/>
							</Portal>
							{/*Add Meal Food Modal */}
							<Portal>
								<QuantityFoodModal
									meal={store.meal}
									isVisible={isAddFoodModalVisible}
									closeModal={closeAddModal}
									mode="addMealFood"
									handleAddFood={handleAddFood}
									handleEditFood={handleEditFood}
									onSubmit={store.loadMeal}
								/>
							</Portal>
						</Container>
					)}
				</ScrollView>

				<BottomFadeout />

				<BottomButtonsBox>
					<GoBackButton
						style={shadowStyles.style}
						onPress={() => {
							navigation.navigate("DailyDiet");
						}}
					>
						<AntDesign name="back" size={30} color="#76c7c5" />
						<AddMealButtonText>Dieta</AddMealButtonText>
					</GoBackButton>

					<AddFoodButton
						style={shadowStyles.style}
						onPress={() => {
							setIsAddFoodModalVisible(true);
						}}
					>
						<AntDesign
							name="pluscircleo"
							size={40}
							color="#76c7c5"
						/>
						<AddMealButtonText>
							Adicionar {"\n"} alimento
						</AddMealButtonText>
					</AddFoodButton>
				</BottomButtonsBox>
			</KeyboardAvoidingView>
			{/* Add Food Modal */}
			<Modal
				visible={isAddFoodModalVisible}
				onDismiss={() => {
					setIsAddFoodModalVisible(false);
				}}
			>
				<View>
					<Text>Teste</Text>
				</View>
			</Modal>
		</SafeAreaView>
	);
});
