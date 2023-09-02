import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import PageWrapper from "../components/PageWrapper";
import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import SearchMedia from "../components/movies/SearchMedia";
import MediaGridList from "../components/movies/MediaGridList";
import MediaPagination from "../components/movies/MediaPagination";
import { useGetMedia } from "../hooks/apiHooks/apiHooks";
import { useMovieGenreContext } from "../contexts/MovieGenreContext";
import { ErrorResponse, Movie, Tv } from "../types/api";
import { StylesObject } from "../types/utility";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    my: 2,
  },
};

const MediaList: FC = () => {
  const { type } = useParams();

  const [page, setPage] = useState(1);
  const [requestedQuery, setRequestedQuery] = useState("");

  const isMovie = type === "movies";

  const mediaListUrl = requestedQuery
    ? `https://api.themoviedb.org/3/search/${
        isMovie ? "movie" : "tv"
      }?query=${requestedQuery}&language=en-US&page=${page}`
    : `https://api.themoviedb.org/3/discover/${
        isMovie ? "movie" : "tv"
      }?api_key=ab06241e44a466ac55c0c0aa7cc9c025&page=${page}`;

  const {
    data: mediaData,
    isLoading: mediaDataIsLoading,
    error: mediaDataError,
  } = useGetMedia(mediaListUrl) as {
    data: {
      results: Movie[] | Tv[];
      total_pages: number;
      total_results: number;
    };
    isLoading: boolean;
    error: ErrorResponse | null;
  };

  const {
    data: genreData,
    isLoading: genreDataIsLoading,
    error: genreDataError,
  } = useMovieGenreContext();

  useEffect(() => {
    setRequestedQuery("");
  }, [type]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (mediaDataIsLoading || genreDataIsLoading) {
    return <PageLoader>Loading...</PageLoader>;
  }

  if (mediaDataError || !genreData || !mediaData || genreDataError) {
    return <PageError />;
  }

  const { results: mediaDataResults, total_pages, total_results } = mediaData;

  return (
    <PageWrapper>
      <SearchMedia setRequestedQuery={setRequestedQuery} type={type} />
      <Box sx={styles.headerContainer}>
        <Typography variant="h1">
          {requestedQuery
            ? `Search Results: ${requestedQuery}`
            : `Discover ${isMovie ? "Movies" : "Shows"}`}
        </Typography>
        <Typography sx={{ fontStyle: "italic" }}>{`${total_results} ${
          isMovie ? "movies" : "shows"
        }`}</Typography>
      </Box>
      <MediaGridList media={mediaDataResults} />
      <MediaPagination
        totalPages={total_pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </PageWrapper>
  );
};

export default MediaList;
