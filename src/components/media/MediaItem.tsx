import { FC } from "react";
import { Box, Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { StylesObject } from "../../types/utility";
import { Movie, Show } from "../../types/api";
import placeholder from "../../images/movieItemPlaceholder.jpg";
import { AppColors } from "../../theme";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { isMovie } from "../../utils";
import { Link } from "react-router-dom";

interface MediaItemProps {
  media: Movie | Show;
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
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
};

const MediaItem: FC<MediaItemProps> = ({ media, itemType }) => {
  const {
    favoriteMovies,
    favoriteShows,
    addFavoriteMovie,
    removeFavoriteMovie,
    addFavoriteShow,
    removeFavoriteShow,
  } = useFavoritesContext();

  let isFavorite;
  if (isMovie(media)) {
    isFavorite =
      favoriteMovies.filter((favMovie) => favMovie.id === media.id).length > 0;
  } else {
    isFavorite =
      favoriteShows.filter((favShow) => favShow.id === media.id).length > 0;
  }

  const itemContent = (
    <>
      <Box
        component={Link}
        to={
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
          alt={isMovie(media) ? media.title : media.name}
          sx={styles.mediaImg}
        />
      </Box>
      {isFavorite ? (
        <IconButton
          aria-label="remove-favorite-movie"
          onClick={
            isMovie(media)
              ? () => removeFavoriteMovie(media)
              : () => removeFavoriteShow(media)
          }
          sx={{
            ...styles.mediaFavIcon,
            top: itemType === "gridItem" ? "25px" : { xs: "2px", md: "8px" },
            right: itemType === "gridItem" ? "5px" : { xs: "12px", md: "15px" },
          }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="add-favorite-movie"
          onClick={
            isMovie(media)
              ? () => addFavoriteMovie(media)
              : () => addFavoriteShow(media)
          }
          sx={{
            ...styles.mediaFavIcon,
            top: itemType === "gridItem" ? "25px" : { xs: "2px", md: "8px" },

            right: itemType === "gridItem" ? "5px" : { xs: "12px", md: "15px" },
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
        <Grid
          item
          xs={4}
          sm={3}
          lg={2}
          sx={styles.mediaItem}
          data-testid="mediaGridItem"
        >
          {itemContent}
        </Grid>
      ) : (
        <Box sx={styles.mediaItem}>{itemContent}</Box>
      )}
    </>
  );
};

export default MediaItem;
