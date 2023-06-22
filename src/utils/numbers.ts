export const getFixedNumber = (num: number, amount: number) =>
  Math.floor(num * Math.pow(10, amount)) / Math.pow(10, amount);

export const numberIsFine = (num: number) =>
  Number.isFinite(num) && !Number.isNaN(num);
