import { makeAutoObservable, runInAction } from "mobx";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { Alert } from "react-native";
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

function sleep(delayMs: number) {
	return new Promise((resolve) => setTimeout(resolve, delayMs));
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

	public isLoading = true;

	private startLoading = () => {
		this.isLoading = true;
	}

	private endLoading = () => {
		this.isLoading = false;
	}

	public setSelectedDate = (date: Date) => {
		this.selectedDate = date;
	};

	public subtractDay = () => {
		this.selectedDate = subDays(this.selectedDate, 1);
	};

	public addDay = () => {
		this.selectedDate = addDays(this.selectedDate, 1);
	};

	public getDailyDiet = async () => {
		const response = await api.meals.listByUserAndDate({
			startDate: startOfDay(this.selectedDate),
			endDate: endOfDay(this.selectedDate),
		});

		runInAction(() => {
			this.dailyDiet = response.data;
		});
	};

	public loadDiet = async () => {
		this.startLoading();
		try {
			await this.getDailyDiet();
		} catch (error) {
			console.error(error);
		} finally {
			this.endLoading();
		}
	}

	public createMeal = async (mealName: string) => {
		this.startLoading();
		try {
			await api.meals.add({
				name: mealName,
				date: this.selectedDate,
			});

			await this.getDailyDiet();
		} catch (error) {
			Alert.alert("Erro ao criar refeição", "Tente novamente");
			console.error(error.message);
		} finally {
			this.endLoading();
		}
	};

	public updateMealName = async ({ mealId, name }: IUpdateMealNameRequest) => {
		this.startLoading();
		try {
			await api.meals.update({ mealId, name });

			await this.getDailyDiet();
		} catch (error) {
			Alert.alert("Erro ao atualizar refeição", "Tente novamente");
			console.error(error.message);
		} finally {
			this.endLoading();
		}
	};

	public deleteMeal = async ({ mealId }: IDeleteMealRequest) => {
		this.startLoading();
		try {
			await api.meals.delete({ mealId });

			await this.getDailyDiet();
		} catch (error) {
			Alert.alert("Erro ao deletar refeição", "Tente novamente");
			console.error(error.message);
		} finally {
			this.endLoading();
		}
	};

	// MealFoods
	public addFoodToMeal = async ({
		mealId,
		foodId,
		quantity,
		quantity_unit,
	}: IAddFoodToMealRequest) => {
		this.startLoading();
		try {
			const response = await api.mealFoods.addFoodToMeal({
				mealId,
				foodId,
				quantity,
				quantity_unit,
			});

			await this.getDailyDiet();

			return response.data;
		} catch (error) {
			console.error(error.message);
		} finally {
			this.endLoading();
		}
	};

	public deleteMealFood = async ({ mealFoodId }: IDeleteMealFoodRequest) => {
		this.startLoading();
		try {
			await api.mealFoods.delete({ mealFoodId });

			await this.getDailyDiet();
		} catch (error) {
			console.error(error.message);
		} finally {
			this.endLoading();
		}
	};
}
