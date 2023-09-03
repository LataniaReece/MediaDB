import { FC, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { Box, Typography } from "@mui/material";

import { StylesObject } from "../types/utility";
import MovieList from "../components/media/MediaGridList";
import MoviePagination from "../components/media/MediaPagination";
import { useFavoriteMoviesContext } from "../contexts/FavoriteMoviesContext";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    my: 2,
  },
};

const FavoriteMovies: FC = () => {
  const [page, setPage] = useState(1);
  const { favoriteMovies } = useFavoriteMoviesContext();

  const moviesPerPage = 16;

  // Calculate start and end indices for the current page
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;

  // Slice the favoriteMovies array to get movies for the current page
  const moviesForCurrentPage = favoriteMovies.slice(startIndex, endIndex);

  const totalMovies = favoriteMovies.length;
  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageWrapper sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={styles.headerContainer}>
        <Typography variant="h1">Favorite Movies</Typography>
        <Typography
          sx={{ fontStyle: "italic" }}
        >{`${favoriteMovies.length} movies`}</Typography>
      </Box>
      <MovieList movies={moviesForCurrentPage} />
      {moviesForCurrentPage.length > 0 && (
        <MoviePagination
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </PageWrapper>
  );
};

export default FavoriteMovies;
