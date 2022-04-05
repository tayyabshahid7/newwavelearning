import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import FeedbackIcon from "../../static/images/feedback-icon.png";
import { getLearnerFeedbackList } from "../../../services/common";
import "./style.scss";
import arrowIcon from "../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { getUser } from "../../../services/auth";
import SideNavbar from "../../components/SideNavbar";

interface FeedbackParams {
  cohortId: string;
  programmeId: string;
}

const Feedback = () => {
  const history = useHistory();
  const { cohortId, programmeId } = useParams<FeedbackParams>();
  const [feedbackList, setFeedbackList] = useState<any>([]);

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
    <Grid sx={{ display: "flex" }}>
      <SideNavbar cohortId={cohortId} programmeId={programmeId} />
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
            FEEDBACK
          </Typography>
        </Grid>

        {feedbackList &&
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
          })}
      </Grid>
    </Grid>
  );
};

export default Feedback;
