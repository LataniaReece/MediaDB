export interface FavoriteMoviesContextType {
  favoriteMovies: number[];
  addFavoriteMovie: (id: number) => void;
  removeFavoriteMovie: (id: number) => void;
}
