import { FC } from "react";
import { useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import useGetMovieDetails from "../hooks/apiHooks/useGetMovieDetails";
import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import { Box, Link, Paper, Typography } from "@mui/material";
import { StylesObject } from "../types/utility";
import { Genre } from "../types/api";
import { AppColors } from "../theme";
import { format } from "date-fns";
import placeholderImage from "../images/movieDetailsPlaceholder.jpg";

const styles: StylesObject = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    mt: -5,
  },
  movieImg: {
    maxWidth: "100%",
    maxHeight: "60vh",
    boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.6)",
    borderRadius: "10px",
    mb: 2,
  },
  title: {
    fontWeight: "bold",
    mb: 2,
    letterSpacing: "2px",
    textAlign: "center",
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
    backgroundColor: AppColors.blueLighter,
    boxShadow: "0px 7px 29px 0px rgba(159, 165, 188, 0.9)",
    minWidth: "100%",
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

const MovieDetails: FC = () => {
  const { id: paramsId } = useParams();
  const url = `https://api.themoviedb.org/3/movie/${paramsId}?language=en-US`;
  const { data: movieData, isLoading, error } = useGetMovieDetails(url);

  if (isLoading) {
    return (
      <PageWrapper>
        <PageLoader>Loading...</PageLoader>
      </PageWrapper>
    );
  }

  if (error || !movieData) {
    return (
      <PageWrapper>
        <PageError />
      </PageWrapper>
    );
  }

  const {
    title,
    genres,
    overview,
    backdrop_path,
    release_date,
    tagline,
    imdb_id,
  } = movieData;

  const formattedGenres = genres.map((genre: Genre) => genre.name).join(", ");

  return (
    <PageWrapper sx={styles.container}>
      <Box
        component="img"
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : placeholderImage
        }
        alt={title}
        sx={styles.movieImg}
      />
      {title && (
        <>
          <Typography variant="h1" sx={styles.title}>
            {title}
          </Typography>
          {tagline && (
            <Typography variant="h3" sx={styles.tagline}>
              {tagline}
            </Typography>
          )}
        </>
      )}
      <Paper sx={styles.contentPaper}>
        {overview && (
          <>
            <Typography variant="h2" sx={styles.plotTitle}>
              Plot Summary
            </Typography>
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
            <b>Release Date:</b> {format(new Date(release_date), "MM/dd/yyyy")}
          </Typography>
        )}
        {imdb_id && (
          <Link href={`https://www.imdb.com/title/${imdb_id}/`} target="_blank">
            See IMDB Page
          </Link>
        )}
      </Paper>
    </PageWrapper>
  );
};

export default MovieDetails;
