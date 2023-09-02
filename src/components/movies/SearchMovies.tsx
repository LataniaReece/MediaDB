import React, { FC, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
import { StylesObject } from "../../types/utility";
import { AppColors } from "../../theme";

interface SearchMoviesProps {
  setRequestedQuery: React.Dispatch<React.SetStateAction<string>>;
}

const styles: StylesObject = {
  // searchField: {
  //   backgroundColor: AppColors.bgColor,
  //   border: "1px #fff solid",
  //   color: "#fff",
  // },
  searchField: {
    backgroundColor: AppColors.bgColor,
    "& .MuiInputBase-root": {
      border: "1px solid #fff",
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
      // transform: "none", // Disable label animation on input focus
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff", // Customize the border color on focus
      },
    },
  },
};

const SearchMovies: FC<SearchMoviesProps> = ({ setRequestedQuery }) => {
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
          sx={styles.searchField}
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
};

export default SearchMovies;
