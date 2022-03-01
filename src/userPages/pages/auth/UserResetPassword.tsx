import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import nwLogo from "../../static/images/logo.png";
import { isValidEmail } from "../../../common/utils";
import { sendResetPasswordEmail } from "../../../services/auth";
import "./auth.scss";
import { useHistory } from "react-router";

const UserResetPassword = () => {
  const history = useHistory();
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
        backgroundColor: "#F1F5FF",
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
              sx={{ margin: "15% 0 8% 0", fontSize: "22px", fontWeight: "500" }}
              variant="h6"
              gutterBottom
              component="p"
            >
              Reset Your Password
            </Typography>
          )}
        </Grid>

        {emailSent ? (
          <Grid>
            <Grid item sx={{ padding: "5% 10%", textAlign: "center" }}>
              <Typography variant="h6" sx={{ fontSize: "20px", color: "#0E4A66" }}>
                You will shortly receive a password reset email.{" "}
              </Typography>
              <br />
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
        ) : (
          <form onSubmit={handleSendEmail}>
            <Grid item sx={{ padding: "5.5%" }} container direction="column">
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "16px", fontWeight: 500, color: "#0E4A66" }}
                  gutterBottom
                >
                  Enter your Email Address
                </Typography>
                <TextField
                  inputProps={{
                    style: {
                      padding: "11.5px",
                      border: "1px solid #0E4A66",
                      borderRadius: "4px",
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
              <Grid item container direction="column">
                {requestError && (
                  <Grid item>
                    <Typography variant="body2" color="error">
                      There was an error sending the email, pleas try again
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid mt="100%" item>
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
                  onClick={handleSendEmail}
                  disabled={loading}
                >
                  Reset Your Password
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Grid>
    </Grid>
  );
};

export default UserResetPassword;
