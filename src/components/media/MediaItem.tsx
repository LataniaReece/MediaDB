import { FC } from "react";
import { Box, Grid, IconButton, Link, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { StylesObject } from "../../types/utility";
import { Movie, Tv } from "../../types/api";
import placeholder from "../../images/movieItemPlaceholder.jpg";
import { AppColors } from "../../theme";
import { useFavoriteMoviesContext } from "../../contexts/FavoriteMoviesContext";

interface MediaItemProps {
  media: Movie | Tv;
  genres: string;
  itemType: "gridItem" | "sliderItem";
}

const styles: StylesObject = {
  mediaItem: {
    position: "relative",
    pr: 2,
    transition: "all 0.3s",
    "&:hover": {
      opacity: 0.6,
    },
  },
  mediaImg: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.6) 0px 7px 29px 0px",
    },
  },
  mediaLink: {
    textDecoration: "none",
  },
  mediaTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mediaGenres: {
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

const isMovie = (media: Movie | Tv): media is Movie => {
  return (media as Movie).title !== undefined;
};

const MediaItem: FC<MediaItemProps> = ({ media, genres, itemType }) => {
  // const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
  //   useFavoriteMoviesContext();

  // const isMovieFavorite = (media: Movie | Tv) =>
  //   favoriteMovies.filter((favMovie) => favMovie.id === movie.id).length > 0;

  // const isFavorite = isMovieFavorite(movie);

  const itemContent = (
    <>
      <Link
        href={
          isMovie(media)
            ? `/media/movies/${media.id}`
            : `/media/shows/${media.id}`
        }
        sx={styles.mediaLink}
      >
        <Box
          component="img"
          src={
            media.poster_path
              ? `https://image.tmdb.org/t/p/original${media.poster_path}`
              : placeholder
          }
          alt={media.title}
          sx={styles.mediaImg}
        />

        <Typography sx={styles.mediatitle}>
          {isMovie(media) ? media.title : media.name}
        </Typography>
        <Typography sx={styles.mediaGenre}>{genres}</Typography>
      </Link>
      {/* {isFavorite ? (
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
      )} */}
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
