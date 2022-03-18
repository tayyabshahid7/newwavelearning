import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../../static/images/journey-icon.png";
import arrowIcon from "../../../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";
import "./../style.scss";

const LiveSessionDetail = () => {
  const history = useHistory();
  const [liveSession, setLiveSession] = useState<any>([]);

  useEffect(() => {
    let state: any = history.location.state;
    state && setLiveSession(state.data);
  }, [history.location.state]);

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
                  <p className={"live-title"}>{liveSession.step?.fields.title}</p>
                  <p className={"live-title"} style={{ marginLeft: "0" }}>
                    {liveSession.step?.fields.session_type === "one_one_session"
                      ? "1-1 Session"
                      : liveSession.step?.fields.session_type === "group_session"
                      ? "Group Session"
                      : liveSession.step?.fields.session_type === "cohort_session"
                      ? "Cohort Session"
                      : null}
                  </p>
                </Grid>
                <Grid sx={{ display: "flex" }}>
                  <p className={"live-title"}>{liveSession.start_time}</p>-
                  <p style={{ marginLeft: "0" }} className={"live-title"}>
                    {liveSession.end_time}
                  </p>
                </Grid>
              </Grid>
            </Grid>

            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <p className={"live-description"}>{liveSession.step?.fields.description}</p>
            </Grid>

            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <Typography variant="h4" component="p" className={"live-time"}>
                Duration: {liveSession.step?.fields.hours} Hr {liveSession.step?.fields.minutes}{" "}
                {liveSession.step?.fields.minutes ? "Min" : ""}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default LiveSessionDetail;
