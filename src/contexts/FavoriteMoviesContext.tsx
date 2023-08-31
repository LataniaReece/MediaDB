import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { FavoriteMoviesContextType } from "../types/contexts";

export const FavoriteMoviesContext = createContext<
  FavoriteMoviesContextType | undefined
>(undefined);

interface FavoriteMoviesProviderProps {
  children: ReactNode;
}

export const FavoriteMoviesProvider: React.FC<FavoriteMoviesProviderProps> = ({
  children,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>(
    JSON.parse(localStorage.getItem("favoriteMovies") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const addFavoriteMovie = (id: number) => {
    setFavoriteMovies((prevMovieIds) => [...prevMovieIds, id]);
  };

  const removeFavoriteMovie = (id: number) => {
    setFavoriteMovies((prevMovieIds) =>
      prevMovieIds.filter((movieId) => id !== movieId)
    );
  };

  const contextValue: FavoriteMoviesContextType = {
    favoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
  };

  return (
    <FavoriteMoviesContext.Provider value={contextValue}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};

export const useFavoriteMoviesContext = (): FavoriteMoviesContextType => {
  const context = useContext(FavoriteMoviesContext);
  if (!context) {
    throw new Error(
      "useFavoriteMoviesContext must be used within a FavoriteMoviesProvider"
    );
  }
  return context;
};