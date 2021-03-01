const roundTwoDecimals = (number: number): number => {
  return Math.round(number * 100) / 100;
};

export default roundTwoDecimals;
