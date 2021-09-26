import { makeAutoObservable, runInAction } from "mobx";
import api from "../../services/api";
import { IMeal } from "../../services/api/Meals";
import { IMealFood } from "../../services/api/MealFoods";
import { showError } from "../../services/flashMessage";

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

	public selectedMealFood: IMealFood | undefined = undefined;

	public isLoading = true;

	private startLoading = () => {
		this.isLoading = true;
	}

	private endLoading = () => {
		this.isLoading = false;
	}

	constructor(mealId: string) {
		makeAutoObservable(this);
		this.mealId = mealId;
	}

	public setMealFood = (mealFood: IMealFood | undefined) => {
		this.selectedMealFood = mealFood;
	}

	private getMeal = async () => {
		const response = await api.meals.getById(this.mealId);

		runInAction(() => {
			this.meal = response.data;
		});
	}

	public loadMeal = async () => {
		this.startLoading();
		try {
			await this.getMeal();
		} catch (e) {
			showError("Erro ao carregar refeição");
		} finally {
			this.endLoading();
		}
	};

	public deleteMealFood = async (mealFoodId: string) => {
		this.startLoading();
		try {
			await api.mealFoods.delete({ mealFoodId });

			await this.getMeal();
		} catch (e) {
			showError("Erro ao deletar refeição");
		} finally {
			this.endLoading();
		}
	}
}
