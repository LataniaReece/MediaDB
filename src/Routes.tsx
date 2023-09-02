import { FC } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import Home from "./pages/Home";
import FavoriteShows from "./pages/FavoriteShows";
import FavoriteMovies from "./pages/FavoriteMovies";
import MediaList from "./pages/MediaList";
import MediaDetails from "./pages/MediaDetails";

const Routes: FC = () => {
  return (
    <RouterRoutes>
      <Route path="/favorites/shows" element={<FavoriteShows />} />
      <Route path="/favorites/movies" element={<FavoriteMovies />} />
      <Route path="/media/:type" element={<MediaList />} />
      <Route path="/media/:type/:id" element={<MediaDetails />} />
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
};

export default Routes;
