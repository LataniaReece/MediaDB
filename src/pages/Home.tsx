import { FC } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, CircularProgress, Typography } from "@mui/material";
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
    fontSize: 20,
  },
  loader: {
    mt: 3,
  },
};

interface MediaData {
  title: string;
  url: string;
}

const mediaData: MediaData[] = [
  {
    title: "Popular Movies",
    url: "https://api.themoviedb.org/3/discover/movie",
  },
  {
    title: "Now Playing Movies",
    url: "https://api.themoviedb.org/3/movie/now_playing",
  },
  {
    title: "Upcoming Movies",
    url: "https://api.themoviedb.org/3/movie/upcoming",
  },
  {
    title: "Popular Shows",
    url: "https://api.themoviedb.org/3/tv/popular",
  },
  {
    title: "Top Rated Shows",
    url: "https://api.themoviedb.org/3/tv/top_rated",
  },
];

const Home: FC = () => {
  const components = mediaData.map(({ title, url }, index) => {
    const mediaType = title.toLowerCase().includes("movie") ? "movie" : "show";
    const { data, isLoading, error } = useGetMedia(url);

    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            my: 10,
          }}
        >
          <Typography variant="h1" sx={styles.header}>
            {title}
          </Typography>
          <CircularProgress sx={styles.loader} />
        </Box>
      );
    }

    if (error || !data) {
      return <PageError key={index} />;
    }

    const { results } = data;

    const mediaToShow = results.slice(0, 12).map((item) => ({
      ...item,
      type: mediaType,
    })) as (Movie | Show)[];

    return (
      <Box key={index}>
        <Box sx={styles.headerContainer}>
          <Typography variant="h1" sx={styles.header}>
            {title}
          </Typography>
        </Box>
        <MediaCarousel media={mediaToShow} />
      </Box>
    );
  });

  return <PageWrapper>{components}</PageWrapper>;
};

export default Home;
