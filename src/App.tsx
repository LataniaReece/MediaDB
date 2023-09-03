import { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { MovieGenreProvider } from "./contexts/MovieGenreContext";
import Routes from "./Routes";
import { theme } from "./theme";

import "react-multi-carousel/lib/styles.css";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <MovieGenreProvider>
          <Router>
            <Navbar />
            <Box sx={{ mt: 3 }}>
              <Routes />
            </Box>
          </Router>
        </MovieGenreProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
