import { FC, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Typography } from "@mui/material";

import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import useGetMovies from "../hooks/apiHooks/useGetMovies";
import useGetGenres from "../hooks/apiHooks/useGetGenres";
import { StylesObject } from "../types/utility";
import SearchMovies from "../components/movies/SearchMovies";
import MovieList from "../components/movies/MovieList";
import MoviePagination from "../components/movies/MoviePagination";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
};

const Home: FC = () => {
  const [page, setPage] = useState(1);
  const [requestedQuery, setRequestedQuery] = useState("");

  const movieListUrl = requestedQuery
    ? `https://api.themoviedb.org/3/search/movie?query=${requestedQuery}&language=en-US&page=${page}`
    : `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  const genreListUrl = `https://api.themoviedb.org/3/genre/movie/list`;

  const {
    data: movieData,
    isLoading: movieDataIsLoading,
    error: movieDataError,
  } = useGetMovies(movieListUrl);
  const {
    data: genreData,
    isLoading: genreDataIsLoading,
    error: genreDataError,
  } = useGetGenres(genreListUrl);

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
            : "Top Rated Movies"}
        </Typography>
        <Typography
          sx={{ fontStyle: "italic" }}
        >{`${total_results} movies`}</Typography>
      </Box>
      <MovieList movies={movieDataResults} genreData={genreData} />
      <MoviePagination
        totalPages={total_pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </PageWrapper>
  );
};

export default Home;
