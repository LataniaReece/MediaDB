import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Genre, Movie, Tv } from "../../types/api";
import { useMovieGenreContext } from "../../contexts/MovieGenreContext";
import { AppColors } from "../../theme";
import MediaItem from "./MediaItem";

interface MediaGridListProps {
  media: Movie[] | Tv[];
}

const MediaGridList: FC<MediaGridListProps> = ({ media }) => {
  const { data: genreData } = useMovieGenreContext();

  const getMovieItemGenres = (ids: number[]) => {
    let genreNames: string[] = [];
    ids.map((id) => {
      const genre = genreData?.find((genre) => genre.id === id);
      if (genre) {
        genreNames.push(genre.name);
      }
    });
    return genreNames.join(", ");
  };

  if (media.length === 0) {
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
        <Typography variant="h5">No Favorite Movies Found</Typography>
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
          // Movie is basic format
          mediaItem.genre_ids &&
            (genres = getMovieItemGenres(mediaItem.genre_ids));
          // Movie is detailed format
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
