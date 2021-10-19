import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import image from "../static/login-image.png";
import nwLogo from "../static/nw-logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
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
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onKeyDown={handleKeyDown}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item container spacing={1} direction="column">
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
