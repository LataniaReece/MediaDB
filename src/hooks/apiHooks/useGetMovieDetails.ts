import useApiHookBase from "./useApiHookBase";
import { GetMovieDetailsReponse } from "../../types/api";

const useGetMovieDetails = (url: string) => {
  return useApiHookBase<GetMovieDetailsReponse>(url);
};

export default useGetMovieDetails;
