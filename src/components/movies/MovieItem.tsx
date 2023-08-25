import { Box, Grid, Link, Typography } from "@mui/material";
import { StylesObject } from "../../types/utility";
import { Movie } from "../../types/api";

interface MovieItemProps {
  movie: Movie;
  genres: string;
}

const styles: StylesObject = {
  movieGridItem: {
    transition: "transform 0.3s, border 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "&.MuiGrid-item": {
      pl: 0,
    },
  },
  movieImg: {
    width: "100%",
    maxWidth: "100%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    "&:hover": {
      boxShadow: "rgba(100, 100, 111, 0.6) 0px 7px 29px 0px",
    },
  },
  movieLink: {
    textDecoration: "none",
  },
  movieTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  movieGenres: {
    fontStyle: "italic",
    opacity: "80%",
  },
};

function MovieItem({ movie, genres }: MovieItemProps) {
  return (
    <Grid key={movie.id} item sx={styles.movieGridItem}>
      <Link href={`/movies/${movie.id}`} sx={styles.movieLink}>
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
          sx={styles.movieImg}
        />
        <Typography sx={styles.movieTitle}>{movie.title}</Typography>
        <Typography sx={styles.movieGenres}>{genres}</Typography>
      </Link>
    </Grid>
  );
}

export default MovieItem;
