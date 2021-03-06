import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  firstName: string;
  lastName: string;
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
      Alert.alert("Erro no login", "Tente novamente");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
