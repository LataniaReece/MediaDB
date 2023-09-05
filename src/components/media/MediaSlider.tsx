import { FC } from "react";
import { Box } from "@mui/material";
import Carousel from "react-multi-carousel";

import MediaItem from "./MediaItem";
import { Movie, Show } from "../../types/api";

interface MediaSliderProps {
  media: (Movie | Show)[];
}
const MediaSlider: FC<MediaSliderProps> = ({ media }) => {
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
      items: 3,
    },
  };

  return (
    <Box sx={{ overflow: "none" }}>
      <Carousel responsive={responsive} showDots={false} swipeable={true}>
        {media.map((item) => (
          <MediaItem key={item.id} media={item} itemType="sliderItem" />
        ))}
      </Carousel>
    </Box>
  );
};

export default MediaSlider;
