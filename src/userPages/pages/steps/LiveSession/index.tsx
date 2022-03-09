import React from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/journey-icon.png";
import "./style.scss";

const LiveSession = ({ title, description, hours, minutes }: any) => {
  return (
    <>
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
            <p className={"live-title"}>{title}</p>
          </Grid>
          <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
            <p className={"live-description"}>{description}</p>
          </Grid>

          <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
            <Typography variant="h4" component="p" className={"live-time"}>
              {"Durationss"} : {hours} {minutes ? ":" : ""} {minutes} {minutes ? "Min" : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LiveSession;
