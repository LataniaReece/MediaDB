import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { FavoritesContextType } from "../types/contexts";
import { Movie, Show } from "../types/api";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("favoriteMovies") || "[]")
  );

  const [favoriteShows, setFavoriteShows] = useState<Show[]>(
    JSON.parse(localStorage.getItem("favoriteShows") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  useEffect(() => {
    localStorage.setItem("favoriteShows", JSON.stringify(favoriteShows));
  }, [favoriteShows]);

  const addFavoriteMovie = (movie: Movie) => {
    setFavoriteMovies((prevFavMovies) => [...prevFavMovies, movie]);
  };

  const removeFavoriteMovie = (movie: Movie) => {
    setFavoriteMovies((prevFavMovies) =>
      prevFavMovies.filter((prevFavMovie) => prevFavMovie.id !== movie.id)
    );
  };

  const addFavoriteShow = (show: Show) => {
    setFavoriteShows((prevFavShows) => [...prevFavShows, show]);
  };

  const removeFavoriteShow = (show: Show) => {
    setFavoriteShows((prevFavShows) =>
      prevFavShows.filter((prevFavShow) => prevFavShow.id !== show.id)
    );
  };

  const contextValue: FavoritesContextType = {
    favoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
    favoriteShows,
    addFavoriteShow,
    removeFavoriteShow,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavoritesContext must be used within a FavoritesProvider"
    );
  }
  return context;
};
