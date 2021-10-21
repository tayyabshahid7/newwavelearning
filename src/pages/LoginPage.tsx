import React, { useState } from "react";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import image from "../static/login-image.png";
import nwLogo from "../static/nw-logo.png";
import { loginUser } from "../services/auth";

interface LoginPageProps {
  history: RouteComponentProps["history"];
}

const LoginPage = ({ history }: LoginPageProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLogin = async () => {
    if (username.length <= 0) {
      setUsernameError(true);
      return;
    }
    if (password.length <= 0) {
      setPasswordError(true);
      return;
    }

    try {
      await loginUser(username, password);
      history.push("/dashboard");
    } catch (error: any) {
      if (error.response?.status === 401) {
        setLoginError(error.response.data.detail);
      }
      console.log(error.response);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (e.target.value.length > 0) {
      setUsernameError(false);
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
        xs={6}
        sx={{
          background: `url(${image}) no-repeat center center`,
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" color="white" sx={{ textAlign: "center" }}>
          Inspiring people to build a better future
        </Typography>
      </Grid>
      <Grid item xs={6} container direction="column">
        <Grid
          item
          sx={{
            padding: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">Account Login</Typography>
          <img src={nwLogo} alt="New Wave Learning Logo" />
        </Grid>
        <Grid item sx={{ padding: "10% 20%" }} container direction="column" spacing={2}>
          <Grid item>
            <TextField
              id="username"
              label="Username"
              value={username}
              onKeyDown={handleKeyDown}
              onChange={handleUsernameChange}
              fullWidth
              error={usernameError}
              helperText={usernameError && "This field is required"}
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

export default LoginPage;
