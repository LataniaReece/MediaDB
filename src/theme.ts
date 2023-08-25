import { createTheme } from "@mui/material/styles";

const AppColors = {
  bgColor: "#F3F1F2",

  blue: "#454B63",
  blueLight: "#9FA5BC",
  blueDark: "#2A2D3C",
};

const theme = createTheme({
  palette: {
    background: {
      default: AppColors.bgColor,
    },
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
  },
});

export { theme, AppColors };
