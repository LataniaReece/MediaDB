import { FC } from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
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
