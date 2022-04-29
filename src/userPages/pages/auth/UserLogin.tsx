import React, { useEffect, useState } from "react";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import image from "../../static/images/login-image.png";
import nwLogo from "../../static/images/nw-logo.png";
import { isLoggedIn, loginUser } from "../../../services/auth";

interface LoginPageProps {
  history: RouteComponentProps["history"];
}

const UserLogin = ({ history }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState<any>(null);

  useEffect(() => {
    isLoggedIn() && history.push("/user-programmes");
  });

  const handleLogin = async () => {
    if (email.length <= 0) {
      setEmailError(true);
      return;
    }
    if (password.length <= 0) {
      setPasswordError(true);
      return;
    }

    try {
      await loginUser(email.toLowerCase(), password);
      window.location.href = "/user-programmes";
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoginError(error.response.data.detail);
      } else {
        const serverErrorText = "There was a server error, please try again.";
        setLoginError(serverErrorText);
      }
      console.log(error.response);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setEmailError(false);
      setLoginError(null);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length > 0) {
      setPasswordError(false);
      setLoginError(null);
    }
  };

  return (
    <Grid container sx={{ backgroundColor: "#F9FAFB", width: "100%" }}>
      <Grid
        item
        md={6}
        xs={12}
        sx={{
          background: `url(${image}) no-repeat center center`,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "@media (max-width: 767px)": {
            maxHeight: "25vh",
          },
        }}
      >
        <Typography variant="h4" color="white" sx={{ textAlign: "center" }}>
          Inspiring people to build a better future
        </Typography>
      </Grid>

      <Grid
        item
        md={6}
        xs={12}
        container
        sx={{
          "@media (max-width: 767px)": {
            justifyContent: "center",
          },
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            padding: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "@media (max-width: 767px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              "@media (max-width: 767px)": {
                marginTop: "15px",
              },
            }}
          >
            Account Login
          </Typography>
          <img src={nwLogo} alt="New Wave Learning Logo" />
        </Grid>

        <Grid item sx={{ padding: "10% 20%" }} container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="email"
              label="Email Address"
              value={email}
              onKeyDown={handleKeyDown}
              onChange={handleEmailChange}
              fullWidth
              error={emailError}
              helperText={emailError && "This field is required"}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={handlePasswordChange}
              fullWidth
              error={passwordError}
              helperText={passwordError && "This field is required"}
            />
          </Grid>
          <Grid item container spacing={1} direction="column">
            {loginError && (
              <Grid item>
                <Typography variant="body2" color="error">
                  {loginError}
                </Typography>
              </Grid>
            )}
            <Grid item>
              <Button variant="contained" fullWidth size="large" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/forgotten-password" underline="none">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLogin;
