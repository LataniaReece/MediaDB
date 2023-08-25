import { SxProps, Theme, Typography } from "@mui/material";
import PageWrapper from "./PageWrapper";

export default function PageLoader(props: {
  children: string;
  sx?: SxProps<Theme>;
}): JSX.Element {
  return (
    <PageWrapper
      sx={{ height: "100%", textAlign: "center", mt: 10, ...props.sx }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        {props.children}
      </Typography>
      <span className="loader"></span>
    </PageWrapper>
  );
}
