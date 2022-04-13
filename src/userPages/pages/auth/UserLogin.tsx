import React, { useEffect, useState } from "react";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import nwLogo from "../../static/images/logo.png";
import { isLoggedIn, loginUser } from "../../../services/auth";
import { isValidEmail } from "../../../common/utils";
import "./auth.scss";

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
    if (email.length <= 0 || !isValidEmail(email)) {
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
    <Grid sx={{ display: "flex" }}>
      <Grid
        className="user-login mobile"
        container
        style={{
          backgroundColor: "#F1F5FF",
          margin: "auto",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Grid item container direction="column">
          <Grid
            item
            sx={{
              width: "100%",
              padding: "5%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              "@media (max-width: 767px)": {
                marginTop: "10%",
                padding: "10%",
              },
            }}
          >
            <img src={nwLogo} width="208px" height="121px" alt="New Wave Learning Logo" />
            <Typography
              sx={{ margin: "5% 0 0% 0", fontWeight: "500" }}
              variant="h5"
              gutterBottom
              component="p"
            >
              Login
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              padding: "2%",
              "@media (max-width: 767px)": {
                padding: "5% 6% 10% 6%",
              },
            }}
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
                Email Address
              </Typography>
              <TextField
                inputProps={{
                  style: {
                    padding: "11.5px",
                    border: "1px solid #0E4A66",
                  },
                }}
                id="email"
                value={email}
                onKeyDown={handleKeyDown}
                onChange={handleEmailChange}
                fullWidth
                error={emailError}
                FormHelperTextProps={{
                  style: {
                    marginLeft: 0,
                  },
                }}
                helperText={emailError && "Please input a valid email."}
              />
            </Grid>
            <Grid item sx={{ paddingTop: "10px !important" }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
                Password
              </Typography>
              <TextField
                inputProps={{
                  style: {
                    padding: "11.5px",
                    border: "1px solid #0E4A66",
                  },
                }}
                id="password"
                type="password"
                value={password}
                onKeyDown={handleKeyDown}
                onChange={handlePasswordChange}
                fullWidth
                error={passwordError}
                FormHelperTextProps={{
                  style: {
                    marginLeft: 0,
                  },
                }}
                helperText={passwordError && "Please input a valid password."}
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
              <Grid item sx={{ paddingTop: "5px !important" }}>
                <Link
                  sx={{
                    color: "black",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  component={RouterLink}
                  to="/user-reset-password"
                  underline="none"
                >
                  Forgotten password?
                </Link>
              </Grid>
              <Grid
                sx={{
                  marginTop: "10%",
                  "@media (max-width: 767px)": {
                    marginTop: "64%",
                  },
                }}
                item
              >
                <Button
                  variant="contained"
                  sx={{
                    padding: "16px 13.39px",
                    fontSize: "24px",
                    fontWeight: 800,
                    backgroundColor: "#0E4A66",
                    boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                    borderRadius: "8px",
                  }}
                  fullWidth
                  size="large"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLogin;
