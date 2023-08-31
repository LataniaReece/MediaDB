import { FC } from "react";
import { SxProps, Theme, Typography } from "@mui/material";
import PageWrapper from "./PageWrapper";

const PageLoader: FC<{
  children: string;
  sx?: SxProps<Theme>;
}> = (props) => {
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
};

export default PageLoader;
