import { createTheme } from "@mui/material/styles";

const AppColors = {
  blue: "#454B63",
  blueLight: "#9FA5BC",
  blueLighter: "#E7E9EF",
  blueDark: "#2A2D3C",
};

const theme = createTheme({
  palette: {
    primary: {
      main: AppColors.blue,
      dark: AppColors.blueDark,
      light: AppColors.blueLight,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Roboto",
    },
    h1: {
      fontSize: 36,
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
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "text" && {
            textTransform: "capitalize",
            fontSize: 16,
            "&:hover": {
              backgroundColor: AppColors.blueLight,
              color: "black",
            },
          }),
        }),
      },
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          "& .Mui-selected": {
            backgroundColor: AppColors.blueLight,
          },
          "& .MuiButtonBase-root": {
            "&:hover": {
              backgroundColor: AppColors.blueLight,
            },
          },
        },
      },
    },
  },
});

export { theme, AppColors };
