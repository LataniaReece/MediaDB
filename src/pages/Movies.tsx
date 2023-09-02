import { FC, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Typography } from "@mui/material";

import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import { useGetMedia } from "../hooks/apiHooks/apiHooks";
import { StylesObject } from "../types/utility";
import SearchMovies from "../components/movies/SearchMovies";
import MovieList from "../components/movies/MediaGridList";
import { useMovieGenreContext } from "../contexts/MovieGenreContext";
import MediaPagination from "../components/movies/MediaPagination";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    my: 2,
  },
};

const Movies: FC = () => {
  const [page, setPage] = useState(1);
  const [requestedQuery, setRequestedQuery] = useState("");

  const movieListUrl = requestedQuery
    ? `https://api.themoviedb.org/3/search/movie?query=${requestedQuery}&language=en-US&page=${page}`
    : `https://api.themoviedb.org/3/discover/movie?api_key=ab06241e44a466ac55c0c0aa7cc9c025&page=${page}`;

  const {
    data: movieData,
    isLoading: movieDataIsLoading,
    error: movieDataError,
  } = useGetMedia(movieListUrl);
  const {
    data: genreData,
    isLoading: genreDataIsLoading,
    error: genreDataError,
  } = useMovieGenreContext();

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (movieDataIsLoading || genreDataIsLoading) {
    return <PageLoader>Loading...</PageLoader>;
  }

  if (movieDataError || !genreData || !movieData || genreDataError) {
    return <PageError />;
  }

  const { results: movieDataResults, total_pages, total_results } = movieData;

  return (
    <PageWrapper>
      <SearchMovies setRequestedQuery={setRequestedQuery} />
      <Box sx={styles.headerContainer}>
        <Typography variant="h1">
          {requestedQuery
            ? `Search Results: ${requestedQuery}`
            : "Discover Movies"}
        </Typography>
        <Typography
          sx={{ fontStyle: "italic" }}
        >{`${total_results} movies`}</Typography>
      </Box>
      <MovieList movies={movieDataResults} />
      <MediaPagination
        totalPages={total_pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </PageWrapper>
  );
};

export default Movies;
