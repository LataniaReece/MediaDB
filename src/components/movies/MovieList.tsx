import { FC } from "react";
import { Grid } from "@mui/material";
import { Movie } from "../../types/api";
import MovieItem from "./MovieItem";
import { useMovieGenreContext } from "../../contexts/MovieGenreContext";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: FC<MovieListProps> = ({ movies }) => {
  const { data: genreData } = useMovieGenreContext();

  const getMovieItemGenres = (ids: number[]) => {
    let genreNames: string[] = [];
    ids.map((id) => {
      const genre = genreData?.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames.join(", ");
  };

  return (
    movies &&
    movies.length > 0 &&
    genreData &&
    genreData.length > 0 && (
      <Grid container columnSpacing={1} rowSpacing={{ xs: 4, md: 3 }}>
        {movies.map((movie) => {
          const genres = getMovieItemGenres(movie.genre_ids);
          return <MovieItem key={movie.id} movie={movie} genres={genres} />;
        })}
      </Grid>
    )
  );
};

export default MovieList;
