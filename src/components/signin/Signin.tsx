import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Provider from "../../theme/Theme";
import SignInCard from "./SignInCard";
import Header from "../common/Header";
import Content from "./Content";

export default function SignIn() {
  return (
    <Provider>
      <CssBaseline enableColorScheme />
      <Header />
      <Stack
        direction="column"
        component="main"
        sx={[
          {
            justifyContent: "center",
            height: "calc((1 - var(--mui-frame-height, 0)) * 100%)",
            marginTop: "max(40px - var(--mui-frame-height, 0px), 0px)",
            minHeight: "100%",
          },
        ]}
      >
        <Stack
          direction={{ xs: "column-reverse", md: "row" }}
          sx={{
            justifyContent: "center",
            gap: { xs: 6, sm: 12 },
            p: 2,
            mx: "auto",
          }}
        >
          <Stack
            direction={{ xs: "column-reverse", md: "row" }}
            sx={{
              justifyContent: "center",
              gap: { xs: 6, sm: 12 },
              p: { xs: 2, sm: 4 },
              m: "auto",
            }}
          >
            <Content />
            <SignInCard />
          </Stack>
        </Stack>
      </Stack>
    </Provider>
  );
}
