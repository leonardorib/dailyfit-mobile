import React, { useState } from "react";
import { Modal, View, ModalProps, Button, Text } from "react-native";

import { Container, SearchInput, ModalButton, ModalButtonText } from "./styles";

interface AddFoodModalContent {
  isAddFoodModalVisible: boolean;
  setIsAddFoodModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFoodModal: React.FC<AddFoodModalContent> = (
  props: AddFoodModalContent
) => {
  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (value: string) => {
    setSearchInput(value);
  };

  return (
    <Container>
      <SearchInput
        placeholder="Procure por um alimento"
        onChangeText={onChangeSearchInput}
        value={searchInput}
        autoFocus={true}
      />

      <ModalButton
        onPress={() => {
          props.setIsAddFoodModalVisible(false);
        }}
      >
        <ModalButtonText>Cancelar</ModalButtonText>
      </ModalButton>
    </Container>
  );
};

export default AddFoodModal;
