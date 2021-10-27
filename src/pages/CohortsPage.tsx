import React from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

const CohortsPage = () => {
  return (
    <DashboardLayout selectedPage={"cohorts"}>
      <Typography variant="h2">COHORTS</Typography>
    </DashboardLayout>
  );
};

export default CohortsPage;
