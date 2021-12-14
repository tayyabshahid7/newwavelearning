import { createTheme, responsiveFontSizes } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    orange: true;
  }
}

// A custom theme for nwl app
let theme = createTheme({
  palette: {
    primary: {
      main: "#22B9D4",
      light: "#0f0",
    },
    secondary: {
      main: "#0E4A66",
    },
    orange: {
      main: "#FD773B",
    },
    background: {
      default: "#F5F6F8",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          color: "white",
        },
      },
      defaultProps: {
        disableElevation: true,
        variant: "contained",
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "white",
          boxShadow: "none",
          borderBottom: "1px solid #EBEFF2",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 0px 10px 0px #d7d2d2",
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiSelect: {
      styleOverrides: {
        outlined: {
          background: "white",
          height: "10px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          backgroundColor: "#22B9D4",
          color: "#FFFFFF",
          borderRadius: "5px",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
