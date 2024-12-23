export const truncateText = (text: string, length: number, trim = true) => {
  if (trim) {
    text = text.trim();
  }
  return text.length > length ? text.substring(0, length) + "..." : text;
};
