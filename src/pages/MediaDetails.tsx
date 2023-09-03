import { FC } from "react";
import { Box, Button, Link, Paper, Tooltip, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

import PageWrapper from "../components/PageWrapper";
import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import { StylesObject } from "../types/utility";
import { ErrorResponse, Genre, Movie, Show } from "../types/api";
import { useGetMediaDetails } from "../hooks/apiHooks/apiHooks";
import useValidateMediaType from "../hooks/useValidateMediaType";
import { isMovie as isMovieCheck } from "../utils";
import { AppColors } from "../theme";

import placeholderImage from "../images/movieDetailsPlaceholder.jpg";

const styles: StylesObject = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  movieImg: {
    maxWidth: "100%",
    maxHeight: "55vh",
    boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.6)",
    borderRadius: "10px",
    mb: 2,
    alignSelf: "center",
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
    mb: 1.5,
  },
  title: {
    fontWeight: "bold",
    letterSpacing: "2px",
    mr: 2,
  },
  statusPill: {
    width: "fit-content",
    borderRadius: "30px",
    letterSpacing: "1px",
    px: 3,
    py: 1,
    fontWeight: "bold",
  },
  tagline: {
    fontStyle: "italic",
    mb: 2,
    opacity: 0.6,
  },
  contentPaper: {
    pt: 2,
    pb: 4,
    px: 5,
    borderRadius: "5px",
    backgroundColor: AppColors.bgColor,
    border: "2mm ridge rgba(255,255,255, 0.6)",
    boxShadow: "-1px 0px 24px -3px rgba(255,255,255,0.2)",
    minWidth: "100%",
  },
  plotHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: { xs: "column", md: "row" },
    mb: { xs: 2, md: 0 },
  },
  favoriteButton: {
    backgroundColor: AppColors.red,
    "&:hover": {
      backgroundColor: AppColors.redDark,
    },
  },
  plotTitle: {
    my: 2,
    fontWeight: "bold",
    // color: AppColors.orange,
  },
  plotOverview: {
    fontSize: 16,
    textAlign: "justify",
    mb: 1,
  },
};

const MediaDetails: FC = () => {
  useValidateMediaType();
  const { type, id: paramsId } = useParams();
  const isMovie = type === "movies";

  const url = `https://api.themoviedb.org/3/${
    isMovie ? "movie" : "tv"
  }/${paramsId}?language=en-US`;
  const {
    data: mediaData,
    isLoading,
    error,
  } = useGetMediaDetails(url) as {
    data: Movie | Show;
    isLoading: boolean;
    error: ErrorResponse | null;
  };

  if (isLoading) {
    return (
      <PageWrapper>
        <PageLoader>Loading...</PageLoader>
      </PageWrapper>
    );
  }

  if (error || !mediaData) {
    return (
      <PageWrapper>
        <PageError />
      </PageWrapper>
    );
  }

  let title,
    genres,
    overview,
    backdrop_path,
    release_date,
    tagline,
    imdb_id,
    name,
    firstAirDate,
    lastAirDate,
    numberOfEpisodes,
    numberOfSeasons,
    status;

  if (isMovie) {
    const movie = mediaData as Movie;
    title = movie.title;
    genres = movie.genres;
    overview = movie.overview;
    backdrop_path = movie.backdrop_path;
    release_date = movie.release_date;
    tagline = movie.tagline;
    imdb_id = movie.imdb_id;
  } else {
    const show = mediaData as Show;
    name = show.name;
    genres = show.genres;
    overview = show.overview;
    backdrop_path = show.backdrop_path;
    tagline = show.tagline;
    firstAirDate = show.first_air_date;
    lastAirDate = show.last_air_date;
    numberOfEpisodes = show.number_of_episodes;
    numberOfSeasons = show.number_of_seasons;
    status = show.status;
  }

  const formattedGenres = genres?.map((genre: Genre) => genre.name).join(", ");

  const {
    favoriteMovies,
    favoriteShows,
    addFavoriteMovie,
    removeFavoriteMovie,
    addFavoriteShow,
    removeFavoriteShow,
  } = useFavoritesContext();

  let isFavorite;
  if (isMovie) {
    isFavorite =
      favoriteMovies.filter((favMovie) => favMovie.id === mediaData.id).length >
      0;
  } else {
    isFavorite =
      favoriteShows.filter((favShow) => favShow.id === mediaData.id).length > 0;
  }

  const shouldShowPaperWidget =
    !!overview ||
    !!formattedGenres ||
    !!release_date ||
    (!!firstAirDate && !!lastAirDate) ||
    !!numberOfSeasons ||
    !!numberOfEpisodes ||
    !!imdb_id;

  return (
    <PageWrapper sx={styles.container}>
      <Box
        component="img"
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : placeholderImage
        }
        alt={title || name || ""}
        sx={styles.movieImg}
      />
      {title || name ? (
        <Box sx={{ my: 2 }}>
          <Box sx={styles.titleContainer}>
            <Typography variant="h1" sx={styles.title}>
              {title || name}
            </Typography>
            {status && (
              <Typography
                sx={{
                  ...styles.statusPill,
                  backgroundColor:
                    status === "Returning Series"
                      ? "#658038"
                      : status === "Ended"
                      ? "#8B0000"
                      : "#858585",
                }}
              >
                {status}
              </Typography>
            )}
          </Box>
          {tagline && (
            <Typography variant="h3" sx={styles.tagline}>
              {tagline}
            </Typography>
          )}
        </Box>
      ) : null}
      {shouldShowPaperWidget && (
        <Paper sx={styles.contentPaper}>
          {overview && (
            <>
              <Box sx={styles.plotHeaderContainer}>
                <Typography variant="h2" sx={styles.plotTitle}>
                  Plot Summary
                </Typography>
                {isFavorite ? (
                  <Tooltip title={"Click to remove from favorites"}>
                    <Button
                      variant="contained"
                      aria-label="remove-favorite-movie"
                      onClick={
                        isMovieCheck(mediaData)
                          ? () => removeFavoriteMovie(mediaData)
                          : () => removeFavoriteShow(mediaData)
                      }
                      startIcon={<FavoriteIcon sx={{ mt: -0.5 }} />}
                      sx={styles.favoriteButton}
                    >
                      In Favorites
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title={"Click to add to favorites"}>
                    <Button
                      variant="contained"
                      aria-label="add-favorite-movie"
                      onClick={
                        isMovieCheck(mediaData)
                          ? () => addFavoriteMovie(mediaData)
                          : () => addFavoriteShow(mediaData)
                      }
                      startIcon={<FavoriteBorderIcon sx={{ mt: -0.5 }} />}
                      sx={styles.favoriteButton}
                    >
                      Add to Favorites
                    </Button>
                  </Tooltip>
                )}
              </Box>
              <Typography sx={styles.plotOverview}>{overview}</Typography>
            </>
          )}
          {formattedGenres && (
            <Typography>
              <b>Genres:</b> {formattedGenres}
            </Typography>
          )}
          {release_date && (
            <Typography sx={{ mb: 2 }}>
              <b>Release Date:</b>{" "}
              {format(new Date(release_date), "MM/dd/yyyy")}
            </Typography>
          )}
          {firstAirDate && lastAirDate && (
            <Typography>
              <b>Years Active: </b>
              {`${format(new Date(firstAirDate), "MM/dd/yyyy")} -
              ${
                status && status !== "Returning Series"
                  ? format(new Date(lastAirDate), "MM/dd/yyyy")
                  : "Present"
              }`}
            </Typography>
          )}
          {numberOfSeasons && (
            <Typography>
              <b>Number of Seasons:</b> {numberOfSeasons}
            </Typography>
          )}
          {numberOfEpisodes && (
            <Typography>
              <b>Number of Episodes:</b> {numberOfEpisodes}
            </Typography>
          )}

          {imdb_id && (
            <Link
              href={`https://www.imdb.com/title/${imdb_id}/`}
              target="_blank"
            >
              See IMDB Page
            </Link>
          )}
        </Paper>
      )}
    </PageWrapper>
  );
};

export default MediaDetails;
