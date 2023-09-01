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
        flexGrow: 1,
        // pt: { xs: 8, sm: 0 },
        pb: 4,
        px: { xs: 2, md: 8 },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
};

export default PageWrapper;
