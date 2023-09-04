import { FC } from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";

import MediaItem from "./MediaItem";
import { useMovieGenreContext } from "../../contexts/MovieGenreContext";
import { Genre, Movie, Show } from "../../types/api";
import { getMediaItemGenres } from "../../utils";

interface MediaSliderProps {
  media: Movie[] | Show[];
}
const MediaSlider: FC<MediaSliderProps> = ({ media }) => {
  const { data: genreData } = useMovieGenreContext();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1800 },
      items: 6,
    },
    smallDesktop: {
      breakpoint: { max: 1800, min: 1200 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 4,
    },
    smallTablet: {
      breakpoint: { max: 600, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box sx={{ overflow: "none" }}>
      <Carousel responsive={responsive} showDots={false} swipeable={true}>
        {media.map((item) => {
          let genres = "";
          // Movie is basic format
          item.genre_ids &&
            (genres = getMediaItemGenres(item.genre_ids, genreData));
          // Movie is detailed format
          item.genres &&
            (genres = item.genres.map((genre: Genre) => genre.name).join(", "));
          return (
            <MediaItem
              key={item.id}
              media={item}
              genres={genres}
              itemType="sliderItem"
            />
          );
        })}
      </Carousel>
    </Box>
  );
};

export default MediaSlider;
