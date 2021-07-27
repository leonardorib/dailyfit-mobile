import { createContext } from "react";
import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import api from "../../services/api";
import {
	IMeal,
	IUpdateMealNameRequest,
	IDeleteMealRequest,
} from "../../services/api/Meals";
import {
	IAddFoodToMealRequest,
	IDeleteMealFoodRequest,
} from "../../services/api/MealFoods";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { Alert } from "react-native";

export interface INutrients {
	energy_kcal: number;
	energy_kj: number;
	carbs: number;
	proteins: number;
	fats: number;
}

export interface IDailyDiet extends INutrients {
	meals: IMeal[];
}

export default class Store {
	constructor() {
		makeAutoObservable(this);
	}

	public selectedDate: Date = new Date(Date.now());

	public dailyDiet: IDailyDiet = {
		energy_kcal: 0,
		energy_kj: 0,
		carbs: 0,
		proteins: 0,
		fats: 0,
		meals: [],
	};

	public isAddMealModalVisible: boolean = false;

	public isAddFoodModalVisible: boolean = false;

	public setSelectedDate = (date: Date) => {
		this.selectedDate = date;
	};

	public subtractDay = () => {
		this.selectedDate = subDays(this.selectedDate, 1);
	};

	public addDay = () => {
		this.selectedDate = addDays(this.selectedDate, 1);
	};

	// Meals
	public getDailyDiet = async () => {
		try {
			const response = await api.meals.listByUserAndDate({
				startDate: startOfDay(this.selectedDate),
				endDate: endOfDay(this.selectedDate),
			});

			runInAction(() => {
				this.dailyDiet = response.data;
			});
		} catch (error) {
			console.error(error.message);
		}
	};

	public createMeal = async (mealName: string) => {
		try {
			const response = await api.meals.add({
				name: mealName,
				date: this.selectedDate,
			});

			runInAction(() => {
				this.dailyDiet.meals.push({
					...response.data,
					energy_kcal: 0,
					energy_kj: 0,
					carbs: 0,
					proteins: 0,
					fats: 0,
					mealFoods: [],
				});
			});
		} catch (error) {
			Alert.alert("Erro ao criar refeição", "Tente novamente");
			console.error(error.message);
		}
	};

	public updateMealName = async ({ mealId, name }: IUpdateMealNameRequest) => {
		try {
			await api.meals.update({ mealId, name });

			const currentMeals = this.dailyDiet.meals;

			const updatedMeals = currentMeals.map((meal) => {
				if (meal.id === mealId) {
					return {
						...meal,
						name,
					};
				} else {
					return meal;
				}
			});

			runInAction(() => {
				this.dailyDiet.meals = updatedMeals;
			});
		} catch (error) {
			Alert.alert("Erro ao atualizar refeição", "Tente novamente");
			console.error(error.message);
		}
	};

	public deleteMeal = async ({ mealId }: IDeleteMealRequest) => {
		try {
			const response = await api.meals.delete({ mealId });

			const { energy_kcal, energy_kj, carbs, proteins, fats } =
				response.data;

			runInAction(() => {
				const updatedMeals = this.dailyDiet.meals.filter(
					(meal) => meal.id !== mealId
				);
				this.dailyDiet.meals = updatedMeals;
				this.dailyDiet.energy_kcal -= energy_kcal;
				this.dailyDiet.energy_kj -= energy_kj;
				this.dailyDiet.carbs -= carbs;
				this.dailyDiet.proteins -= proteins;
				this.dailyDiet.fats -= fats;
			});
		} catch (error) {
			Alert.alert("Erro ao deletar refeição", "Tente novamente");
			console.error(error.message);
		}
	};

	// MealFoods
	public addFoodToMeal = async ({
		mealId,
		foodId,
		quantity,
		quantity_unit,
	}: IAddFoodToMealRequest) => {
		try {
			const response = await api.mealFoods.addFoodToMeal({
				mealId,
				foodId,
				quantity,
				quantity_unit,
			});
			const food = response.data;
			const { energy_kcal, energy_kj, carbs, proteins, fats } = food;

			runInAction(() => {
				this.dailyDiet.energy_kcal += energy_kcal;
				this.dailyDiet.energy_kj += energy_kj;
				this.dailyDiet.carbs += carbs;
				this.dailyDiet.proteins += proteins;
				this.dailyDiet.fats += fats;

				const updatedMeals = this.dailyDiet.meals.map((meal) => {
					if (meal.id === mealId) {
						meal.mealFoods.push(food);
						return {
							...meal,
							energy_kcal: meal.energy_kcal + energy_kcal,
							energy_kj: meal.energy_kj + energy_kj,
							carbs: meal.carbs + carbs,
							proteins: meal.proteins + proteins,
							fats: meal.fats + fats,
						};
					} else {
						return meal;
					}
				});
				this.dailyDiet.meals = updatedMeals;
			});

			return response.data;
		} catch (error) {
			console.error(error.message);
		}
	};

	public deleteMealFood = async ({ mealFoodId }: IDeleteMealFoodRequest) => {
		try {
			const response = await api.mealFoods.delete({ mealFoodId });

			const { energy_kcal, energy_kj, carbs, proteins, fats, meal_id } =
				response.data;

			runInAction(() => {
				this.dailyDiet.energy_kcal -= energy_kcal;
				this.dailyDiet.energy_kj -= energy_kj;
				this.dailyDiet.carbs -= carbs;
				this.dailyDiet.proteins -= proteins;
				this.dailyDiet.fats -= fats;

				this.dailyDiet.meals.map((meal) => {
					if (meal.id === meal_id) {
						return {
							...meal,
							energy_kcal: meal.energy_kcal - energy_kcal,
							energy_kj: meal.energy_kj - energy_kj,
							carbs: meal.carbs - carbs,
							proteins: meal.proteins - proteins,
							fats: meal.fats - fats,
						};
					}
				});
			});
		} catch (error) {
			console.error(error.message);
		}
	};
}
