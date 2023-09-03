import { FC } from "react";
import NearbyErrorIcon from "@mui/icons-material/NearbyError";
import { Button, Typography } from "@mui/material";
import PageError from "../components/PageError";
import { Link } from "react-router-dom";

const NotFound: FC = () => {
  return (
    <PageError>
      <NearbyErrorIcon sx={{ fontSize: 100 }} />
      <Typography variant="h5" sx={{ mb: 2 }}>
        Page not found!
      </Typography>
      {location.pathname !== "/" && (
        <Button component={Link} to="/" variant="contained">
          Go Home
        </Button>
      )}
    </PageError>
  );
};
export default NotFound;
