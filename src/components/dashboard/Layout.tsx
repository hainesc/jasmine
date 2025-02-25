import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ColorModeToggle from "../../theme/ColorModeToggle";
import Sitemark from "../branding/SitemarkIcon";
import { Card, Divider, Stack } from "@mui/material";
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

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction={"column"} sx={{ position: "sticky" }}>
      <AppBar
        enableColorOnDark
        sx={{
          position: "sticky",
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          width: "100vw",
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
            <Divider orientation="vertical" flexItem />
            <ColorModeToggle />
            <AvatarPopover />
          </Stack>
        </StyledToolbar>
      </AppBar>
      <Stack
        direction="row"
        sx={{
          position: "sticky",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            position: "sticky",
            maxWidth: "20%",
            overflowY: "scroll",
            height: "200px",
            top: 0,
          }}
        >
          <Card sx={{ position: "sticky", overflowY: "auto" }}>
            <p>Test</p>
          </Card>
          {(!small && <MenuContent />) || (
            <Drawer open={open} onClose={() => setOpen(false)}>
              <MenuContent />
            </Drawer>
          )}
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            ml: small ? 0 : 0,
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
}
