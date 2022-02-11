import React from "react";
import { Grid, Typography } from "@mui/material";
import burgerIcon from "../../static/images/burger-icon.svg";
import Card from "../../components/card";
import robotIcon from "../../static/images/robo.svg";
import clockImage from "../../static/images/clock.svg";
import "./style.scss";

const dashboardData = [
  {
    title: "Learning journey",
    description: "Start your learning here",
  },
  {
    title: "Leaderboard",
    description: "Check out your results",
  },
  {
    title: "Feedback",
    description: "View all your feedback",
  },
  {
    title: "Live Sessions",
    description: "View your live schedule",
  },
];

const UserDashboard = () => {
  return (
    <Grid
      className="dashboard"
      container
      style={{
        backgroundColor: "#FFFFFF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <Typography sx={{ fontWeight: "500" }} variant="h6" gutterBottom component="p">
            Dashboard
          </Typography>
          <img
            style={{ cursor: "pointer" }}
            src={burgerIcon}
            width="50px"
            height="27px"
            alt="New Wave Learning Logo"
          />
        </Grid>
        <Card title={"BuildMe"} image={robotIcon} />
        <Grid sx={{ display: "flex", alignItems: "center", margin: "0 13px" }}>
          <img width={"17px"} height={"17px"} src={clockImage} alt={"clock"} />
          <Typography
            sx={{ fontWeight: "600", marginLeft: "10px", color: "#505254" }}
            component="p"
          >
            3 Hours Remaining
          </Typography>
        </Grid>

        <div style={{ margin: "14px 13px" }}>
          <div className={"slider"}>
            <div className={"slider-bar"}></div>
          </div>
        </div>

        <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
          {dashboardData.map((item: any, index: number) => {
            return (
              <Grid className="dashboard-card" xs={6}>
                <p className={"dashboard-title"}>{item.title}</p>
                <p className={"dashboard-description"}>{item.description}</p>
              </Grid>
            );
          })}
        </Grid>
        {/*<Grid className="all-programmes" sx={{ display: "flex", flexDirection: "column" }}>*/}
        {/* */}
        {/*</Grid>*/}
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
