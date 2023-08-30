export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
}
export interface Genre {
  id: number;
  name: string;
}

export interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GetGenresResponse {
  genres: Genre[];
}

export interface GetMovieDetailsReponse {
  genres: Genre[];
  overview: string;
  popularity: number;
  backdrop_path: string;
  release_date: string;
  title: string;
  tagline: string;
  imdb_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ErrorResponse {
  message: string;
}
