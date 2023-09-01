import React, { createContext, ReactNode, useContext } from "react";
import { MovieGenreContextType } from "../types/contexts";
import { useGetGenres } from "../hooks/apiHooks/movieApiHooks";

export const MovieGenreContext = createContext<
  MovieGenreContextType | undefined
>(undefined);

interface MovieGenreProviderProps {
  children: ReactNode;
}

export const MovieGenreProvider: React.FC<MovieGenreProviderProps> = ({
  children,
}) => {
  const genreApiData = useGetGenres();

  return (
    <MovieGenreContext.Provider value={genreApiData}>
      {children}
    </MovieGenreContext.Provider>
  );
};

export const useMovieGenreContext = (): MovieGenreContextType => {
  const context = useContext(MovieGenreContext);
  if (!context) {
    throw new Error(
      "useMovieGenreContext must be used within a MovieGenreProvider"
    );
  }
  return context;
};
