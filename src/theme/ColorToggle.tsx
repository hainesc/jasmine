import * as React from "react";
import DarkModeIcon from "@mui/icons-material/DarkModeRounded";
import LightModeIcon from "@mui/icons-material/LightModeRounded";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightnessRounded";
import IconButton, { IconButtonOwnProps } from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

export default function ColorModeToggle(props: IconButtonOwnProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (mode === "light") {
      console.log("mode is light");
      setMode("system");
    } else if (mode === "system") {
      console.log("mode is system");
      setMode("dark");
    } else if (mode === "dark") {
      console.log("mode is dark");
      setMode("light");
    }
    // setAnchorEl(event.currentTarget);
  };
  console.log(mode == null ? "mode is null" : mode);
  console.log(systemMode == null ? "system mode is null" : systemMode);
  const resolvedMode =
    systemMode == null ? (mode == null ? "light" : mode) : "system";
  console.log(resolvedMode);
  console.trace();

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
