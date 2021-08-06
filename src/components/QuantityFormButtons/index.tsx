import React from "react";
import {
	Container,
	Button,
	ButtonText,
} from "./styles";
import { observer } from "mobx-react";

interface IQuantityFormButtonsProps {
	onConfirm: () => void;
	onCancel: () => void;
}

export const QuantityFormButtons: React.FC<IQuantityFormButtonsProps> =
	observer((props: IQuantityFormButtonsProps) => {
		const { onConfirm, onCancel } = props;

		return (
			<Container>
				<Button
					onPress={onCancel}
				>
					<ButtonText>Cancelar</ButtonText>
				</Button>
				<Button
					onPress={onConfirm}
				>
					<ButtonText>OK</ButtonText>
				</Button>
			</Container>
		);
	});
