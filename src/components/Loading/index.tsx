import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./styles";

export const Loading: React.FC = () => {
  return (
    <Container>
        <ActivityIndicator />
    </Container>
  );
};
