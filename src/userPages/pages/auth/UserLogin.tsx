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
    isLoggedIn() && history.push("/cohorts");
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
      await loginUser(email, password);
      window.location.href = "/cohorts";
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
    <Grid
      className="user-login"
      container
      style={{
        backgroundColor: "#FFFFFF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
          mt="10%"
        >
          <img src={nwLogo} width="208px" height="121px" alt="New Wave Learning Logo" />
          <Typography
            sx={{ margin: "15% 0 8% 0", fontWeight: "500" }}
            variant="h6"
            gutterBottom
            component="p"
          >
            lOG-IN
          </Typography>
        </Grid>
        <Grid item sx={{ padding: "5% 6% 10% 6%" }} container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1" gutterBottom>
              Email Address
            </Typography>
            <TextField
              inputProps={{
                style: {
                  padding: "11.5px",
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
            <Typography variant="body1" gutterBottom>
              Password
            </Typography>
            <TextField
              inputProps={{
                style: {
                  padding: "11.5px",
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
            <Grid mt="10px" item sx={{ textAlign: "center" }}>
              <Link
                sx={{
                  color: "black",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                component={RouterLink}
                to="/user-reset-password"
                underline="none"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid mt="50%" item>
              <Button
                variant="contained"
                sx={{ padding: "13.39px", fontSize: "20px", fontWeight: 500 }}
                fullWidth
                size="large"
                onClick={handleLogin}
              >
                LOG-IN
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLogin;
