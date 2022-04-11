import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, Link, Backdrop } from "@mui/material";
import { Link as RouterLink, RouteComponentProps, useParams } from "react-router-dom";
import nwLogo from "../../static/images/logo.png";
import { checkToken, resetUserPassword } from "../../../services/auth";
import { isValidPassword } from "../../../common/utils";
import "./auth.scss";

interface PasswordResetProps {
  history: RouteComponentProps["history"];
}

type PasswordResetParams = {
  signature: string;
  token: string;
};

const UserSetPassword = ({ history }: PasswordResetProps) => {
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
              padding: "5%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              "@media (max-width: 767px)": {
                marginTop: "10%",
                padding: "10%",
              },
            }}
          >
            <img src={nwLogo} width="208px" height="121px" alt="New Wave Learning Logo" />
            {!resetSuccess && (
              <Typography
                sx={{
                  margin: "4% 0",
                  fontSize: "22px",
                  fontWeight: "500",
                  "@media (max-width: 767px)": {
                    margin: "15% 0",
                  },
                }}
                variant="h6"
                gutterBottom
                component="p"
              >
                Set Your Password
              </Typography>
            )}
          </Grid>

          {resetSuccess ? (
            <Grid>
              <Grid item sx={{ padding: "5% 10%", textAlign: "center" }}>
                <Typography variant="h6" sx={{ padding: "0 5%" }}>
                  You have successfully set your password - click the button below to login.
                </Typography>
              </Grid>
              <Grid mt="100%" item container direction="column">
                <Grid sx={{ padding: "0 6%" }} item>
                  <Button
                    sx={{
                      padding: "16px 13.39px",
                      fontSize: "24px",
                      fontWeight: 800,
                      backgroundColor: "#0E4A66",
                      boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                      borderRadius: "8px",
                    }}
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={() => history.push("user-login")}
                    disabled={loading}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : tokenError ? (
            <Grid
              item
              sx={{
                padding: "0 5%",
                marginLeft: "0",
                width: "100%",
                textAlign: "center",
                "@media (max-width: 767px)": {
                  padding: "10% 5%",
                },
              }}
              container
              direction="column"
              spacing={4}
            >
              <Typography variant="body1">Invalid/Expired Token.</Typography>
              <Link component={RouterLink} to={"/user-login"} underline="none">
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
                <Grid
                  item
                  sx={{
                    padding: "2%",
                    "@media (max-width: 767px)": {
                      padding: "5.5%",
                    },
                  }}
                  container
                  direction="column"
                >
                  <Grid item>
                    <Typography
                      sx={{ fontSize: "16px", fontWeight: 500, color: "#0E4A66" }}
                      variant="body1"
                      gutterBottom
                    >
                      Enter your password
                    </Typography>
                    <TextField
                      inputProps={{
                        style: {
                          padding: "11.5px",
                          border: "1px solid #0E4A66",
                          borderRadius: "4px",
                        },
                      }}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0,
                        },
                      }}
                      id="password"
                      value={passwords.password}
                      onChange={handleInputChange}
                      fullWidth
                      type="password"
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item sx={{ paddingTop: "13px !important" }}>
                    <Typography
                      sx={{ fontSize: "16px", fontWeight: 500, color: "#0E4A66" }}
                      variant="body1"
                      gutterBottom
                    >
                      Confirm your password
                    </Typography>
                    <TextField
                      inputProps={{
                        style: {
                          padding: "11.5px",
                          border: "1px solid #0E4A66",
                          borderRadius: "4px",
                        },
                      }}
                      FormHelperTextProps={{
                        style: {
                          marginLeft: 0,
                        },
                      }}
                      id="password2"
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
                  <Grid item container direction="column">
                    {requestError && (
                      <Grid item>
                        <Typography variant="body2" color="error">
                          There was an error resetting your password, pleas try again
                        </Typography>
                      </Grid>
                    )}
                    <Grid
                      item
                      sx={{
                        marginTop: "15%",
                        "@media (max-width: 767px)": {
                          marginTop: "75%",
                        },
                      }}
                    >
                      <Button
                        sx={{
                          padding: "16px 13.39px",
                          fontSize: "24px",
                          fontWeight: 800,
                          backgroundColor: "#0E4A66",
                          boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                          borderRadius: "8px",
                        }}
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={handleResetPassword}
                        disabled={loading}
                      >
                        Set Your Password
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSetPassword;
