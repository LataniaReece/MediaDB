import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import MediaItem from "./MediaItem";
import { Genre, Movie, Show } from "../../types/api";
import { useMovieGenreContext } from "../../contexts/MovieGenreContext";
import { AppColors } from "../../theme";
import { getMediaItemGenres } from "../../utils";

interface MediaGridListProps {
  media: Movie[] | Show[];
  type: string | undefined;
}

const MediaGridList: FC<MediaGridListProps> = ({ media, type }) => {
  const { data: genreData } = useMovieGenreContext();

  if (media.length === 0 && type) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 20,
        }}
      >
        <InfoIcon sx={{ color: AppColors.blueLight, fontSize: 50, mb: 2 }} />
        <Typography variant="h5">{`No Favorite ${
          type === "movies" ? "Movies" : "Shows"
        } Found`}</Typography>
      </Box>
    );
  }

  return (
    media &&
    media.length > 0 &&
    genreData &&
    genreData.length > 0 && (
      <Grid container columnSpacing={1} rowSpacing={{ xs: 4, md: 3 }}>
        {media.map((mediaItem) => {
          let genres = "";
          // Media is basic format
          mediaItem.genre_ids &&
            (genres = getMediaItemGenres(mediaItem.genre_ids, genreData));
          // Media is detailed format
          mediaItem.genres &&
            (genres = mediaItem.genres
              .map((genre: Genre) => genre.name)
              .join(", "));
          return (
            <MediaItem
              key={mediaItem.id}
              media={mediaItem}
              genres={genres}
              itemType={"gridItem"}
            />
          );
        })}
      </Grid>
    )
  );
};

export default MediaGridList;
