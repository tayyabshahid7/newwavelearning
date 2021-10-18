import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for nwl app
let theme = createTheme({
  palette: {
    primary: {
      main: "#0E4A66",
    },
    secondary: {
      main: "#fd773b",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
