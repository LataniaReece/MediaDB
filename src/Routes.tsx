import { FC, Suspense, lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const Home = lazy(() => import("./pages/Home"));
const MediaDetails = lazy(() => import("./pages/MediaDetails"));
const MediaFavorites = lazy(() => import("./pages/MediaFavorites"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MediaDiscover = lazy(() => import("./pages/MediaDiscover"));

const Routes: FC = () => {
  return (
    <Suspense fallback={<PageLoader>Loading...</PageLoader>}>
      <RouterRoutes>
        <Route path="/favorites/media/:type" element={<MediaFavorites />} />
        <Route path="/media/:type/:id" element={<MediaDetails />} />
        <Route path="/media/:type" element={<MediaDiscover />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes;
