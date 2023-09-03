interface Media {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  tagline?: string;
  genre_ids: number[];
  genres?: Genre[];
}

export interface Movie extends Media {
  release_date?: string;
  imdb_id?: string;
  type: "movie";
}

export interface Show extends Media {
  name?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  status?: string;
  type: "show";
}

export interface Genre {
  id: number;
  name: string;
}

export interface GetMediaResponse {
  page: number;
  results: Movie[] | Show[];
  total_pages: number;
  total_results: number;
}

export interface GetGenresResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface ErrorResponse {
  message: string;
}
