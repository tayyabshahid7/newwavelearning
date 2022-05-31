import React, { useEffect, useState } from "react";
import { Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import FeedbackIcon from "../../../static/images/feedback-icon.png";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import { useHistory } from "react-router";
import "./../style.scss";
import SideNavbar from "../../../components/SideNavbar";

const FeedbackDetail = () => {
  const history = useHistory();
  const [feedbackItem, setFeedbackItem] = useState<any>([]);
  const [stepAnswer, setStepAnswer] = useState<any>(null);
  const [stepType, setStepType] = useState<any>("");
  const [feedbackText, setFeedbackText] = useState<string>("");
  const [facilitatorName, setFacilitatorName] = useState<string>("");
  const [cohortId, setCohortId] = useState<string>("");
  const [programmeId, setProgrammeId] = useState<any>("");

  useEffect(() => {
    let state: any = history.location.state;
    state && setStepAnswer(state.data.step_answer);
    state && setFeedbackItem(state.data);
    state && setFeedbackText(state.data.description);
    state && setFacilitatorName(state.data.facilitator_name);
    state && setCohortId(state.data.cohortId);
    state && setProgrammeId(state.data.programmeId);
    state && setStepType(state.data.step_type);
  }, [history.location.state]);

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

        <Grid
          sx={{
            paddingTop: "30px",
          }}
          className="feedback"
          item
          container
          direction="column"
        >
          <Grid
            className="feedback-section"
            sx={{ overflow: "auto", minHeight: stepType === "video_response" ? "45vh" : "100%" }}
          >
            <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
              <img
                style={{ marginLeft: "10px" }}
                width="38px"
                height={"38px"}
                src={FeedbackIcon}
                alt="img"
              />
              <Grid sx={{ display: "flex", flexDirection: "column" }}>
                <Grid sx={{ display: "flex", flexDirection: "column" }}>
                  <Grid sx={{ display: "flex" }}>
                    <p className={"feedback-title"}>
                      {feedbackItem?.step_answer?.step?.fields.title ||
                        feedbackItem?.step_answer?.step?.fields.question}
                    </p>
                  </Grid>
                  <Grid>
                    <p className={"feedback-title"}>
                      {feedbackItem?.step_answer?.step?.section_name}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: " 27px",
                marginLeft: "10px",
                marginBottom: "18px",
                marginTop: "15px",
              }}
            >
              Your response
            </Typography>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  stepType === "video_response" || stepType === "audio_response"
                    ? "baseline"
                    : "center",
                padding: "0 13px",
              }}
            >
              {stepType === "picture_choice_question" &&
                stepAnswer?.step.fields.answers?.map((answer: any) => (
                  <Paper
                    key={answer.id}
                    variant="outlined"
                    sx={{ p: 2, marginBottom: "5%", width: "100%" }}
                  >
                    <Stack spacing={3} alignItems={"center"}>
                      <img src={answer.picture} alt={answer.text} height={100} />
                      <Typography>{answer.text}</Typography>
                      <Typography color={answer.correct ? "primary" : "error"}>
                        {stepAnswer.answer.answer.includes(answer.id) && "Learner Answer"}
                      </Typography>
                      {answer.correct && <Typography color="green">Correct Answer</Typography>}
                    </Stack>
                  </Paper>
                ))}

              {stepType === "multiple_choice_question" &&
                stepAnswer?.step.fields.answers?.map((answer: any) => (
                  <Stack sx={{ width: "100%" }} direction="row" spacing={3}>
                    <Typography>{answer.text}</Typography>
                    {answer.correct && <Typography color="green">Correct Answer</Typography>}
                    <Typography color={answer.correct ? "primary" : "error"}>
                      {stepAnswer.answer.answer.includes(answer.id) && "Learner Answer"}
                    </Typography>
                  </Stack>
                ))}

              {stepType === "toggle" && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Typography> {stepAnswer?.answer.value}</Typography>
                </Stack>
              )}

              {stepType === "model_answer_question" && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Typography>{stepAnswer?.step.fields.model_answer}</Typography>
                  <Typography variant="h6">Student Answer</Typography>
                  <Typography> {stepAnswer?.answer.text}</Typography>
                  <Typography variant="button">
                    Student Marked as: {stepAnswer?.answer.correct ? "Correct" : "Incorrect"}
                  </Typography>
                </Stack>
              )}

              {stepType === "video_response" && (
                <Stack sx={{ width: "50%", height: "50%" }} spacing={2}>
                  <video
                    src={stepAnswer?.file_answer}
                    className="video"
                    controls
                    controlsList="nodownload"
                  ></video>
                  <Typography> {stepAnswer?.answer.text}</Typography>
                </Stack>
              )}

              {stepType === "audio_response" && (
                <Stack sx={{ width: "50%", height: "50%" }} spacing={2}>
                  <audio controls src={stepAnswer?.file_answer} controlsList="nodownload">
                    Your browser does not support html audio element.
                  </audio>
                  <Typography> {stepAnswer?.answer.text}</Typography>
                </Stack>
              )}

              {stepType === "keyword_question" && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Stack direction="row" spacing={1}>
                    {stepAnswer?.step.fields.keywords?.map((keyword: any) => (
                      <Chip key={keyword} color="primary" sx={{ color: "white" }} label={keyword} />
                    ))}
                  </Stack>
                  <Typography variant="h6">Learner Answer</Typography>
                  <Typography> {stepAnswer?.answer.text}</Typography>
                </Stack>
              )}

              {stepType === "open_ended_question" && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Typography> {stepAnswer?.answer.text}</Typography>
                </Stack>
              )}
            </Grid>

            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: " 27px",
                marginLeft: "10px",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              Feedback From{" "}
              <span style={{ textTransform: "capitalize" }}>
                {facilitatorName && facilitatorName}
              </span>
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: " 27px",
                marginLeft: "10px",
                marginBottom: "18px",
                marginTop: "",
              }}
            >
              {feedbackText}
            </Typography>

            {/*<Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>*/}
            {/*  <Typography variant="h4" component="p" className={"live-time"}>*/}
            {/*    Duration: {liveSession.step?.fields.hours} Hr {liveSession.step?.fields.minutes}{" "}*/}
            {/*    {liveSession.step?.fields.minutes ? "Min" : ""}*/}
            {/*  </Typography>*/}
            {/*</Grid>*/}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FeedbackDetail;
