import { alpha } from "@mui/material/styles";

// I use #00695C as primary color and #D4E157
// as secondary color at
// https://material-foundation.github.io/material-theme-builder/
// for color picker. for dark mode I don't like
// the default dark background since it is too dark,
// so I choose surface as background color
export const palette = {
  light: {
    palette: {
      primary: {
        main: "#00695C",
      },
      secondary: {
        main: "#D4E157",
      },
      background: {
        default: "#f7faf8",
        paper: "##ebefec",
      },
      error: {
        main: "#ba1a1a",
      },
      warning: {
        main: "#f68a00",
      },
      success: {
        main: "#21796b",
      },
      divider: alpha("#d7dbd8", 0.4),
      text: {
        primary: "#212121",
        secondary: "#616161",
        warning: "#FF7043",
      },
      action: {
        hover: "#e5e9e6",
        selected: "#e0e3e1",
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
    },
  },
  dark: {
    palette: {
      primary: {
        main: "#83d5c5",
      },
      secondary: {
        main: "#c5cc7a",
      },
      background: {
        paper: "#252b2a",
        default: "#171d1b",
      },
      error: {
        main: "#da3734",
      },
      warning: {
        main: "#F57C00",
      },
      info: {
        main: "#004c42",
      },
      divider: alpha("#313634", 0.6),
      text: {
        primary: "hsl(0, 0%, 100%)",
        secondary: "#BDBDBD",
      },
      action: {
        hover: alpha("#303634", 0.2),
        selected: alpha("#343b39", 0.3),
      },
      baseShadow:
        "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
    },
  },
};
