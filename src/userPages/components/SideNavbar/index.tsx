import React from "react";
import { Grid } from "@mui/material";
import JourneyIcon from "../../static/images/dashboard-icon.svg";
import LeaderboardIcon from "../../static/images/leaderboard-icon.svg";
import FeedbackIcon from "../../static/images/feedback-icon.svg";
import LiveIcon from "../../static/images/live-session-icon.svg";
import SideNavbarLogo from "../../static/images/nw-logo-white.svg";
import "./style.scss";
import { useHistory } from "react-router";

const options = [
  {
    name: "Dashboard",
    icon: JourneyIcon,
    link: "user-dashboard",
  },
  {
    name: "Feedback",
    icon: FeedbackIcon,
    link: "user-feedback",
  },
  {
    name: "Live Sessions",
    icon: LiveIcon,
    link: "user-live-sessions",
  },
  {
    name: "Leaderboard",
    icon: LeaderboardIcon,
    link: "leaderboard",
  },
];

interface ISideNavbar {
  cohortId: any;
  programmeId: any;
  openProgramme?: any;
  openLiveSession?: any;
  openFeedback?: any;
  openLeaderboard?: any;
}

const SideNavbar = ({
  cohortId,
  programmeId,
  openProgramme,
  openLiveSession,
  openFeedback,
  openLeaderboard,
}: ISideNavbar) => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/user-login";
  };

  const clickHandler = (item: any) => {
    if (item.name === "Dashboard" && openProgramme) {
      openProgramme();
    } else if (item.name === "Live Sessions" && openLiveSession) {
      openLiveSession();
    } else if (item.name === "Feedback" && openFeedback) {
      openFeedback();
    } else if (item.name === "Leaderboard" && openLeaderboard) {
      openLeaderboard();
    } else {
      item.name === "Leaderboard" || item.name === "Feedback"
        ? history.push(`/${item.link}/${cohortId}/${programmeId}`)
        : history.push(`/${item.link}/${cohortId}`);
    }
  };

  return (
    <Grid
      className="side-nav"
    >
      <img
        width={"100%"}
        src={SideNavbarLogo}
        style={{
          objectFit: "cover",
          padding: "20px",
          maxWidth: "200px",
          display: "flex",
          margin: "auto",
        }}
        alt=""
      />
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "80vh",
        }}
      >
        <Grid>
          {options.map((item, index) => {
            return (
              <Grid
                key={index}
                sx={{
                  cursor: "pointer",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                  minWidth: "300px",
                }}
              >
                <span
                  onClick={() => {
                    clickHandler(item);
                  }}
                  className="items"
                >
                  <img
                    style={{ marginRight: "10px" }}
                    src={item.icon}
                    width="35px"
                    height="35px"
                    alt="Card logo"
                  />
                  <p className={"name"}>{item.name}</p>
                </span>
              </Grid>
            );
          })}
        </Grid>
        <Grid sx={{ cursor: "pointer" }}>
          <p
            onClick={() => {
              logout();
            }}
            className={"name"}
          >
            Logout
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SideNavbar;
