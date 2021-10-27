import React from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

const ProgrammesPage = () => {
  return (
    <DashboardLayout selectedPage={"programmes"}>
      <Typography variant="h2">PROGRAMMES</Typography>
    </DashboardLayout>
  );
};

export default ProgrammesPage;
