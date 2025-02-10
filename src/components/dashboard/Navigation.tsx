import { Drawer, useMediaQuery } from "@mui/material";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MenuContent from "./MenuContent";
import MenuIcon from "@mui/icons-material/Menu";

function Navigation() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState<boolean>(false);
  if (small) {
    return (
      <>
        <MenuIcon onClick={() => setOpen(true)} />
        <Drawer open={open} onClose={() => setOpen(false)}>
          <MenuContent />
        </Drawer>
      </>
    );
  } else {
    return <MenuContent />;
  }
}

export default Navigation;
