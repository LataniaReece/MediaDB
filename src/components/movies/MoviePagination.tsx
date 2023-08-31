import { FC } from "react";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { StylesObject } from "../../types/utility";

interface PaginationProps {
  totalPages: number;
  page: number;
  handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

const styles: StylesObject = {
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

const MoviePagination: FC<PaginationProps> = ({
  totalPages,
  page,
  handlePageChange,
}) => {
  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Box sx={styles.paginationContainer}>
        <Typography>Page: {page}</Typography>
        <Pagination
          // Although we have total_pages, api only allows pages up to 500
          count={totalPages > 500 ? 500 : totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Stack>
  );
};

export default MoviePagination;
