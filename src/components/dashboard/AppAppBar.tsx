import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeToggle from "../../theme/ColorModeToggle";
import Sitemark from "../branding/SitemarkIcon";
import { Container, Stack } from "@mui/material";
import { AvatarPopover } from "./AvatarPopover";
import Search from "./Search";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuContent from "./MenuContent";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(12px)",
  border: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  // TODO: change css display none to react condition rendering
  return (
    <Stack spacing={0}>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            {small && (
              <IconButton
                aria-label="Menu button"
                onClick={() => {
                  open || setOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Sitemark />
          </Box>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Search />
            <ColorModeToggle />
            <AvatarPopover />
          </Stack>
        </StyledToolbar>
      </AppBar>

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 4, sm: 6 },
          gap: { xs: 3, sm: 6 },
        }}
      >
        {(!small && <MenuContent />) || (
          <Drawer open={open} onClose={() => setOpen(false)}>
            <MenuContent />
          </Drawer>
        )}
      </Box>
    </Stack>
  );
}
