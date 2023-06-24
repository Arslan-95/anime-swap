export const checkSome = <T>(targetItem: T, items: T[]) => {
  return items.some((item) => item === targetItem);
};
