import { AxiosInstance, AxiosResponse } from "axios";
import { IFood } from "../Foods";

interface INutrients {
	energy_kcal: number;
	energy_kj: number;
	carbs: number;
	proteins: number;
	fats: number;
}

export interface IMealFood extends INutrients {
	id: string;
	food_id: string;
	meal_id: string;
	name: string;
	quantity: number;
	quantity_unit: string;
	food: IFood;
}

export interface IAddFoodToMealRequest {
	mealId: string;
	foodId: string;
	quantity: number;
	quantity_unit: string;
}

interface IUpdateMealFoodRequest {
	mealFoodId: string;
	quantity: number;
	foodId: string;
}
export interface IDeleteMealFoodRequest {
	mealFoodId: string;
}

const mealFoods = (axiosInstance: AxiosInstance) => {
	return {
		getById: (
			mealFoodId: string
		): Promise<AxiosResponse<IMealFood>> => {
			return axiosInstance.put(`mealfoods/${mealFoodId}`);
		},

		addFoodToMeal: (
			addFoodToMealData: IAddFoodToMealRequest
		): Promise<AxiosResponse<IMealFood>> => {
			return axiosInstance.post("mealfoods", {
				...addFoodToMealData,
			});
		},

		update: (
			updateMealFoodData: IUpdateMealFoodRequest
		): Promise<AxiosResponse<IMealFood>> => {
			const { mealFoodId, ...updateData } = updateMealFoodData;
			return axiosInstance.put(`mealfoods/${mealFoodId}`, {
				...updateData,
			});
		},

		delete: (
			deleteMealFoodData: IDeleteMealFoodRequest
		): Promise<AxiosResponse<IMealFood>> => {
			const { mealFoodId } = deleteMealFoodData;
			return axiosInstance.delete(`mealfoods/${mealFoodId}`);
		},
	};
};

export default mealFoods;
