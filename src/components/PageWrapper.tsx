import { FC } from "react";
import { Box, SxProps, Theme } from "@mui/material";

const PageWrapper: FC<{
  children: JSX.Element | Array<JSX.Element | null | false | "">;
  sx?: SxProps<Theme>;
}> = (props) => {
  return (
    <Box
      component="main"
      sx={{
        pb: 4,
        px: { xs: 2, md: 8 },
        ml: { xs: 0, md: 30 },
        mt: { xs: 10, md: 0 },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default PageWrapper;
