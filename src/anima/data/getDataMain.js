import data from "./dataMain.json";

export const getDataMain = (type) => {
  return type === "anime" ? data.anime : data.manga;
};
