import { useMemo } from "react";
import { useFetch } from "../";
import { useEffect } from "react";
import data from "./data.json";
import dataManga from "./dataManga.json";
export const getData = (category) => {
  return category === "anime" ? data.anime : dataManga.manga;
};
