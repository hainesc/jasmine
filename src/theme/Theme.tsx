import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { palette } from "./Palette";
import { TypographyOptions } from "@mui/material/styles/createTypography";

interface ThemeProps {
  children: React.ReactNode;
}

const typography: TypographyOptions = {
  button: {
    textTransform: "none",
  },
};

export const shape = {
  borderRadius: 8,
};

export default function Theme(props: ThemeProps) {
  const { children } = props;
  const theme = createTheme({
    colorSchemes: palette,
    typography: typography,
    shape,
  });

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
