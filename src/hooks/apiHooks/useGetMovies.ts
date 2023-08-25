import useApiHookBase from "./useApiHookBase";
import { GetMoviesResponse } from "../../types/api";

const useGetMovies = (url: string) => {
  return useApiHookBase<GetMoviesResponse>(url);
};

export default useGetMovies;
