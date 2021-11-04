import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, IconButton, Badge, Backdrop, CircularProgress } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import SidebarMenu from "../SidebarMenu";

interface DashboardLayoutProps {
  selectedPage?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const DashboardLayout = ({ selectedPage, loading = false, children }: DashboardLayoutProps) => {
  const drawerWidth = 240;
  return (
    <>
      <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ display: "flex", marginTop: "42px" }}>
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { md: "flex" } }}>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge variant={"dot"} color="error">
                  <Notifications color="disabled" />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <SidebarMenu selected={selectedPage} />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar sx={{ bgcolor: "#F5F6F8" }} />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
