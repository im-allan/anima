export const getEllipsis = (text) => {
  if (!text) return "No posee sinopsis";
  return text.slice(0, 120) + (text.length > 120 ? "..." : "");
};
