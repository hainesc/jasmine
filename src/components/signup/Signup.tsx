import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Theme from "../../theme/Theme";
import Header from "../common/Header";
import QRCode from "react-qr-code";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { GoogleIcon, FacebookIcon, SitemarkIcon } from "./CustomIcons";
import axios from "axios";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsla(250, 100.00%, 16%, 0.1), hsla(0, 0%, 100%,0.1))",
  backgroundRepeat: "no-repeat",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.1), hsla(220, 30%, 5%, 0.1))",
  }),
}));

interface IDToken {
  email_verified: boolean;
  exp: number;
  sub: string;
}
export default function SignUp() {
  const submitURL = "/api/auth/signup";
  const verifyURL = "/api/auth/verify";
  const [totp, setTotp] = React.useState("");
  const [name, setName] = React.useState("");
  const [signupSubmit, setSignupSubmit] = React.useState(false);
  const [verifySubmit, setVerifySubmit] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [codeError, setCodeError] = React.useState(false);
  const [codeErrorMessage, setCodeErrorMessage] = React.useState("");
  // const [cookies] = useCookies(["id_token"]);
  // only re-read cookie if step changes
  const [hasToken, emailVerify] = React.useMemo(() => {
    // since we don't want read cookie every re-render(for example,
    // just a nameError), and we cannot use hooks in useMemo hook
    // so we use universal-cookie and read not react-cookie here
    const cookies = new Cookies(null, { path: "/" });
    let cookie = cookies.get("id_token");
    const id_token = cookie == null ? "" : (cookie as string);
    try {
      let decoded = jwtDecode<IDToken>(id_token);
      if (name != decoded.sub) {
        console.log("set name here: ", decoded.sub);
        setName(decoded.sub);
      }
      return [true, decoded.email_verified];
    } catch (error) {
      console.log("bad token");
      return [false, false];
    }
  }, [signupSubmit, verifySubmit]);

  const validateCode = () => {
    const code = document.getElementById("code") as HTMLInputElement;
    console.log(code.value);
    if (!code.value || !/^[0-9]{6}$/.test(code.value)) {
      setCodeError(true);
      setCodeErrorMessage("verify code is a 6-digits number");
      return false;
    }

    setCodeError(false);
    setCodeErrorMessage("");
    return true;
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("name") as HTMLInputElement;
    let isValid = true;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }
    return isValid;
  };

  const handleCode = (event: React.FormEvent<HTMLFormElement>) => {
    if (codeError) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      code: data.get("code"),
    });

    axios
      .post(
        verifyURL,
        {
          code: data.get("code"),
        },
        { timeout: 400 }
      )
      .then((resp) => {
        setSignupSubmit(true);
        setErrMsg("");
        if (totp == "") {
          setTotp(resp.data.totp);
        }
        console.log(totp);
      })
      .catch((error) => {
        let errMsg = (function () {
          if (error.response) {
            return (
              error.response.data?.message ||
              "Error message missing in response"
            );
          } else {
            return error.message;
          }
        })();
        console.log(errMsg);
        setErrMsg(errMsg);
        setVerifySubmit(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (nameError || emailError || passwordError) {
      event.preventDefault();
      return;
    }
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post(
        submitURL,
        {
          name: data.get("name"),
          email: data.get("email"),
          password: data.get("password"),
        },
        { withCredentials: true, timeout: 4000 }
      )
      .then(() => {
        setErrMsg("");
        setSignupSubmit(true);
      })
      .catch((error) => {
        setSignupSubmit(false);
        let errMsg = (function () {
          if (error.response) {
            return (
              error.response.data?.message ||
              "Error message missing in response"
            );
          } else {
            return error.message;
          }
        })();
        console.log(errMsg);
        setErrMsg(errMsg);
      });
  };

  // 'otpauth://totp/roster:'+this.signupForm.controls['name'].value+'?secret='+payload.totp+'&issuer=roster'
  const card = React.useMemo(() => {
    if (name != "" && totp != "") {
      return (
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            TOTP QR-code
          </Typography>

          <Alert severity="success">Here is your totp QR code</Alert>

          <Box alignSelf={"center"}>
            <QRCode
              value={
                "otpauth://totp/roster:" +
                name +
                "?secret=" +
                totp +
                "&issuer=roster"
              }
            />
          </Box>
        </Card>
      );
    } else if (!hasToken || (hasToken && emailVerify && totp == "")) {
      return (
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {errMsg != "" && (
              <Alert
                severity="error"
                onClose={function () {
                  setErrMsg("");
                  setSignupSubmit(false);
                }}
              >
                Oops, Something wents wrong: {errMsg}
              </Alert>
            )}
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? "error" : "primary"}
                onChange={function () {
                  if (nameError) {
                    setNameError(false);
                    setNameErrorMessage("");
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={function () {
                  if (emailError) {
                    setEmailError(false);
                    setEmailErrorMessage("");
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
                onChange={function () {
                  if (passwordError) {
                    setPasswordError(false);
                    setPasswordErrorMessage("");
                  }
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/signin" variant="body2" sx={{ alignSelf: "center" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Card>
      );
    } else if (hasToken && !emailVerify) {
      return (
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            OTP Verification
          </Typography>
          {errMsg != "" ? (
            <Alert
              severity="error"
              onClose={function () {
                setErrMsg("");
                setVerifySubmit(false);
              }}
            >
              Oops, Something wents wrong: {errMsg}
            </Alert>
          ) : (
            <Alert severity="success">
              We've sent a verification code to your email
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleCode}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="code">Verify Code</FormLabel>
              <TextField
                autoComplete="code"
                name="code"
                required
                fullWidth
                id="code"
                error={codeError}
                helperText={codeErrorMessage}
                color={codeError ? "error" : "primary"}
                onChange={function () {
                  setCodeError(false);
                  setCodeErrorMessage("");
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateCode}
            >
              Submit
            </Button>
          </Box>
        </Card>
      );
    }
  }, [
    signupSubmit,
    verifySubmit,
    errMsg,
    emailError,
    nameError,
    passwordError,
    codeError,
    totp,
    name,
  ]);

  return (
    <Theme>
      <CssBaseline enableColorScheme />
      <Header />
      <SignUpContainer direction="column" justifyContent="space-between">
        {card}
      </SignUpContainer>
    </Theme>
  );
}
