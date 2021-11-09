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
import { useHistory } from "react-router";

interface SidebarMenuProps {
  selected?: string;
}

const SidebarMenu = ({ selected }: SidebarMenuProps) => {
  const user = getUser();
  const history = useHistory();
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
        <ListItemButton onClick={() => history.push("/cohorts")} selected={selected === "cohorts"}>
          <ListItemIcon>
            <CohortsIcon />
          </ListItemIcon>
          <ListItemText primary={"Cohorts"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => history.push("/programmes")}
          selected={selected === "programmes"}
        >
          <ListItemIcon>
            <ProgrammesIcons />
          </ListItemIcon>
          <ListItemText primary={"Programmes"} />
        </ListItemButton>
        <ListItemButton
          onClick={() => history.push("/feedback")}
          selected={selected === "feedback"}
        >
          <ListItemIcon>
            <FeedbackIcon />
          </ListItemIcon>
          <ListItemText primary={"Feedback"} />
        </ListItemButton>
        <ListItemButton onClick={() => history.push("/users")} selected={selected === "users"}>
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
