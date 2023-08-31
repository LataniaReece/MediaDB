import { ErrorResponse, Genre } from "./api";

export interface FavoriteMoviesContextType {
  favoriteMovies: number[];
  addFavoriteMovie: (id: number) => void;
  removeFavoriteMovie: (id: number) => void;
}

export interface MovieGenreContextType {
  data: Genre[];
  isLoading: boolean;
  error: ErrorResponse | null;
}