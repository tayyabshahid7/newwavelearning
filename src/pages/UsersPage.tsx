import React from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

const UsersPage = () => {
  return (
    <DashboardLayout selectedPage={"users"}>
      <Typography variant="h2">Users</Typography>
    </DashboardLayout>
  );
};

export default UsersPage;
