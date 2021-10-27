import React from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

const FeedbackPage = () => {
  return (
    <DashboardLayout selectedPage={"feedback"}>
      <Typography variant="h2">Feedback</Typography>
    </DashboardLayout>
  );
};

export default FeedbackPage;
