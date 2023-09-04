import { GetMediaResponse, Movie, Show } from "../../types/api";
import useApiHookBase from "./useApiHookBase";

// Get movie details hook
const useGetMediaDetails = (url: string) => {
  return useApiHookBase<Movie | Show>(url);
};
// Get media hook
const useGetMedia = (url: string) => {
  return useApiHookBase<GetMediaResponse>(url);
};

export { useGetMedia, useGetMediaDetails };
