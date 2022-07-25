import React, { useEffect, useState } from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import FeedbackIcon from "../../static/images/feedback-icon.png";
import { getLearnerFeedbackList } from "../../../services/common";
import "./style.scss";
import arrowIcon from "../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/auth";
import SideNavbar from "../../components/SideNavbar";
import sidebarBgImage from "../../static/images/leftBar.svg";

interface FeedbackParams {
  cohortId: string;
  programmeId: string;
}

const Feedback = () => {
  const history = useHistory();
  const { cohortId, programmeId } = useParams<FeedbackParams>();
  const [feedbackList, setFeedbackList] = useState<any>([]);
  const isMobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        let user = getUser();
        const response = await getLearnerFeedbackList(cohortId, user?.learner);
        setFeedbackList(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchFeedbackData();
  }, [cohortId]);

  const detailHandler = (data: any) => {
    history.push({
      pathname: "/user-feedback-detail",
      state: { data: data, cohortId: cohortId, programmeId: programmeId },
    });
  };

  return (
    <Grid container sx={{ display: "flex" }}>
      {!isMobile && (
        <Grid
          xs={2}
          item
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
      )}
      <Grid
        item
        xs={8}
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
            FEEDBACK
          </Typography>
        </Grid>

        {feedbackList?.length > 0 ? (
          feedbackList.map((item: any, index: number) => {
            return (
              <Grid
                onClick={() => {
                  detailHandler(item);
                }}
                key={index}
                sx={{
                  paddingTop: "30px",
                }}
                className="feedback"
                item
                container
                direction="column"
              >
                <Grid className="feedback-section">
                  <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                    <img
                      style={{ marginLeft: "10px" }}
                      width="38px"
                      height={"38px"}
                      src={FeedbackIcon}
                      alt="img"
                    />
                    <Grid sx={{ display: "flex", flexDirection: "column" }}>
                      <Grid sx={{ display: "flex" }}>
                        <p className={"feedback-title"}>
                          {item.step_answer.step.fields.title ||
                            item.step_answer.step.fields.question}
                        </p>
                      </Grid>
                      <Grid>
                        <p className={"feedback-title"}>{item.step_answer.step.section_name}</p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            );
          })
        ) : (
          <Grid item sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              You have no feedback to review at this time. Please check back later
            </Typography>
          </Grid>
        )}
      </Grid>
      {!isMobile && (
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
            display: "block",
          }}
        ></Grid>
      )}
    </Grid>
  );
};

export default Feedback;
