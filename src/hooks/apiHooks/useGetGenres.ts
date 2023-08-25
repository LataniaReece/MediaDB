import useApiHookBase from "./useApiHookBase";
import { GetGenresResponse } from "../../types/api";

const useGetGenres = (url: string) => {
  return useApiHookBase<GetGenresResponse>(url);
};

export default useGetGenres;
