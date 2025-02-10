import type { IconButtonProps } from "@mui/material/IconButton";

import { useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import IconButton from "@mui/material/IconButton";
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem";

export const _myAccount = {
  displayName: "Jaydon Frankie",
  email: "demo@minimals.cc",
  photoURL: "/assets/images/avatar/avatar-25.webp",
};

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AvatarPopover({
  data = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <DashboardRoundedIcon />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <SettingsRoundedIcon />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <LogoutRoundedIcon />,
    },
  ],
  sx,
  ...other
}: AccountPopoverProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleClosePopover();
      // router.push(path);
    },
    [handleClosePopover]
    // [handleClosePopover, router]
  );

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        sx={{
          p: "2px",
          width: 40,
          height: 40,
          background: (theme) =>
            `conic-gradient(${theme.palette.primary.light}, ${theme.palette.warning.light}, ${theme.palette.primary.light})`,
        }}
        {...other}
      >
        <Avatar
          src={_myAccount.photoURL}
          alt={_myAccount.displayName}
          sx={{ width: 1, height: 1 }}
        ></Avatar>
      </IconButton>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {_myAccount?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {_myAccount?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: "text.secondary",
              "&:hover": { color: "text.primary" },
              [`&.${menuItemClasses.selected}`]: {
                color: "text.primary",
                bgcolor: "action.selected",
                fontWeight: "fontWeightSemiBold",
              },
            },
          }}
        >
          {data.map((option) => (
            <MenuItem
              key={option.label}
              // selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text">
            Logout
          </Button>
        </Box>
      </Popover>
    </>
  );
}
