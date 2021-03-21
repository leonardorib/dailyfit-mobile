import axios from "axios";
import meals from "./Meals";
import foods from "./Foods";
import mealFoods from "./MealFoods";
import users from "./Users";

export const axiosInstance = axios.create({
  baseURL: "http://192.168.1.71:3333",
});

const api = {
  axiosInstance,
  meals: meals(axiosInstance),
  foods: foods(axiosInstance),
  mealFoods: mealFoods(axiosInstance),
  users: users(axiosInstance),
};

export default api;
