import { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import { FavoriteMoviesProvider } from "./contexts/FavoriteMoviesContext";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import { theme } from "./theme";
import { MovieGenreProvider } from "./contexts/MovieGenreContext";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoriteMoviesProvider>
        <MovieGenreProvider>
          <Router>
            <Box
              sx={{
                display: "flex",
                height: "100vh",
                width: "100%",
              }}
            >
              <Navbar />
              <Box sx={{ mt: 3, flexGrow: 1 }}>
                <Routes />
              </Box>
            </Box>
          </Router>
        </MovieGenreProvider>
      </FavoriteMoviesProvider>
    </ThemeProvider>
  );
};

export default App;
