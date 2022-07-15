import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useHistory, useParams } from "react-router";
import arrowIcon from "../../static/images/right-arrow 6.png";
import LeaderBoardIcon from "../../static/images/leaderboard.png";
import { Burger, Menu } from "../../components/BurgerMenu";
import Loading from "../../../components/Loading";
import "./style.scss";
import { getCohortLearners } from "../../../services/common";
import { useSnackbar } from "notistack";
import SideNavbar from "../../components/SideNavbar";
import sidebarBgImage from "../../static/images/leftBar.svg";

interface LeaderboardPageParams {
  programmeId: string;
  cohortId: string;
}

const LeaderBoard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { cohortId, programmeId } = useParams<LeaderboardPageParams>();
  const [open, setOpen] = useState(false);
  const node: any = useRef();
  const [learners, setLearners] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCohortData = async () => {
      setLoading(true);
      try {
        let learnersList: any = await getCohortLearners(cohortId);
        learnersList.sort((a: any, b: any) => {
          return b.completed_section - a.completed_section;
        });
        setLearners(learnersList);
      } catch (error: any) {
        enqueueSnackbar("There was an error fetching cohort details.", { variant: "error" });
      }
      setLoading(false);
    };
    fetchCohortData();
  }, [cohortId, enqueueSnackbar]);

  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid
        item
        xs={2}
        sx={{
          width: "22%",
          position: "relative",
          "@media (max-width: 768px)": {
            width: "0 !important",
          },
          "@media (max-width: 1024px)": {
            width: "36%",
          },
        }}
      >
        <SideNavbar cohortId={cohortId} programmeId={programmeId} />
      </Grid>{" "}
      <Grid
        item
        xs={8}
        className="leaderboard mobile"
        container
        style={{
          position: "relative",
          backgroundColor: "#F1F5FF",
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
              padding: "6% 0%",
              display: "flex",
              alignItems: "center",
              marginBottom: "2%",
            }}
          >
            <img
              className={"back-arrow"}
              onClick={() => history.push(`/user-dashboard/${cohortId}`)}
              style={{ cursor: "pointer" }}
              src={arrowIcon}
              width="27px"
              height="27px"
              alt="Arrow Logo"
            />
            <Typography
              sx={{ fontWeight: "500" }}
              ml="20px"
              variant="h6"
              gutterBottom
              component="p"
            >
              LEADERBOARD
            </Typography>
            <Grid ref={node}>
              <Burger open={open} setOpen={setOpen} />
              <Menu
                cohortId={cohortId}
                open={open}
                setOpen={setOpen}
                close={() => {
                  setOpen(false);
                }}
              />
            </Grid>
          </Grid>

          {learners &&
            learners.map((item: any, index: number) => {
              return (
                <>
                  {index === 0 && (
                    <Grid
                      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
                      key={index}
                      className="section"
                    >
                      <Grid
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "98px",
                          height: "98px",
                          justifyContent: "center",
                          borderRadius: "50%",
                          fontSize: "22px",
                          fontWeight: "600",
                        }}
                      >
                        <img src={LeaderBoardIcon} alt={""} width="78.81px" />
                      </Grid>
                      <Grid>
                        <Typography className={"first-user-name"}>
                          {item.first_name} {item.last_name}
                        </Typography>
                        <Typography className={"first-section-completed"}>
                          {item.completed_steps}/{item.steps} Steps completed
                        </Typography>
                      </Grid>
                    </Grid>
                  )}

                  <Grid
                    sx={{ display: "flex", alignItems: "center" }}
                    key={index}
                    className="section"
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "40px",
                        height: "40px",
                        background: "#22B9D4",
                        justifyContent: "center",
                        borderRadius: "50%",
                        fontSize: "16px",
                        fontWeight: "600",
                      }}
                    >
                      {index + 1}
                    </Grid>
                    <Grid>
                      <p className={"user-name"}>
                        {item.first_name} {item.last_name}
                      </p>
                      <p className={"section-completed"}>
                        {item.completed_steps}/{item.steps} Steps completed
                      </p>
                    </Grid>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          background: `url(${sidebarBgImage}) no-repeat center center`,
          backgroundSize: "cover",
          position: "sticky",
          right: 0,
          top: 0,
          height: "100vh",
        }}
      ></Grid>
    </Grid>
  );
};

export default LeaderBoard;
