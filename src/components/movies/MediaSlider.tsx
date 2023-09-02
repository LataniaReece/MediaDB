import { FC } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useMovieGenreContext } from "../../contexts/MovieGenreContext";
import { Genre, Movie, Tv } from "../../types/api";
import MediaItem from "./MediaItem";

interface MediaSliderProps {
  media: Movie[] | Tv[];
}
const MediaSlider: FC<MediaSliderProps> = ({ media }) => {
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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 5,
    },
  };

  return (
    <Carousel responsive={responsive} showDots={false}>
      {media.map((item) => {
        let genres = "";
        // Movie is basic format
        item.genre_ids && (genres = getMovieItemGenres(item.genre_ids));
        // Movie is detailed format
        item.genres &&
          (genres = item.genres.map((genre: Genre) => genre.name).join(", "));
        return (
          <MediaItem
            key={item.id}
            movie={item}
            genres={genres}
            itemType="sliderItem"
          />
        );
      })}
    </Carousel>
  );
};

export default MediaSlider;