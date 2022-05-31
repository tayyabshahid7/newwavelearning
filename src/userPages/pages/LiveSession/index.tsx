import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import JourneyIcon from "../../static/images/Live icon 1.png";
import { getCohortLiveSessions } from "../../../services/common";
import "./style.scss";
import arrowIcon from "../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import SideNavbar from "../../components/SideNavbar";

interface ProgrammePageParams {
  cohortId: string;
}

const LiveSession = () => {
  const history = useHistory();
  const { cohortId } = useParams<ProgrammePageParams>();
  const [liveSession, setLiveSession] = useState<any>([]);
  const [programmeId, setProgrammeId] = useState<any>("");

  useEffect(() => {
    if (cohortId) {
      const fetchProgrammeData = async () => {
        try {
          const liveSessions: any = await getCohortLiveSessions(cohortId);
          if (liveSessions.data.length > 0) {
            setProgrammeId(liveSessions.data[0].step.programme);
          }
          setLiveSession(liveSessions.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProgrammeData();
    }
  }, [cohortId]);

  return (
    <Grid sx={{ display: "flex" }}>
      <Grid
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
      </Grid>
      <Grid
        container
        className="mobile"
        style={{
          background: "#FFFFFF",
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
            padding: "6% 0",
            display: "flex",
            alignItems: "center",
            marginBottom: "2%",
            height: "85px",
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
                        <p className={"live-title"}>{item.step.fields.title}</p>
                      </Grid>
                      <Grid>
                        <p className={"live-title"}>
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
                  <Grid>
                    <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                      <p className={"live-description"}>{item.step?.fields.description}</p>
                    </Grid>

                    <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                      <Typography variant="h4" component="p" className={"live-time"}>
                        Duration: {item.step?.fields.hours} Hr {item.step?.fields.minutes}{" "}
                        {item.step?.fields.minutes ? "Min" : ""}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default LiveSession;
