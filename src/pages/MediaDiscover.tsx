import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import PageWrapper from "../components/PageWrapper";
import PageLoader from "../components/PageLoader";
import PageError from "../components/PageError";
import SearchMedia from "../components/media/SearchMedia";
import MediaGridList from "../components/media/MediaGridList";
import MediaPagination from "../components/media/MediaPagination";

import { useGetMedia } from "../hooks/apiHooks/apiHooks";
import useValidateMediaType from "../hooks/useValidateMediaType";
import { ErrorResponse, Movie, Show } from "../types/api";
import { StylesObject } from "../types/utility";

const styles: StylesObject = {
  headerContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    my: 2,
  },
  resetButton: {
    mt: 1,
  },
};

const MediaDiscover: FC = () => {
  useValidateMediaType();
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
      }?page=${page}`;

  const {
    data: mediaData,
    isLoading: mediaDataIsLoading,
    error: mediaDataError,
  } = useGetMedia(mediaListUrl) as {
    data: {
      results: Movie[] | Show[];
      total_pages: number;
      total_results: number;
    };
    isLoading: boolean;
    error: ErrorResponse | null;
    refetch: () => void;
  };

  useEffect(() => {
    setRequestedQuery("");
    setPage(1);
  }, [type, setRequestedQuery, setPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (mediaDataIsLoading) {
    return <PageLoader>Loading...</PageLoader>;
  }

  if (mediaDataError || !mediaData) {
    return <PageError />;
  }

  const { results: mediaDataResults, total_pages, total_results } = mediaData;

  return (
    <PageWrapper>
      <SearchMedia setRequestedQuery={setRequestedQuery} type={type} />
      {requestedQuery && (
        <Button
          variant="text"
          sx={styles.resetButton}
          onClick={() => setRequestedQuery("")}
        >
          Reset Search
        </Button>
      )}
      <Box sx={styles.headerContainer} data-testid="mediaDiscoverHeader">
        <Typography variant="h1">
          {requestedQuery
            ? `Search Results: ${requestedQuery}`
            : `Discover ${isMovie ? "Movies" : "Shows"}`}
        </Typography>
        <Typography
          sx={{ fontStyle: "italic" }}
          data-testid="totalResults"
        >{`${total_results} ${isMovie ? "movies" : "shows"}`}</Typography>
      </Box>
      <MediaGridList media={mediaDataResults} type={type} />
      <MediaPagination
        totalPages={total_pages}
        page={page}
        handlePageChange={handlePageChange}
      />
    </PageWrapper>
  );
};

export default MediaDiscover;
