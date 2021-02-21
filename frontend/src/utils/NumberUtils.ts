export const getThousands = (number: number): string => {
  const thousand = 1000;
  if (number < thousand) return number.toFixed(5).toString();
  return (number / thousand).toFixed(2).toString() + "k";
};

export const getMillions = (number: number): string => {
  const million = 1000000;
  if (number < million) return number.toFixed(5).toString();
  return (number / million).toFixed(2).toString() + "M";
};
