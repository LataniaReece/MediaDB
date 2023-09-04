import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import MediaItem from "./MediaItem";
import { Movie, Show } from "../../types/api";
import { AppColors } from "../../theme";
import { StylesObject } from "../../types/utility";

interface MediaGridListProps {
  media: Movie[] | Show[];
  type: string | undefined;
}

const styles: StylesObject = {
  gridContainer: {
    "& .MuiGrid-root": {
      pr: 0,
    },
  },
};

const MediaGridList: FC<MediaGridListProps> = ({ media, type }) => {
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
    media.length > 0 && (
      <Grid
        container
        columnSpacing={2}
        rowSpacing={3}
        sx={styles.gridContainer}
      >
        {media.map((mediaItem) => (
          <MediaItem
            key={mediaItem.id}
            media={mediaItem}
            itemType={"gridItem"}
          />
        ))}
      </Grid>
    )
  );
};

export default MediaGridList;
