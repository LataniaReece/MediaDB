import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";

interface SearchMoviesProps {
  setRequestedQuery: React.Dispatch<React.SetStateAction<string>>;
}

function SearchMovies({ setRequestedQuery }: SearchMoviesProps) {
  const [query, setQuery] = useState("");
  const [showHelperText, setShowHelperText] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowHelperText(false);
    if (query) {
      setRequestedQuery(query);
    } else {
      setShowHelperText(true);
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          label="Search Movies"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button type="submit" variant="contained">
                  Search
                </Button>
              </InputAdornment>
            ),
          }}
        />
        {showHelperText && (
          <Alert severity="info" variant="outlined" sx={{ border: 0 }}>
            Please enter what you're looking for and we'll try to find it for
            you!
          </Alert>
        )}
      </FormControl>
    </Box>
  );
}

export default SearchMovies;
