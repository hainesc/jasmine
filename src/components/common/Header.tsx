import Stack from "@mui/material/Stack";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import MenuButton from "./MenuButton";
import ColorModeToggle from "../../theme/ColorModeToggle";
import Search from "../dashboard/Search";
import { AvatarPopover } from "../dashboard/AvatarPopover";

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: "flex",
        width: "100%",
        alignItems: { xs: "flex-end", md: "center" },
        justifyContent: "flex-end",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeToggle />
        <AvatarPopover />
      </Stack>
    </Stack>
  );
}
