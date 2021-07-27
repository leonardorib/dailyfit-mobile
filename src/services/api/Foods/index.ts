import { AxiosInstance, AxiosResponse } from "axios";

interface INutrients {
	energy_kcal: number;
	energy_kj: number;
	carbs: number;
	proteins: number;
	fats: number;
}

export interface IFood extends INutrients {
	id: string;
	name: string;
	standard_quantity: number;
	standard_quantity_unit: string;
}

export interface IListFoodsByNameRequest {
	foodName: string;
}

const foods = (axiosInstance: AxiosInstance) => {
	return {
		listByName: (
			listByNameData: IListFoodsByNameRequest
		): Promise<AxiosResponse<IFood[]>> => {
			const { foodName } = listByNameData;
			return axiosInstance.get("foods", {
				params: {
					foodName,
				},
			});
		},
	};
};

export default foods;
