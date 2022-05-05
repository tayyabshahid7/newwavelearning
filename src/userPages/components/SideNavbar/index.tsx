import React from "react";
import { Grid } from "@mui/material";
import JourneyIcon from "../../static/images/journey-icon-white.png";
import LeaderboardIcon from "../../static/images/leaderboard-white.png";
import FeedbackIcon from "../../static/images/feedback-icon-white.png";
import LiveIcon from "../../static/images/live-session-white.png";
import SideNavbarLogo from "../../static/images/side-logo.png";
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

const SideNavbar = ({ cohortId, programmeId }: any) => {
  const history = useHistory();

  const logout = () => {
    localStorage.clear();
    window.location.href = "/user-login";
  };

  const clickHandler = (item: any) => {
    item.name === "Leaderboard" || item.name === "Feedback"
      ? history.push(`/${item.link}/${cohortId}/${programmeId}`)
      : history.push(`/${item.link}/${cohortId}`);
  };

  return (
    <Grid className="side-nav">
      <img src={SideNavbarLogo} style={{ marginBottom: "30px" }} alt="" />
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
                    style={{ objectFit: "cover", marginRight: "10px" }}
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
        <Grid>
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
