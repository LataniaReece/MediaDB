import { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import { FavoriteMoviesProvider } from "./contexts/FavoriteMoviesContext";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { theme } from "./theme";
import { MovieGenreProvider } from "./contexts/MovieGenreContext";
import "react-multi-carousel/lib/styles.css";
import MediaCarousel from "./components/movies/MediaSlider";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
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

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoriteMoviesProvider>
        <MovieGenreProvider>
          <Router>
            <Navbar />
            <Box sx={{ mt: 3 }}>
              <Routes />
            </Box>
          </Router>
        </MovieGenreProvider>
      </FavoriteMoviesProvider>
    </ThemeProvider>
  );
};

export default App;
