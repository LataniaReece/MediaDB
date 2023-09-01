import { ErrorResponse, Genre, Movie } from "./api";

export interface FavoriteMoviesContextType {
  favoriteMovies: Movie[];
  addFavoriteMovie: (movie: Movie) => void;
  removeFavoriteMovie: (movie: Movie) => void;
}

export interface MovieGenreContextType {
  data: Genre[];
  isLoading: boolean;
  error: ErrorResponse | null;
}
