import { AxiosInstance, AxiosResponse } from "axios";

interface IUser {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
}

interface IAuthenticateRequest {
	email: string;
	password: string;
}

interface IAuthenticateResponse {
	user: IUser;
	token: string;
}

interface ICreateUserRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

interface IUpdateUserRequest {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	newPassword?: string;
	newPasswordConfirmation?: string;
}

interface IDeleteUserRequest {
	userId: string;
	password: string;
}

const users = (axiosInstance: AxiosInstance) => {
	return {
		authenticate: (
			authenticationData: IAuthenticateRequest
		): Promise<AxiosResponse<IAuthenticateResponse>> => {
			return axiosInstance.post("auth", { ...authenticationData });
		},

		create: (
			createUserData: ICreateUserRequest
		): Promise<AxiosResponse<IUser>> => {
			return axiosInstance.post("users", { ...createUserData });
		},

		update: (
			updateUserData: IUpdateUserRequest
		): Promise<AxiosResponse<IUser>> => {
			return axiosInstance.put("users", { ...updateUserData });
		},

		delete: (
			deleteUserData: IDeleteUserRequest
		): Promise<AxiosResponse<IUser>> => {
			const { userId, password } = deleteUserData;
			return axiosInstance.delete(`users/${userId}`, {
				data: { password },
			});
		},
	};
};

export default users;
