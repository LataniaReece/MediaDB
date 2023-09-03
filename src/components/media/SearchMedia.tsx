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

interface SearchMediaProps {
  setRequestedQuery: React.Dispatch<React.SetStateAction<string>>;
  type: string | undefined;
}

const styles: StylesObject = {
  searchField: {
    backgroundColor: AppColors.bgColor,
    "& .MuiInputBase-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#fff",
      },
    },
  },
};

const SearchMedia: FC<SearchMediaProps> = ({ setRequestedQuery, type }) => {
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
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            label={type === "movies" ? "Search Movies" : "Search Shows"}
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
    </>
  );
};

export default SearchMedia;
