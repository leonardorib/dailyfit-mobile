import React from "react";
import { observer } from "mobx-react";
import { Keyboard } from "react-native";
import { ContainerTouchable, Container, Button, ButtonText } from "./styles";

interface IQuantityFormButtonsProps {
	onConfirm: () => void;
	onCancel: () => void;
}

export const QuantityFormButtons: React.FC<IQuantityFormButtonsProps> =
	observer((props: IQuantityFormButtonsProps) => {
		const { onConfirm, onCancel } = props;

		return (
			<ContainerTouchable
				onPress={() => {
					Keyboard.dismiss();
				}}
			>
				<Container>
					<Button onPress={onCancel}>
						<ButtonText>Cancelar</ButtonText>
					</Button>
					<Button onPress={onConfirm}>
						<ButtonText>OK</ButtonText>
					</Button>
				</Container>
			</ContainerTouchable>
		);
	});
