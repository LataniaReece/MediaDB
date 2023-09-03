import { FC } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import Home from "./pages/Home";
import MediaDetails from "./pages/MediaDetails";
import MediaFavorites from "./pages/MediaFavorites";
import NotFound from "./pages/NotFound";
import MediaDiscover from "./pages/MediaDiscover";

const Routes: FC = () => {
  return (
    <RouterRoutes>
      <Route path="/favorites/media/:type" element={<MediaFavorites />} />
      <Route path="/media/:type" element={<MediaDiscover />} />
      <Route path="/media/:type/:id" element={<MediaDetails />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
