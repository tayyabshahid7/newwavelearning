import React from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/Live icon 1.png";
import "../style.scss";

const LiveSession = ({ data, liveSessionDetail }: any) => {
  return (
    <Grid sx={{ display: "flex" }}>
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
          <Grid sx={{ display: "flex", padding: "0 13px" }}>
            <img
              style={{ marginLeft: "10px" }}
              width="50px"
              height={"50px"}
              src={JourneyIcon}
              alt="img"
            />
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid sx={{ display: "flex" }}>
                <p className={"live-title"}>{data?.title}</p>
              </Grid>
              <Grid>
                <p className={"live-title"}>
                  {data?.session_type === "one_one_session"
                    ? "1-1 Session"
                    : data?.session_type === "group_session"
                    ? "Group Session"
                    : data?.session_type === "cohort_session"
                    ? "Cohort Session"
                    : null}
                </p>
              </Grid>
              <Grid sx={{ display: "flex" }}>
                <p className={"live-title"}>{liveSessionDetail?.start_time}</p>-
                <p style={{ marginLeft: "0" }} className={"live-title"}>
                  {liveSessionDetail?.end_time}
                </p>
              </Grid>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
            <p className={"live-description"}>{data?.step_description}</p>
          </Grid>

          <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
            <Typography variant="h4" component="p" className={"live-time"}>
              Duration: {data?.hours} Hr {data?.minutes} {data?.minutes ? "Min" : ""}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LiveSession;
