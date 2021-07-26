import React, { useState } from "react";
import { Platform, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
	DefaultTheme,
	Provider as PaperProvider,
	Modal,
} from "react-native-paper";
import { observer, useLocalObservable } from "mobx-react";
import Header from "../../components/Header";
import TotalConsumptionBox from "../../components/TotalConsumptionBox";
import FoodCard from "../../components/FoodCard";
import Loading from "../../components/Loading";
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

interface IProps {
	route: any;
}

const EditMeal: React.FC<IProps> = observer(({ route }) => {
	const localStore = useLocalObservable(() => new Store(route.params.mealId));
	const [isAddFoodModalVisible, setIsAddFoodModalVisible] = useState(false);

	const navigation = useNavigation();

	return (
		<PaperProvider theme={DefaultTheme}>
			<SafeAreaView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					{}
					<Header />
					<ScrollView>
						{!localStore.meal ? (
							<Loading />
						) : (
							<Container>
								<TitleContainer style={shadowStyles.style}>
									<TitleText>Refeição</TitleText>
									<MealNameText>{localStore.meal.name}</MealNameText>
								</TitleContainer>

								<TotalConsumptionBox
									energy_kcal={localStore.meal.energy_kcal}
									carbs={localStore.meal.carbs}
									proteins={localStore.meal.proteins}
									fats={localStore.meal.fats}
								/>

								{
									localStore.meal.mealFoods.map(food => (
										<FoodCard
											key={food.id}
											mealFood={food}
											deleteMealFood={() => {
												console.log("delete"); // TODO
											}}
											editMealFood={() => {
												console.log("edit"); // TODO
											}}
										/>
									))
								}
							</Container>
						)}
					</ScrollView>

					<BottomButtonsBox>
						<GoBackButton
							style={shadowStyles.style}
							onPress={() => {
								navigation.goBack();
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
		</PaperProvider>
	);
});

export default EditMeal;
