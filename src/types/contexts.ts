import { ErrorResponse, Genre, Movie, Show } from "./api";

export interface FavoritesContextType {
  favoriteMovies: Movie[];
  favoriteShows: Show[];
  addFavoriteMovie: (movie: Movie) => void;
  removeFavoriteMovie: (movie: Movie) => void;
  addFavoriteShow: (show: Show) => void;
  removeFavoriteShow: (show: Show) => void;
}

export interface MovieGenreContextType {
  data: Genre[];
  isLoading: boolean;
  error: ErrorResponse | null;
}
