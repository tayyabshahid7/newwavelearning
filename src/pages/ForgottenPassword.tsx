import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import image from "../static/login-image.png";
import nwLogo from "../static/nw-logo.png";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {};

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendEmail();
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
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <img src={nwLogo} alt="New Wave Learning Logo" />
        </Grid>
        <Grid item sx={{ padding: "5% 20%" }} container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="body1">Forgot your password?</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="email"
              label="Enter your email and reset your password"
              value={email}
              onKeyDown={handleKeyDown}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item container spacing={1} direction="column">
            <Grid item>
              <Button variant="contained" fullWidth size="large" onClick={handleSendEmail}>
                Send Email
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ForgottenPassword;
