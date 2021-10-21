import React from "react";
import Typography from "@mui/material/Typography";
import { getUser, logout } from "../services/auth";
import Button from "@mui/material/Button";

const DashBoard = () => {
  const user = getUser();
  return (
    <>
      <Typography variant="h2">Hello {user.name}, this is the DASHBOARD</Typography>
      <Button variant="contained" color="orange" onClick={() => logout()}>
        logout
      </Button>
    </>
  );
};

export default DashBoard;
