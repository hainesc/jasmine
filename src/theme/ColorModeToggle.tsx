import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightnessRounded";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export default function ColorModeToggle(props: IconButtonOwnProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  /**
   * Handles a click on the color mode toggle button.
   *
   * Toggles through the three color modes in order:
   * 1. Light mode
   * 2. System default mode
   * 3. Dark mode
   */
  const handleClick = () => {
    switch (mode) {
      case "light":
        // If the current mode is light, switch to the system default mode.
        setMode("system");
        break;
      case "system":
        // If the current mode is system default, switch to dark mode.
        setMode("dark");
        break;
      case "dark":
        // If the current mode is dark, switch back to light mode.
        setMode("light");
        break;
    }
  };

  const resolvedMode =
    systemMode == null ? (mode == null ? "light" : mode) : "system";
  const icon = {
    system: <SettingsBrightnessIcon />,
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];
  return (
    <React.Fragment>
      <Tooltip title="Switch color mode">
        <IconButton
          data-screenshot="toggle-mode"
          onClick={handleClick}
          disableRipple
          size="small"
          aria-haspopup="true"
          {...props}
        >
          {icon}
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}
