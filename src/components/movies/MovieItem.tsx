import { FC } from "react";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { StylesObject } from "../../types/utility";
import { Movie } from "../../types/api";
import placeholder from "../../images/movieItemPlaceholder.jpg";
import { AppColors } from "../../theme";
import { useFavoriteMoviesContext } from "../../contexts/FavoriteMoviesContext";

interface MovieItemProps {
  movie: Movie;
  genres: string;
}

const styles: StylesObject = {
  movieGridItem: {
    position: "relative",
    transition: "transform 0.3s, border 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  movieImg: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.6) 0px 7px 29px 0px",
    },
  },
  movieLink: {
    textDecoration: "none",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  movieGenres: {
    fontStyle: "italic",
    opacity: "80%",
  },
};

const MovieItem: FC<MovieItemProps> = ({ movie, genres }) => {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useFavoriteMoviesContext();

  const isMovieFavorite = (id: number) =>
    favoriteMovies.filter((movieId) => movieId === id).length > 0;

  const isFavorite = isMovieFavorite(movie.id);

  return (
    <Grid
      key={movie.id}
      item
      sx={styles.movieGridItem}
      xs={6}
      sm={4}
      md={3}
      lg={2}
    >
      <Link href={`/movies/${movie.id}`} sx={styles.movieLink}>
        <Box
          component="img"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : placeholder
          }
          alt={movie.title}
          sx={styles.movieImg}
        />
        <Typography sx={styles.movieTitle}>{movie.title}</Typography>
        <Typography sx={styles.movieGenres}>{genres}</Typography>
      </Link>
      {isFavorite ? (
        <IconButton
          aria-label="remove-favorite-movie"
          onClick={() => removeFavoriteMovie(movie.id)}
          sx={{
            position: "absolute",
            top: "25px",
            color: AppColors.red,
            transformOrigin: "center",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="add-favorite-movie"
          onClick={() => addFavoriteMovie(movie.id)}
          sx={{
            position: "absolute",
            top: "25px",
            color: AppColors.red,
            transformOrigin: "center",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </Grid>
  );
};

export default MovieItem;
