import { FC } from "react";
import { Pagination, Stack } from "@mui/material";

interface PaginationProps {
  count: number;
}

const MoviePagination: FC<PaginationProps> = ({ count }) => {
  return (
    <Stack spacing={2}>
      <Pagination count={count} color="primary" />
    </Stack>
  );
};

export default MoviePagination;
