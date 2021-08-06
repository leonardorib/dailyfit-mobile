import { makeAutoObservable, runInAction } from "mobx";
import api from "../../services/api";
import { IMeal } from "../../services/api/Meals";
import { Alert } from "react-native";
import { IMealFood } from "../../services/api/MealFoods";

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
	public mealId: string;

	public meal: IMeal | null = null;

	public selectedMealFood: IMealFood | null = null;

	constructor(mealId: string) {
		makeAutoObservable(this);
		this.mealId = mealId;
		this.loadMeal();
	}

	public setMealFood = (mealFood: IMealFood | null) => {
		this.selectedMealFood = mealFood;
	}

	public loadMeal = async () => {
		try {
			const response = await api.meals.getById(this.mealId);

			runInAction(() => {
				this.meal = response.data;
			});
		} catch (e) {
			Alert.alert("Erro", "Erro ao carregar refeição");
		}
	};

	public deleteMealFood = async (mealFoodId: string) => {
		try {
			await api.mealFoods.delete({ mealFoodId });
		} catch (e) {
			Alert.alert("Erro", "Erro ao deletar refeição");
		} finally {
			await this.loadMeal();
		}
	}
}
