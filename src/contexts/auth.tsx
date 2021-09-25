import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { AxiosResponse } from "axios";
import { showError } from "../services/flashMessage";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type ApiUser = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
  };

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | undefined;
  token: string;
  handleSignIn(signInData: SignInData): void;
  handleSignOut(): void;
  updateLocalUser(user: ApiUser): Promise<void>;
}

interface AuthProviderState {
  user: User | undefined;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<AuthProviderState>({
    user: undefined,
    token: "",
  });

  const updateLocalUser = async (user: ApiUser) => {
	const userData: User = {
		id: user.id,
		firstName: user.first_name,
		lastName: user.last_name,
		email: user.email,
	}

	await AsyncStorage.setItem(
        "@dailyFit:user",
        JSON.stringify(userData)
      );

	setAuthState({...authState, user: userData})
  }

  const handleSignIn = async (signInData: SignInData) => {
    try {
      const response = await api.users.authenticate(signInData);

      const { user, token } = response.data;

      api.axiosInstance.defaults.headers[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      await AsyncStorage.setItem(
        "@dailyFit:user",
        JSON.stringify({
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
        })
      );

      await AsyncStorage.setItem("@dailyFit:token", token);

      setAuthState({
        user: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        },
        token,
      });
    } catch (error) {
	  showError("Erro no login. Cheque as credenciais e tente novamente")
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    setAuthState({
      user: undefined,
      token: "",
    });

    await AsyncStorage.multiRemove(["@dailyFit:user", "@dailyFit:token"]);
  };

  const checkTokenValidity = async (token: string) => {
	try {
		const decodedToken: any = jwtDecode(token);
		const expirationDateSeconds = decodedToken.exp;
		const nowSeconds = Date.now()/1000;
		const isExpired = !(expirationDateSeconds && expirationDateSeconds > nowSeconds);
		if (isExpired) {
			throw new Error ("Token expired");
		}
	} catch (e) {
		await handleSignOut();
	}
  };

  useEffect(() => {
    const loadStorageData = async () => {
      const storedUser = await AsyncStorage.getItem("@dailyFit:user");
      const storedToken = await AsyncStorage.getItem("@dailyFit:token");

      if (storedUser && storedToken) {
        setAuthState({
          user: JSON.parse(storedUser),
          token: storedToken,
        });

        api.axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${storedToken}`;

		const onResponseFulfilled = (response: AxiosResponse<any>) => {
			return response;
		};

		const onResponseRejected = async (error: any) => {
			if (error.message && error.message === "Network Error") {
				showError("Erro de conexão! Tente mais tarde");
				handleSignOut();
				
			} else if (error.response.status === (401 || 403)) {
				await checkTokenValidity(storedToken);
			}

			return Promise.reject(error);
		};

		api.axiosInstance.interceptors.response.use(
			onResponseFulfilled,
			onResponseRejected
		);
      }
    };

    loadStorageData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        handleSignIn,
        handleSignOut,
		updateLocalUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
