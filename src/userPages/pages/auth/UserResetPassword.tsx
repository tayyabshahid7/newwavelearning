import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import nwLogo from "../../static/images/logo.png";
import { isValidEmail } from "../../../common/utils";
import { sendResetPasswordEmail } from "../../../services/auth";
import { Link as RouterLink } from "react-router-dom";
import "./auth.scss";

const UserResetPassword = () => {
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
    debugger;
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
    <Grid
      container
      className="user-login"
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

          {!emailSent && (
            <Typography
              sx={{ margin: "15% 0 8% 0", fontWeight: "500" }}
              variant="h6"
              gutterBottom
              component="p"
            >
              RESET YOUR PASSWORD
            </Typography>
          )}
        </Grid>

        {emailSent ? (
          <Grid item sx={{ padding: "5% 10%", textAlign: "center" }}>
            <Typography variant="h6">You will shortly receive a password reset email. </Typography>
            <br />
            <Link component={RouterLink} to={"/user-login"} underline="none">
              Back to Login Page
            </Link>
          </Grid>
        ) : (
          <form onSubmit={handleSendEmail}>
            <Grid item sx={{ padding: "5.5%" }} container direction="column" spacing={4}>
              <Grid item>
                <Typography variant="body1" gutterBottom>
                  Enter your Email Address
                </Typography>
                <TextField
                  inputProps={{
                    style: {
                      padding: "11.5px",
                    },
                  }}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  fullWidth
                  error={emailError}
                  FormHelperTextProps={{
                    style: {
                      marginLeft: 0,
                    },
                  }}
                  helperText={emailError && "Please input a valid email."}
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
                <Grid mt="75%" item>
                  <Button
                    sx={{ padding: "13.39px", fontSize: "20px", fontWeight: 500 }}
                    variant="contained"
                    fullWidth
                    size="large"
                    onClick={handleSendEmail}
                    disabled={loading}
                  >
                    RESET PASSWORD
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

export default UserResetPassword;
