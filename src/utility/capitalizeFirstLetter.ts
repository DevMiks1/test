export const capitalizeFirstLetter = (results: string): string => {
  if (!results) return "";
  return results.charAt(0).toUpperCase() + results.slice(1).toLowerCase();
};
