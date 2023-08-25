import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "../../types/api";

const api_key = import.meta.env.VITE_API_KEY;

interface BaseApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: ErrorResponse | null;
}

const useApiHookBase = <T>(url: string): BaseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          params: {
            api_key,
          },
        });
        setData(response.data);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          setError({ message: error.response.data.message });
        } else {
          setError({ message: "An error occurred" });
        }
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useApiHookBase;
