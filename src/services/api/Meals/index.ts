import { AxiosInstance, AxiosResponse } from "axios";
import { IMealFood } from "../MealFoods";
interface INutrients {
	energy_kcal: number;
	energy_kj: number;
	carbs: number;
	proteins: number;
	fats: number;
}
export interface IMeal extends INutrients {
	id: string;
	name: string;
	date: Date;
	mealFoods: IMealFood[];
}

interface IListByUserAndDateRequest {
	startDate: Date;
	endDate: Date;
}

interface IListByUserAndDateResponse extends INutrients {
	meals: IMeal[];
}

export interface IAddMealRequest {
	name: string;
	date: Date;
}

interface IAddMealResponse {
	id: string;
	user_id: string;
	name: string;
	date: Date;
}

export interface IDeleteMealRequest {
	mealId: string;
}

export interface IUpdateMealNameRequest {
	mealId: string;
	name: string;
}

interface IUpdateMealNameResponse {
	id: string;
	user_id: string;
	name: string;
	date: Date;
}

const meals = (axiosInstance: AxiosInstance) => {
	return {
		listByUserAndDate: (
			listMealsData: IListByUserAndDateRequest
		): Promise<AxiosResponse<IListByUserAndDateResponse>> => {
			return axiosInstance.get("meals", {
				params: {
					...listMealsData,
				},
			});
		},

		getById: (mealId: string): Promise<AxiosResponse<IMeal>> => {
			return axiosInstance.get(`meals/${mealId}`);
		},

		add: (
			addMealData: IAddMealRequest
		): Promise<AxiosResponse<IAddMealResponse>> => {
			return axiosInstance.post<IAddMealResponse>("meals", {
				...addMealData,
			});
		},

		update: (
			updateMealNameData: IUpdateMealNameRequest
		): Promise<AxiosResponse<IUpdateMealNameResponse>> => {
			const { mealId } = updateMealNameData;

			return axiosInstance.put(`meals/${mealId}`);
		},

		delete: (
			deleteMealData: IDeleteMealRequest
		): Promise<AxiosResponse<IMeal>> => {
			const { mealId } = deleteMealData;

			return axiosInstance.delete(`meals/${mealId}`);
		},
	};
};

export default meals;
