import { FC } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import MediaCarousel from "../components/media/MediaSlider";
import { useGetMedia } from "../hooks/apiHooks/apiHooks";
import { StylesObject } from "../types/utility";
import { Movie, Show } from "../types/api";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  },
  header: {
    color: "#fff",
  },
  button: {
    textTransform: "capitalize",
    color: "#000",
  },
};

const Home: FC = () => {
  const movieUrl = "https://api.themoviedb.org/3/discover/movie";
  const tvUrl = "https://api.themoviedb.org/3/discover/tv";

  const {
    data: movieData,
    isLoading: movieDataIsLoading,
    error: movieDataError,
  } = useGetMedia(movieUrl);
  const {
    data: tvData,
    isLoading: tvDataIsLoading,
    error: tvDataError,
  } = useGetMedia(tvUrl);

  if (movieDataIsLoading || tvDataIsLoading) {
    return <PageLoader>Loading...</PageLoader>;
  }

  if (movieDataError || !movieData || !tvData || tvDataError) {
    return <PageError />;
  }

  const { results: movieDataResults } = movieData;
  const { results: tvDataResults } = tvData;

  // const moviesToShow = movieDataResults.slice(0, 12);
  const moviesToShow = movieDataResults.slice(0, 12).map((movie) => ({
    ...movie,
    type: "movie",
  })) as Movie[];

  // const tvToShow = tvDataResults.slice(0, 12);
  const tvToShow = tvDataResults.slice(0, 12).map((tvShow) => ({
    ...tvShow,
    type: "show",
  })) as Show[];

  return (
    <PageWrapper sx={{}}>
      <Box sx={styles.headerContainer}>
        <Typography variant="h1" sx={styles.header}>
          Movies
        </Typography>
        <Button
          component={Link}
          variant="contained"
          to="/media/movies"
          sx={styles.button}
        >
          See All Movies
        </Button>
      </Box>
      <MediaCarousel media={moviesToShow} />
      <Box sx={{ ...styles.headerContainer, mt: 5 }}>
        <Typography variant="h1" sx={styles.header}>
          Tv Shows
        </Typography>
        <Button
          component={Link}
          variant="contained"
          to="/media/shows"
          sx={styles.button}
        >
          See All Shows
        </Button>
      </Box>
      <MediaCarousel media={tvToShow} />
    </PageWrapper>
  );
};

export default Home;
