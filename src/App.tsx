import { FC } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Routes from "./Routes";
import { theme } from "./theme";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FavoritesProvider>
        <Router>
          <Navbar />
          <Box sx={{ mt: 3 }}>
            <Routes />
          </Box>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
