import axios from "axios";
import meals from "./Meals";
import foods from "./Foods";
import mealFoods from "./MealFoods";
import users from "./Users";

const productionApiUrl = "https://api.dailyfit.leonardoribeiro.com";
const developmentApiUrl = "http://192.168.1.71:3334";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction ? productionApiUrl : developmentApiUrl;

export const axiosInstance = axios.create({
	baseURL: apiUrl,
});

const api = {
	axiosInstance,
	meals: meals(axiosInstance),
	foods: foods(axiosInstance),
	mealFoods: mealFoods(axiosInstance),
	users: users(axiosInstance),
};

export default api;
