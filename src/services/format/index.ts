export const roundOneDecimal = (number: number): number => {
	return Math.round(number * 10) / 10;
};

export const formatNutrient = (number: number): string => {
	if (number < 1000000) {
		return roundOneDecimal(number).toString();
	}
	return number.toExponential(2);
};

