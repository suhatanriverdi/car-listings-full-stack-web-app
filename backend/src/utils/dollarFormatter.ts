export const dollarFormatter = (
  value: number,
  decimalPlaces: number = 0,
): string => {
  // Ensure the value is a number
  if (isNaN(value)) {
    throw new Error('Invalid number');
  }

  // Format the number as a dollar amount
  return `$ ${value
    .toFixed(decimalPlaces)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
