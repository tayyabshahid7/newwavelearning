import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/journey-icon.png";
import { getSessions } from "../../../../services/common";
import "./style.scss";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";

const LiveSession = () => {
  const history = useHistory();
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
            justifyContent: "space-between",
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
              <p className={"live-title"}>{stepData.title}</p>
            </Grid>
            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <p className={"live-description"}>{stepData.description}</p>
            </Grid>

            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <Typography variant="h4" component="p" className={"live-time"}>
                {"Durationss"} : {stepData.hours} {stepData.minutes ? ":" : ""} {stepData.minutes}{" "}
                {stepData.minutes ? "Min" : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LiveSession;
