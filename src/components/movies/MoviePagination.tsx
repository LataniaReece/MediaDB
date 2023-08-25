import { Pagination, Stack } from "@mui/material";

interface PaginationProps {
  count: number;
}

function MoviePagination({ count }: PaginationProps) {
  return (
    <Stack spacing={2}>
      <Pagination count={count} color="primary" />
    </Stack>
  );
}

export default MoviePagination;
