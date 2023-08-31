import { FC } from "react";
import { Grid } from "@mui/material";
import { GetGenresResponse, Movie } from "../../types/api";
import MovieItem from "./MovieItem";

interface MovieListProps {
  movies: Movie[];
  genreData: GetGenresResponse;
}

const MovieList: FC<MovieListProps> = ({ movies, genreData }) => {
  const getGenres = (ids: number[]) => {
    let genreNames: string[] = [];
    ids.map((id) => {
      const genre = genreData.genres.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames.join(", ");
  };

  return (
    movies &&
    movies.length > 0 && (
      <Grid container columnSpacing={1} rowSpacing={{ xs: 4, md: 3 }}>
        {movies.map((movie) => {
          const genres = getGenres(movie.genre_ids);
          return <MovieItem key={movie.id} movie={movie} genres={genres} />;
        })}
      </Grid>
    )
  );
};

export default MovieList;
