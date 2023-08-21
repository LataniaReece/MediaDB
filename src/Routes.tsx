import { Route, Routes as RouterRoutes } from "react-router-dom";

import Home from "./pages/Home";
import FavoriteShows from "./pages/FavoriteShows";
import FavoriteMovies from "./pages/FavoriteMovies";
import Shows from "./pages/Shows";
import Movies from "./pages/Movies";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/favorites/shows" element={<FavoriteShows />} />
      <Route path="/favorites/movies" element={<FavoriteMovies />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
}
