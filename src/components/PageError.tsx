import { FC } from "react";
import { Button, SxProps, Theme, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import PageWrapper from "./PageWrapper";

const PageError: FC<{ sx?: SxProps<Theme> }> = (props) => {
  const location = useLocation();

  return (
    <PageWrapper
      sx={{ height: "100%", textAlign: "center", mt: 10, ...props.sx }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Uh oh, looks like there's an error. Try again.
      </Typography>
      {location.pathname !== "/" && (
        <Button component={Link} to="/" variant="contained">
          Go Home
        </Button>
      )}
    </PageWrapper>
  );
};

export default PageError;
