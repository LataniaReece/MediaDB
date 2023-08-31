import { useContext } from "react";
import { FavoriteMoviesContextType } from "../types/FavoriteMoviesContext";
import { FavoriteMoviesContext } from "../context/FavoriteMoviesContext";

export const useFavoriteMoviesContext = (): FavoriteMoviesContextType => {
  const context = useContext(FavoriteMoviesContext);
  if (!context) {
    throw new Error(
      "useFavoriteMoviesContext must be used within a FavoriteMoviesProvider"
    );
  }
  return context;
};
