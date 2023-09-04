import { FC } from "react";
import {
  Box,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StylesObject } from "../../types/utility";

interface MediaPaginationProps {
  totalPages: number;
  page: number;
  handlePageChange: (_: React.ChangeEvent<unknown>, value: number) => void;
}

const styles: StylesObject = {
  paginationContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageNumber: {
    mb: { xs: 2, sm: 0 },
    fontWeight: "bold",
  },
};

const MediaPagination: FC<MediaPaginationProps> = ({
  totalPages,
  page,
  handlePageChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      <Box sx={styles.paginationContainer}>
        <Typography sx={styles.pageNumber}>Page: {page}</Typography>
        <Pagination
          // Although we have total_pages, api only allows pages up to 500
          count={totalPages > 500 ? 500 : totalPages}
          page={page}
          onChange={handlePageChange}
          size={isMobile ? "small" : "medium"}
        />
      </Box>
    </Stack>
  );
};

export default MediaPagination;
