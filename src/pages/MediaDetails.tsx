import { FC } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useGetMediaDetails } from "../hooks/apiHooks/apiHooks";
import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import { Box, Button, Link, Paper, Tooltip, Typography } from "@mui/material";
import { StylesObject } from "../types/utility";
import { ErrorResponse, Genre, Movie, Tv } from "../types/api";
import { AppColors } from "../theme";
import { format } from "date-fns";
import placeholderImage from "../images/movieDetailsPlaceholder.jpg";
import { useFavoriteMoviesContext } from "../contexts/FavoriteMoviesContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const styles: StylesObject = {
  container: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    minHeight: "100vh",
    // mt: { xs: 0, sm: 2, md: -5 },
  },
  movieImg: {
    maxWidth: "100%",
    maxHeight: "55vh",
    boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.6)",
    borderRadius: "10px",
    mb: 2,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    letterSpacing: "2px",
    mr: 2,
  },
  statusPill: {
    backgroundColor: "gray",
    width: "fit-content",
    borderRadius: "30px",
    letterSpacing: "1px",
    p: 1,
    fontWeight: "bold",
  },
  tagline: {
    fontStyle: "italic",
    mb: 3,
    opacity: 0.6,
  },
  contentPaper: {
    pt: 2,
    pb: 4,
    px: 3,
    borderRadius: "10px",
    backgroundColor: AppColors.blueLight,
    boxShadow: "0px 7px 29px 0px rgba(159, 165, 188, 0.9)",
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
  },
  plotOverview: {
    fontSize: 16,
    textAlign: "justify",
    mb: 1,
  },
};

const MediaDetails: FC = () => {
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
    data: Movie | Tv;
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

  //   const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } =
  //     useFavoriteMoviesContext();

  //   const isMediaFavorite = (media: Movie | Tv) =>
  //     favoriteMovies.filter((favMedia) => favMedia.id === media.id).length > 0;

  //   const isFavorite = isMediaFavorite(mediaData);

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
    const show = mediaData as Tv;
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h1" sx={styles.title}>
              {title || name}
            </Typography>
            {status && <Typography sx={styles.statusPill}>{status}</Typography>}
          </Box>
          {tagline && (
            <Typography variant="h3" sx={styles.tagline}>
              {tagline}
            </Typography>
          )}
        </Box>
      ) : null}
      <Paper sx={styles.contentPaper}>
        {overview && (
          <>
            <Box sx={styles.plotHeaderContainer}>
              <Typography variant="h2" sx={styles.plotTitle}>
                Plot Summary
              </Typography>
            </Box>
            <Typography sx={styles.plotOverview}>{overview}</Typography>
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
                {format(new Date(firstAirDate), "MM/dd/yyyy")} -
                {format(new Date(lastAirDate), "MM/dd/yyyy")}
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
          </>
        )}
      </Paper>
    </PageWrapper>
  );
};

export default MediaDetails;
