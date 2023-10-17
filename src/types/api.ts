interface Media {
  id: number;
  overview: string;
  poster_path: string;
  backdrop_path?: string;
  tagline?: string;
  genres?: Genre[];
}

export interface Movie extends Media {
  title: string;
  release_date?: string;
  imdb_id?: string;
}

export interface Show extends Media {
  name?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_episodes?: number;
  number_of_seasons?: number;
  status?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface GetMediaResponse {
  results: Movie[] | Show[];
  total_pages: number;
  total_results: number;
}

export interface ErrorResponse {
  message: string;
}
