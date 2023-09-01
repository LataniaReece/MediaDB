import useApiHookBase from "./useApiHookBase";
import { Movie } from "../../types/api";

const useGetMovieDetails = (url: string) => {
  return useApiHookBase<Movie>(url);
};

export default useGetMovieDetails;
