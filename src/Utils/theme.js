import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    purple: {
      main: "#694A98",
      dark: "#49336a ",
      light: "#876eac",
    },
    blue: {
      main: "#1B95C8",
      dark: "#12688c",
      light: "#48aad3",
    },
    yellow: {
      main: "#ffc107",
      dark: "#b28704",
      light: "#ffcd38",
    },
  },
  typography: {
    fontFamily: [
      "Merriweather",
      "Poppins",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "serif",
    ].join(","),
  },
});

export default theme;
