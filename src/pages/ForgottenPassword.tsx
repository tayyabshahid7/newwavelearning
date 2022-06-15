import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import image from "../static/login-image.svg";
import nwLogo from "../static/nw-logo.png";
import { LOGIN_PAGE } from "../common/constants";
import { isValidEmail } from "../common/utils";
import { sendResetPasswordEmail } from "../services/auth";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.length > 0) {
      setEmailError(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setRequestError(false);
    setLoading(true);
    if (isValidEmail(email)) {
      try {
        const response = await sendResetPasswordEmail(email);
        console.log(response);
        setEmailSent(true);
        return;
      } catch (error: any) {
        console.log(error);
        setRequestError(true);
      }
    } else {
      setEmailError(true);
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
        {emailSent ? (
          <Grid item sx={{ padding: "5% 10%", textAlign: "center" }}>
            <Typography variant="h5">Email sent, please check your inbox.</Typography>
            <br />
            <Typography variant="caption">
              (If the email exists you will be get a link to reset your password.)
            </Typography>
            <br />
            <br />
            <Link component={RouterLink} to={LOGIN_PAGE} underline="none">
              Back to Login Page
            </Link>
          </Grid>
        ) : (
          <form onSubmit={handleSendEmail}>
            <Grid item sx={{ padding: "5% 20%" }} container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="body1">Forgot your password?</Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="email"
                  label="Enter your email and reset your password"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  helperText={emailError && "Please input a valid email."}
                  error={emailError}
                  disabled={loading}
                />
              </Grid>
              <Grid item container spacing={1} direction="column">
                {requestError && (
                  <Grid item>
                    <Typography variant="body2" color="error">
                      There was an error sending the email, pleas try again
                    </Typography>
                  </Grid>
                )}
                <Grid item>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSendEmail}
                    disabled={loading}
                  >
                    Send Email
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </Grid>
  );
};

export default ForgottenPassword;
