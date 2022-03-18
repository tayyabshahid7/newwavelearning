import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../../static/images/journey-icon.png";
import { getSessions } from "../../../../services/common";
import "./style.scss";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";

const LiveSession = () => {
  const history = useHistory();

  const [liveSession, setLiveSession] = useState<any>([]);

  // const [stepData, setStepData] = useState<any>({
  //   content: "",
  //   image: "",
  //   title: "",
  //   background_image: "",
  //   answers: [],
  //   description: "",
  //   audio: "",
  //   video: "",
  //   minutes: "",
  //   hours: "",
  // });

  useEffect(() => {
    const fetchProgrammeData = async () => {
      try {
        const liveSessions: any = await getSessions();
        debugger;
        setLiveSession(liveSessions.data.results);
        // results[0]?.step.fields
      } catch (error) {
        console.log(error);
      }
    };
    fetchProgrammeData();
  }, []);

  const detailHandler = (data: any) => {
    history.push({
      pathname: "/user-live-session-detail",
      state: { data: data },
    });
  };

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

        {liveSession &&
          liveSession.map((item: any, index: number) => {
            return (
              <Grid
                onClick={() => {
                  detailHandler(item);
                }}
                key={index}
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
                        <p className={"live-title"}>{item.step.fields.title}</p>
                        <p className={"live-title"} style={{ marginLeft: "0" }}>
                          {item.step.fields.session_type === "one_one_session"
                            ? "1-1 Session"
                            : item.step.fields.session_type === "group_session"
                            ? "Group Session"
                            : item.step.fields.session_type === "cohort_session"
                            ? "Cohort Session"
                            : null}
                        </p>
                      </Grid>
                      <Grid sx={{ display: "flex" }}>
                        <p className={"live-title"}>{item.start_time}</p>-
                        <p style={{ marginLeft: "0" }} className={"live-title"}>
                          {item.end_time}
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default LiveSession;
