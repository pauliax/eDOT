export const getThousands = (number: number): string => {
  const thousand = 1000;
  if (number < thousand) return number.toFixed(5).toString();
  return (number / thousand).toFixed(2).toString() + "k";
};
