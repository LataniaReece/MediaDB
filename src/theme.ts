import { createTheme } from "@mui/material/styles";

const AppColors = {
  bgColor: "#070A16",

  blue: "#669BE1",
  blueDark: "#081736",
  blueLight: "#BCD3F2",

  orange: "#F06543",

  red: "#B71C1C",
  redDark: "#8D1616",
};

const theme = createTheme({
  palette: {
    background: {
      default: AppColors.bgColor,
    },

    primary: {
      main: AppColors.blue,
      light: AppColors.blueLight,
      dark: AppColors.blueDark,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Roboto",
      color: "#fff",
    },
    h1: {
      fontSize: 28,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 30,
    },
    h3: {
      fontSize: 24,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: AppColors.orange,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          "& .MuiPaginationItem-ellipsis": {
            color: AppColors.blue,
          },
          "& .MuiButtonBase-root": {
            backgroundColor: AppColors.blueLight,
            margin: "0 2px",
            "&:hover": {
              backgroundColor: AppColors.blue,
            },
          },
          "& .Mui-selected": {
            backgroundColor: `${AppColors.blue} !important`,
          },
        },
      },
    },
  },
});

export { theme, AppColors };
