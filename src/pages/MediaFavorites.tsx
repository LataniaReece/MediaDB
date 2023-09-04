import { FC, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import MoviePagination from "../components/media/MediaPagination";
import PageWrapper from "../components/PageWrapper";
import MediaGridList from "../components/media/MediaGridList";
import { StylesObject } from "../types/utility";
import { useFavoritesContext } from "../contexts/FavoritesContext";
import useValidateMediaType from "../hooks/useValidateMediaType";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", md: "center" },
    my: 2,
  },
};

const MediaFavorites: FC = () => {
  useValidateMediaType();
  const { type } = useParams();
  const isMovie = type === "movies";

  const [page, setPage] = useState(1);

  const { favoriteMovies, favoriteShows } = useFavoritesContext();

  const mediaPerPage = 16;
  const startIndex = (page - 1) * mediaPerPage;
  const endIndex = startIndex + mediaPerPage;

  // Slice the favorites array to get media for the current page
  let mediaForCurrentPage;
  let totalMedia;
  let totalPages;
  if (isMovie) {
    mediaForCurrentPage = favoriteMovies.slice(startIndex, endIndex);
    totalMedia = favoriteMovies.length;
    totalPages = Math.ceil(totalMedia / mediaPerPage);
  } else {
    mediaForCurrentPage = favoriteShows.slice(startIndex, endIndex);
    totalMedia = favoriteShows.length;
    totalPages = Math.ceil(totalMedia / mediaPerPage);
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageWrapper sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={styles.headerContainer}>
        <Typography variant="h1">
          Favorite {isMovie ? "Movies" : "Shows"}
        </Typography>
        <Typography sx={{ fontStyle: "italic" }}>
          {isMovie
            ? `${favoriteMovies.length} movies`
            : `${favoriteShows.length} shows`}
        </Typography>
      </Box>
      <MediaGridList media={mediaForCurrentPage} type={type} />
      {mediaForCurrentPage.length > 0 && (
        <MoviePagination
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      )}
    </PageWrapper>
  );
};

export default MediaFavorites;
