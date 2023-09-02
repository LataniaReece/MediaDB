import { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import { FavoriteMoviesProvider } from "./contexts/FavoriteMoviesContext";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { theme } from "./theme";
import { MovieGenreProvider } from "./contexts/MovieGenreContext";
import "react-multi-carousel/lib/styles.css";

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
