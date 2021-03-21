import { AxiosInstance, AxiosResponse } from "axios";

interface INutrients {
  energy_kcal: number;
  energy_kj: number;
  carbs: number;
  proteins: number;
  fats: number;
}

interface IMealFood extends INutrients {
  id: string;
  food_id: string;
  meal_id: string;
  name: string;
  quantity: number;
  quantity_unit: string;
}

export interface IAddFoodToMealRequest {
  mealId: string;
  foodId: string;
  quantity: number;
  quantity_unit: string;
}

interface IUpdateMealFoodRequest {
  quantity: number;
  foodId: string;
}

export interface IDeleteMealFoodRequest {
  mealFoodId: string;
}

const mealFoods = (axiosInstance: AxiosInstance) => {
  return {
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
      return axiosInstance.put("mealfoods", {
        ...updateMealFoodData,
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
