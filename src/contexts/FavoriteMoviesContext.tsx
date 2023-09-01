import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { FavoriteMoviesContextType } from "../types/contexts";
import { Movie } from "../types/api";

export const FavoriteMoviesContext = createContext<
  FavoriteMoviesContextType | undefined
>(undefined);

interface FavoriteMoviesProviderProps {
  children: ReactNode;
}

export const FavoriteMoviesProvider: React.FC<FavoriteMoviesProviderProps> = ({
  children,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("favoriteMovies") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  const addFavoriteMovie = (movie: Movie) => {
    setFavoriteMovies((prevFavMovies) => [...prevFavMovies, movie]);
  };

  const removeFavoriteMovie = (movie: Movie) => {
    setFavoriteMovies((prevFavMovies) =>
      prevFavMovies.filter((prevFavMovie) => prevFavMovie.id !== movie.id)
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
