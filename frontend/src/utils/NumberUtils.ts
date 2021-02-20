export const getThousands = (number: number): string => {
  const thousand = 1000;
  if (number < thousand) return number.toString();
  return (number / thousand).toString() + "k";
};
