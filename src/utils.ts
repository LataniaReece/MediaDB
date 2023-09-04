import { Movie, Show } from "./types/api";

export const isMovie = (media: Movie | Show): media is Movie => {
  return (media as Movie).title !== undefined;
};
