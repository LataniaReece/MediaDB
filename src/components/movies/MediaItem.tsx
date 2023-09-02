import { FC } from "react";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { StylesObject } from "../../types/utility";
import { Movie } from "../../types/api";
import placeholder from "../../images/movieItemPlaceholder.jpg";
import { AppColors } from "../../theme";
import { useFavoriteMoviesContext } from "../../contexts/FavoriteMoviesContext";

interface MediaItemProps {
  movie: Movie;
  genres: string;
  itemType: "gridItem" | "sliderItem";
}

const styles: StylesObject = {
  mediaItem: {
    position: "relative",
    pr: 2,
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
  mediaFavIcon: {
    position: "absolute",
    color: AppColors.red,
    transformOrigin: "center",
    transition: "transform 0.3s",
    right: "25px",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
};

const MediaItem: FC<MediaItemProps> = ({ movie, genres, itemType }) => {
  const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
    useFavoriteMoviesContext();

  const isMovieFavorite = (movie: Movie) =>
    favoriteMovies.filter((favMovie) => favMovie.id === movie.id).length > 0;

  const isFavorite = isMovieFavorite(movie);

  const itemContent = (
    <>
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
          onClick={() => removeFavoriteMovie(movie)}
          sx={{
            ...styles.mediaFavIcon,
            top: itemType === "gridItem" ? "30px" : "10px",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="add-favorite-movie"
          onClick={() => addFavoriteMovie(movie)}
          sx={{
            ...styles.mediaFavIcon,
            top: itemType === "gridItem" ? "30px" : "10px",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </>
  );

  return (
    <>
      {itemType === "gridItem" ? (
        <Grid item xs={6} sm={4} md={3} lg={2} sx={styles.mediaItem}>
          {itemContent}
        </Grid>
      ) : (
        <Box sx={styles.mediaItem}>{itemContent}</Box>
      )}
    </>
  );
};

export default MediaItem;
