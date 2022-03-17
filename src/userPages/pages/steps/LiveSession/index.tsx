import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/journey-icon.png";
import { getSessions } from "../../../../services/common";
import "./style.scss";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";

const LiveSession = () => {
  const history = useHistory();

  const [stepDetail, setStepDetail] = useState<any>({
    start_time: "",
    end_time: "",
  });
  const [stepData, setStepData] = useState<any>({
    content: "",
    image: "",
    title: "",
    background_image: "",
    answers: [],
    description: "",
    audio: "",
    video: "",
    minutes: "",
    hours: "",
  });

  useEffect(() => {
    const fetchProgrammeData = async () => {
      try {
        const liveSessions: any = await getSessions();
        setStepDetail(liveSessions.data?.results[0]);
        setStepData(liveSessions.data?.results[0]?.step.fields);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgrammeData();
  }, []);

  return (
    <>
      <Grid
        container
        style={{
          background: "#FFFFFF",
          maxWidth: "420px",
          margin: "auto",
          minHeight: "100vh",
          width: "100%",
          display: "block",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            padding: "6% 5%",
            display: "flex",
            alignItems: "center",
            marginBottom: "2%",
            height: "85px",
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
            sx={{ fontWeight: "500", fontSize: "22px" }}
            ml="20px"
            mb="0"
            variant="h6"
            gutterBottom
            component="p"
          >
            LIVE SESSIONS
          </Typography>
        </Grid>
        <Grid
          sx={{
            paddingTop: "30px",
          }}
          className="live"
          item
          container
          direction="column"
        >
          <Grid className="live-section">
            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <img
                style={{ marginLeft: "10px" }}
                width="38px"
                height={"38px"}
                src={JourneyIcon}
                alt="img"
              />
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <Grid sx={{ display: "flex" }}>
                  <p className={"live-title"}>{stepData.title}</p>
                  <p className={"live-title"} style={{ marginLeft: "0" }}>
                    {stepData.session_type === "one_one_session"
                      ? "1-1 Session"
                      : stepData.session_type === "group_session"
                      ? "Group Session"
                      : stepData.session_type === "cohort_session"
                      ? "Cohort Session"
                      : null}
                  </p>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <p className={"live-title"}>{stepDetail.start_time}</p>-
                  <p style={{ marginLeft: "0" }} className={"live-title"}>
                    {stepDetail.end_time}
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <p className={"live-description"}>{stepData.description}</p>
            </Grid>

            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <Typography variant="h4" component="p" className={"live-time"}>
                Duration: {stepData.hours} Hr {stepData.minutes} {stepData.minutes ? "Min" : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LiveSession;
