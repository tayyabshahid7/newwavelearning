import * as React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, IconButton, Badge } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import SidebarMenu from "../SidebarMenu.tsx/SidebarMenu";

const drawerWidth = 240;

interface DashboardLayoutProps {
  children: JSX.Element;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: "flex" }}>
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
      <SidebarMenu />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        <Toolbar sx={{ bgcolor: "#F5F6F8" }} />
        {children}
      </Box>
    </Box>
  );
}
