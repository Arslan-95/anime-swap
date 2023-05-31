export const formatCurrencyAmount = (value: string) => {
  if (!value) return value;

  const withoutComma = value.replace(',', '.');
  const matched = withoutComma.match(/^[0-9]+\.?([0-9]+)?/g);
  const formattedValue = matched ? matched[0] : '';

  return formattedValue;
};
