import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../static/images/journey-icon.png";
import LeaderboardIcon from "../../static/images/leaderboard.png";
import FeedbackIcon from "../../static/images/feedback.png";
import LiveIcon from "../../static/images/live.png";
import ArrowRightIcon from "../../static/images/right-arrow.png";
import { useHistory, useParams } from "react-router";
import { getProgrammeDetails } from "../../../services/common";
import "./style.scss";

const dashboardData = [
  {
    title: "Learning Journey",
    description: "Start Your Learning Journey Here",
    icon: JourneyIcon,
  },
  {
    title: "Leaderboard",
    description: "Check Out Your Results",
    icon: LeaderboardIcon,
  },
  {
    title: "Feedback",
    description: "View All Your Feedback",
    icon: FeedbackIcon,
  },
  {
    title: "Live Sessions",
    description: "View Your Live",
    icon: LiveIcon,
  },
];

interface ProgrammePageParams {
  programmeId: string;
}

const UserDashboard = () => {
  const history = useHistory();
  const { programmeId } = useParams<ProgrammePageParams>();
  const [programme, setProgramme] = useState<any>(null);

  useEffect(() => {
    const fetchProgrammeData = async () => {
      try {
        const programmeDetails = await getProgrammeDetails(programmeId);
        setProgramme(programmeDetails.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgrammeData();
  }, [programmeId]);

  return (
    <Grid
      className="dashboard"
      container
      style={{
        backgroundColor: "#F1F5FF",
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
        </Grid>

        <Grid
          onClick={() => {
            history.push(`/user-programmes-section/${programmeId}`);
          }}
          className="all-programmes"
        >
          <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
            <img width="68px" src={programme?.image} alt="programme img" />
            <p className={"programmes-title"}>{programme?.name}</p>
          </Grid>
          <img
            style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
            src={ArrowRightIcon}
            width="24px"
            height="40px"
            alt="arrow icon"
          />
        </Grid>

        <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
          {dashboardData.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                onClick={() => {
                  index === 0 && history.push(`/user-programmes-section/${programmeId}`);
                }}
                className="dashboard-card"
                xs={6}
              >
                <img src={item.icon} width={"50px"} alt={"icon"} />
                <p className={"dashboard-title"}>{item.title}</p>
                <p className={"dashboard-description"}>{item.description}</p>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDashboard;
