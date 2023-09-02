import { useState, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  ErrorResponse,
  Genre,
  GetGenresResponse,
  GetMediaResponse,
  Movie,
  Tv,
} from "../../types/api";
import useApiHookBase from "./useApiHookBase";

const api_key = import.meta.env.VITE_API_KEY;

// Get genres hook
const useGetGenres = () => {
  const [data, setData] = useState<Genre[]>(
    JSON.parse(localStorage.getItem("genreData") || "[]")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Check if data is already in localStorage
      const cachedData = localStorage.getItem("genreData");
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }

      try {
        const response: AxiosResponse<GetGenresResponse> = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            params: {
              api_key,
            },
          }
        );
        setData(response.data.genres);
        setIsLoading(false);

        // Save data to localStorage
        localStorage.setItem("genreData", JSON.stringify(response.data.genres));
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
  }, []);

  return { data, isLoading, error };
};

// Get movie details hook
const useGetMediaDetails = (url: string) => {
  return useApiHookBase<Movie | Tv>(url);
};
// Get media hook
const useGetMedia = (url: string) => {
  return useApiHookBase<GetMediaResponse>(url);
};

export { useGetGenres, useGetMedia, useGetMediaDetails };
