import React, { useState } from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import { AntDesign, Feather } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
	Container,
	Content,
	SelectedDateContainer,
	DateText,
	ArrowLeftButton,
	ArrowRightButton,
	shadowStyles,
} from "./styles";

interface IProps {
	date: Date;
	addDay: () => void;
	subtractDay: () => void;
	onConfirmDate: (date: Date) => void;
	isEnabled: boolean;
}

export const DateSelector: React.FC<IProps> = observer((props) => {
	const {date, addDay, subtractDay, onConfirmDate, isEnabled} = props;

	const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

	return (
		<>
			<Container style={shadowStyles.style}>
				<Content>
					<ArrowLeftButton
						onPress={subtractDay}
						enabled={isEnabled}
					>
						<Feather name="chevron-left" size={24} color="#444540" />
					</ArrowLeftButton>
					<SelectedDateContainer
						onPress={() => {
							setIsDatePickerVisible(true);
						}}
						enabled={isEnabled}
					>
						<DateText>
							{format(date, "dd/MM/yyyy") ===
							format(new Date(), "dd/MM/yyyy")
								? "Hoje"
								: format(date, "dd/MM/yyyy")}
						</DateText>
						<AntDesign name="caretdown" size={10} color="#444540" />
					</SelectedDateContainer>
					<ArrowRightButton
						onPress={addDay}
						enabled={isEnabled}
					>
						<Feather name="chevron-right" size={24} color="#444540" />
					</ArrowRightButton>
				</Content>
			</Container>
			{isDatePickerVisible && (
				<DateTimePickerModal
					isVisible={isDatePickerVisible}
					headerTextIOS="Selecione uma data"
					confirmTextIOS="Confirmar"
					cancelTextIOS="Cancelar"
					textColor="black"
					isDarkModeEnabled={false}
					date={date}
					mode="date"
					onConfirm={(date) => {
						setIsDatePickerVisible(false);
						onConfirmDate(date);
					}}
					onCancel={() => setIsDatePickerVisible(false)}
					locale="pt-BR"
				/>
			)}
		</>
	);
});
