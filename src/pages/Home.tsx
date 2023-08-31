import { FC, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import useGetMovies from "../hooks/apiHooks/useGetMovies";
import useGetGenres from "../hooks/apiHooks/useGetGenres";
import { StylesObject } from "../types/utility";
import MovieItem from "../components/movies/MovieItem";
import SearchMovies from "../components/movies/SearchMovies";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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

  const getGenres = (ids: number[]) => {
    let genreNames: string[] = [];
    ids.map((id) => {
      const genre = genreData.genres.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames.join(", ");
  };

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
      {movieDataResults && movieDataResults.length > 0 && (
        <Grid
          container
          columnSpacing={1}
          rowSpacing={{ xs: 4, md: 3 }}
          sx={styles.movieGridContainer}
        >
          {movieDataResults.map((movie) => {
            const genres = getGenres(movie.genre_ids);
            return <MovieItem key={movie.id} movie={movie} genres={genres} />;
          })}
        </Grid>
      )}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Box sx={styles.paginationContainer}>
          <Typography>Page: {page}</Typography>
          <Pagination
            // Although we have total_pages, api only allows pages up to 500
            count={total_pages > 500 ? 500 : total_pages}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      </Stack>
    </PageWrapper>
  );
};

export default Home;
