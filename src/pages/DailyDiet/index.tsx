import React, { useState } from "react";
import { Platform, View } from "react-native";
import {
	DefaultTheme,
	Provider as PaperProvider,
	Modal,
} from "react-native-paper";
import { observer, useLocalObservable } from "mobx-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Header, Loading, TotalConsumptionBox, DateSelector } from "../../components";
import { Meal } from "./components";
import Store from "./store";

import {
	SafeAreaView,
	KeyboardAvoidingView,
	ScrollView,
	Container,
	DietContainer,
	AddMealButton,
	AddMealButtonText,
	AddMealModalInnerView,
	AddMealModalText,
	AddMealModalInput,
	ErrorText,
	AddMealModalButtonsView,
	AddMealModalButton,
	AddMealModalButtonText,
	shadowStyles,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export interface IAddFood {
	foodId: string;
	quantity: number;
	quantity_unit: string;
}
interface AddMealForm {
	mealName: string;
}

const addMealSchema = yup.object().shape({
	mealName: yup.string().required("Informe um nome!"),
});

export const DailyDiet: React.FC = observer(() => {
	const store = useLocalObservable(() => new Store());
	const {
		selectedDate,
		setSelectedDate,
		addDay,
		subtractDay,
		loadDiet,
		isLoading,
		dailyDiet,
	} = store;
	const [isAddMealModalVisible, setIsAddMealModalVisible] = useState(false);

	const {
		control: controlAddMeal,
		handleSubmit: handleSubmitAddMeal,
		errors: errorsAddMeal,
		getValues: getAddMealValue,
	} = useForm<AddMealForm>({
		resolver: yupResolver(addMealSchema),
	});

	const onSubmitAddMeal = async (formData: AddMealForm) => {
		await store.createMeal(formData.mealName);
	};

	useFocusEffect(
		useCallback(() => {
			loadDiet();
		}, [store.selectedDate])
	);

	return (
		<PaperProvider theme={DefaultTheme}>
			<SafeAreaView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : undefined}
				>
					<Header />
					<ScrollView>
						<Container>
							<DateSelector
								date={selectedDate}
								addDay={addDay}
								subtractDay={subtractDay}
								isEnabled={!isLoading}
								onConfirmDate={(date: Date) => {
									setSelectedDate(date);
								}}
							/>
							{isLoading && (
								<Loading/> )}
								<DietContainer visible={!isLoading} >
									<TotalConsumptionBox
										energy_kcal={dailyDiet.energy_kcal}
										carbs={dailyDiet.carbs}
										proteins={dailyDiet.proteins}
										fats={dailyDiet.fats}
									/>

									{dailyDiet.meals &&
										dailyDiet.meals.map((meal) => {
											return (
												<Meal
													key={meal.id}
													meal={meal}
													screenStore={store}
												/>
											);
										})}
								</DietContainer>
						</Container>
					</ScrollView>

					<AddMealButton
						style={shadowStyles.style}
						onPress={() => {
							setIsAddMealModalVisible(true);
						}}
						enabled={!isLoading}
					>
						<AntDesign
							name="pluscircleo"
							size={40}
							color="#76c7c5"
						/>
						<AddMealButtonText>
							Adicionar refeição
						</AddMealButtonText>
					</AddMealButton>
				</KeyboardAvoidingView>
				{/* Add Meal Modal */}
				<Modal
					visible={isAddMealModalVisible}
					onDismiss={() => {
						setIsAddMealModalVisible(false);
					}}
				>
					<View>
						<AddMealModalInnerView
							behavior={
								Platform.OS === "ios" ? "padding" : undefined
							}
						>
							<AddMealModalText>
								Dê um nome para sua refeição
							</AddMealModalText>
							<Controller
								name="mealName"
								defaultValue=""
								control={controlAddMeal}
								render={({ value, onChange }) => {
									return (
										<>
											<AddMealModalInput
												autoFocus={true}
												value={value}
												onChangeText={(value) =>
													onChange(value)
												}
												returnKeyType="send"
												onSubmitEditing={() => {
													handleSubmitAddMeal(
														onSubmitAddMeal
													)();

													if (value.length > 0) {
														setIsAddMealModalVisible(
															false
														);
													}
												}}
											/>
										</>
									);
								}}
							/>

							{errorsAddMeal.mealName?.message && (
								<ErrorText>
									{errorsAddMeal.mealName?.message}
								</ErrorText>
							)}

							<AddMealModalButtonsView>
								<AddMealModalButton
									onPress={() => {
										setIsAddMealModalVisible(false);
									}}
								>
									<AddMealModalButtonText>
										Cancelar
									</AddMealModalButtonText>
								</AddMealModalButton>
								<AddMealModalButton
									onPress={() => {
										handleSubmitAddMeal(onSubmitAddMeal)();
										if (
											getAddMealValue("mealName").length >
											0
										) {
											setIsAddMealModalVisible(false);
										}
									}}
								>
									<AddMealModalButtonText>
										Confirmar
									</AddMealModalButtonText>
								</AddMealModalButton>
							</AddMealModalButtonsView>
						</AddMealModalInnerView>
					</View>
				</Modal>
			</SafeAreaView>
		</PaperProvider>
	);
});
