import React from "react";
import { Stack, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import nwLogo from "static/nw-logo.png";
import { useHistory } from "react-router";

const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
      <Stack spacing={2} alignItems="center">
        <img src={nwLogo} alt="new wave learning logo" width={150} />
        <Typography variant="h4">404 Page not found</Typography>
        <Button variant="text" color="primary" onClick={() => history.goBack()}>
          Go back
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
