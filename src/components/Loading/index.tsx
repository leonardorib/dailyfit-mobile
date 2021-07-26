import React from "react";
import { ActivityIndicator } from "react-native";
import { Container } from "./styles";

const Loading: React.FC = () => {
  return (
    <Container>
        <ActivityIndicator />
    </Container>
  );
};

export default Loading;
