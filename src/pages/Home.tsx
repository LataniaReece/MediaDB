import { FC } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Button, Typography } from "@mui/material";

import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import { useGetMedia } from "../hooks/apiHooks/apiHooks";
import { StylesObject } from "../types/utility";
import MovieList from "../components/movies/MediaGridList";
import { Link } from "react-router-dom";
import { AppColors } from "../theme";
import MediaCarousel from "../components/movies/MediaSlider";

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
    // backgroundColor: AppColors.blueLight,
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

  const moviesToShow = movieDataResults.slice(0, 12);
  const tvToShow = tvDataResults.slice(0, 12);

  return (
    <PageWrapper sx={{}}>
      <Box sx={styles.headerContainer}>
        <Typography variant="h1" sx={styles.header}>
          Movies
        </Typography>
        <Button
          component={Link}
          variant="contained"
          to="/movies"
          sx={styles.button}
        >
          See All Movies
        </Button>
      </Box>
      <MediaCarousel media={moviesToShow} />
      <Box sx={styles.headerContainer}>
        <Typography variant="h1" sx={{ ...styles.header, mt: 2 }}>
          Tv Shows
        </Typography>
        <Button
          component={Link}
          variant="contained"
          to="/shows"
          sx={styles.button}
        >
          See All Shows
        </Button>
      </Box>
      {/* <MediaCarousel media={tvToShow} /> */}
    </PageWrapper>
    // <PageWrapper>
    // <Box sx={styles.headerContainer}>
    //   <Typography variant="h1" sx={styles.header}>
    //     Movies
    //   </Typography>
    //   <Button
    //     component={Link}
    //     variant="contained"
    //     to="/movies"
    //     sx={styles.button}
    //   >
    //     See All Movies
    //   </Button>
    // </Box>
    //   {/* <MovieList movies={moviesToShow} /> */}
    //   {/* <MovieItemCarousel movies={moviesToShow} /> */}
    // <Box sx={styles.headerContainer}>
    //   <Typography variant="h1" sx={{ ...styles.header, mt: 2 }}>
    //     Tv Shows
    //   </Typography>
    //   <Button
    //     component={Link}
    //     variant="contained"
    //     to="/shows"
    //     sx={styles.button}
    //   >
    //     See All Shows
    //   </Button>
    // </Box>
    //   {/* <MovieList movies={tvToShow} /> */}
    // </PageWrapper>
  );
};

export default Home;
