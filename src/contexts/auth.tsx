import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import api from "../services/api";

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

  const handleSignIn = (signInData: SignInData) => {
    api
      .post("/auth", signInData)
      .then((response) => {
        console.log(response.data);
        setAuthState({
          user: response.data.user,
          token: response.data.token,
        });
      })
      .catch((error) => {
        Alert.alert("Erro no login", "Tente novamente");
        console.log(error);
      });
  };

  const handleSignOut = () => {
    setAuthState({
      user: undefined,
      token: "",
    });
  };

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
