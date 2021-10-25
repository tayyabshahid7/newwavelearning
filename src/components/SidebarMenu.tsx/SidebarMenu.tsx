import React from "react";
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import menuLogo from "../../static/nw-logo.png";
import { getUser, logout } from "../../services/auth";
import {
  DashboardOutlined as CohortsIcon,
  FeedbackOutlined as FeedbackIcon,
  AssignmentOutlined as ProgrammesIcons,
  Person as UsersIcon,
  MeetingRoomOutlined as LogoutIcon,
} from "@mui/icons-material";

const SidebarMenu = () => {
  const user = getUser();
  const sidebarWidth = 240;
  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <img src={menuLogo} alt="New Wave Logo" width={60} />
      </Toolbar>
      <List>
        <ListItem sx={{ pt: 3, pb: 3 }}>
          <ListItemIcon>
            <Avatar>TU</Avatar>
          </ListItemIcon>
          <ListItemText primary={user.name} secondary={user.role.toUpperCase()} />
        </ListItem>
        <ListItemButton>
          <ListItemIcon>
            <CohortsIcon />
          </ListItemIcon>
          <ListItemText primary={"Cohorts"} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ProgrammesIcons />
          </ListItemIcon>
          <ListItemText primary={"Programmes"} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary={"Feedback"} />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary={"Users"} />
        </ListItemButton>
      </List>
      <Divider />
      <List style={{ marginTop: `auto` }}>
        <ListItemButton onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
