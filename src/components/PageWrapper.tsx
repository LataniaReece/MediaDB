import { Box, SxProps, Theme } from "@mui/material";

export default function PageWrapper(props: {
  children: JSX.Element | Array<JSX.Element | null | false | "">;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        pt: { xs: 8, sm: 6 },
        pb: 4,
        px: { xs: 2, md: 8 },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
}
