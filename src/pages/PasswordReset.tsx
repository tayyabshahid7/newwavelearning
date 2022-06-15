import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, Link, Backdrop } from "@mui/material";
import { Link as RouterLink, RouteComponentProps, useParams } from "react-router-dom";
import image from "../static/login-image.svg";
import nwLogo from "../static/nw-logo.png";
import { LOGIN_PAGE } from "../common/constants";
import { checkToken, resetUserPassword } from "../services/auth";
import { isValidPassword } from "../common/utils";

interface PasswordResetProps {
  history: RouteComponentProps["history"];
}

type PasswordResetParams = {
  signature: string;
  token: string;
};

const PasswordReset = ({ history }: PasswordResetProps) => {
  const { signature, token } = useParams<PasswordResetParams>();
  const [passwords, setPasswords] = useState({ password: "", password2: "" });
  const [passwordErrors, setPasswordErrors] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIfTokenIsValid = async (sign: string, tok: string) => {
      setLoading(true);
      try {
        await checkToken(sign, tok);
      } catch (e) {
        setTokenError(true);
        console.log(e);
      }
      setLoading(false);
    };

    checkIfTokenIsValid(signature, token);
  }, [setTokenError, signature, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.id]: e.target.value });
    if (e.target.value.length > 0) {
      setPasswordErrors(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(false);
    setLoading(true);
    if (isValidPassword(passwords.password) && passwords.password === passwords.password2) {
      const data = {
        new_password: passwords.password,
        token: token,
        signature: signature,
      };
      try {
        await resetUserPassword(data);
        setResetSuccess(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      setPasswordErrors(true);
    }
    setLoading(false);
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
        {resetSuccess ? (
          <Grid item sx={{ padding: "5% 10%", textAlign: "center" }}>
            <Typography variant="h5">Your password has been reset successfully!</Typography>
            <Link component={RouterLink} to={LOGIN_PAGE} underline="none">
              Back to Login Page
            </Link>
          </Grid>
        ) : tokenError ? (
          <Grid
            item
            sx={{ padding: "5% 20%", textAlign: "center" }}
            container
            direction="column"
            spacing={4}
          >
            <Typography variant="body1">Invalid/Expired Token.</Typography>
            <Link component={RouterLink} to={LOGIN_PAGE} underline="none">
              Back to Login Page
            </Link>
          </Grid>
        ) : (
          <>
            <Backdrop
              open={loading}
              sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            />
            <form onSubmit={handleResetPassword}>
              <Grid item sx={{ padding: "5% 20%" }} container direction="column" spacing={4}>
                <Grid item>
                  <Typography variant="body1">Reset your password</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    id="password"
                    label="Enter your password"
                    value={passwords.password}
                    onChange={handleInputChange}
                    fullWidth
                    type="password"
                    disabled={loading}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="password2"
                    label="Re-Enter your password"
                    value={passwords.password2}
                    onChange={handleInputChange}
                    fullWidth
                    type="password"
                    helperText={
                      passwordErrors &&
                      "Passwords do not match or are too weak" +
                        "\n(Minimum eight characters, at least one letter" +
                        ", one number and one special character:)"
                    }
                    error={passwordErrors}
                    disabled={loading}
                  />
                </Grid>
                <Grid item container spacing={1} direction="column">
                  {requestError && (
                    <Grid item>
                      <Typography variant="body2" color="error">
                        There was an error resetting your password, pleas try again
                      </Typography>
                    </Grid>
                  )}
                  <Grid item>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleResetPassword}
                      disabled={loading}
                    >
                      Reset Password
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
