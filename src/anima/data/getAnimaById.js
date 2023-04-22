import { useFetch } from "../";

export const getAnimaById = (id, category) => {
  if (category === "anime") {
    const { isLoading, resource, hasError } = useFetch(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );
    return { isLoading, resource, hasError };
  } else if (category === "manga") {
    const { isLoading, resource, hasError } = useFetch(
      `https://api.jikan.moe/v4/manga/${id}/full`
    );
    return { isLoading, resource, hasError };
  } else {
    return {
      isLoading: null,
      resource: null,
      hasError: true,
    };
  }
};
