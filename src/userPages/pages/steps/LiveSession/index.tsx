import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/journey-icon.png";
import "./style.scss";
import { getStepDetails } from "../../../../services/common";
import { useParams } from "react-router-dom";

const LiveSession = () => {
  const { stepId } = useParams<any>();
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
    const fetchStepData = async () => {
      try {
        const response: any = await getStepDetails(stepId);
        setStepData(response.fields);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchStepData();
  }, [stepId]);

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
        <Grid className="live" item container direction="column">
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
