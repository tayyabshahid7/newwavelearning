import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../static/images/journey-icon.png";
import LeaderboardIcon from "../../static/images/leaderboard.png";
import FeedbackIcon from "../../static/images/feedback.png";
import LiveIcon from "../../static/images/live.png";
import ArrowRightIcon from "../../static/images/right-arrow.png";
import { useHistory } from "react-router";
import { getProgrammes } from "../../../services/common";
import "./style.scss";
import arrowIcon from "../../static/images/right-arrow 6.png";
import { Burger, Menu } from "../../components/BurgerMenu";
import Loading from "../../../components/Loading";

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

const UserDashboard = () => {
  const history = useHistory();
  const [programme, setProgramme] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const node: any = useRef();
  const [loading, setLoading] = useState<boolean>(false);
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: any = await getProgrammes();
        if (response?.data?.results && response?.data?.results?.length > 0) {
          setProgramme(response.data.results[0]);
        }
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getProgrammeSections(Number(programmeId));
  //       debugger;
  //       setSections(response.data);
  //     } catch (error) {
  //       enqueueSnackbar("Could not fetch sections", { variant: "error" });
  //     }
  //   };
  //   fetchData();
  // }, [programmeId, enqueueSnackbar]);

  return (
    <Grid
      className="dashboard"
      container
      style={{
        position: "relative",
        backgroundColor: "#F1F5FF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Loading loading={loading} />
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            alignItems: "center",
            marginBottom: "2%",
            justifyContent: "space-between",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              onClick={() => history.goBack()}
              style={{ cursor: "pointer" }}
              src={arrowIcon}
              width="27px"
              height="27px"
              alt="Arrow Logo"
            />
            <Typography
              sx={{ fontWeight: "500" }}
              ml="20px"
              mb="0"
              variant="h6"
              gutterBottom
              component="p"
            >
              Dashboard
            </Typography>
          </Grid>
          <Grid ref={node}>
            <Burger open={open} setOpen={setOpen} />
            <Menu
              open={open}
              setOpen={setOpen}
              close={() => {
                setOpen(false);
              }}
            />
          </Grid>
        </Grid>

        <Grid
          onClick={() => {
            history.push(`/user-programmes-section/${programme?.id}`);
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
                  if (index === 0) history.push(`/user-programmes-section/${programme?.id}`);
                  if (index === 3) history.push(`/user-live-sessions/`);
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
