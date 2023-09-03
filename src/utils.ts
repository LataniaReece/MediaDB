import { Genre, Movie, Show } from "./types/api";

export const isMovie = (media: Movie | Show): media is Movie => {
  return (media as Movie).title !== undefined;
};

export const getMediaItemGenres = (ids: number[], genreData: Genre[]) => {
  let genreNames: string[] = [];
  ids.map((id) => {
    const genre = genreData?.find((genre) => genre.id === id);
    if (genre) {
      genreNames.push(genre.name);
    }
  });
  return genreNames.join(", ");
};
