import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { getSectionSteps, getStepDetails, submitStepAnswer } from "../../../services/common";
import "./style.scss";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import arrowIcon from "../../static/images/right-arrow 6.png";
import TextQuestion from "./TextQuestion";
import PictureQuestion from "./PictureQuestion";
import AudioQuestion from "./AudioQuestion";
import VideoQuestion from "./VideoQuestion";
import { StepData } from "../../../common/types";
import { useHistory } from "react-router";
import ToggleQuestion from "./ToggleQuestion";
import TextContentQuestion from "./TextContentQuestion";
import KeyboardQuestion from "./KeyboardQuestion";
import ModelQuestion from "./ModelQuestion";

type IntroParams = {
  stepId: string;
  sectionId: any;
};

const Steps = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user") || "");
  const { stepId, sectionId } = useParams<IntroParams>();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [text, setText] = useState("");
  const [totalAnswerCount, setTotalAnswerCount] = useState(0);
  const [stepType, setStepType] = useState("");
  const [selectedToggleValue, setSelectedToggleValue] = useState("");
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<any>([]);
  const [steps, setSteps] = useState<StepData[]>([]);
  const [stepData, setStepData] = useState<any>({
    content: "",
    image: "",
    title: "",
    background_image: "",
    answers: [],
    description: "",
    audio: "",
    video: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (sectionId) {
          const response = await getSectionSteps(sectionId);
          setSteps(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sectionId]);

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response: any = await getStepDetails(stepId);
        setStepData(response.fields);
        setTotalAnswerCount(response.fields?.correct_answers);
        setStepType(response?.step_type);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId]);

  const getNextStepId = () => {
    let index = steps.findIndex((item: any) => Number(stepId) === item.id);
    if (index > -1) {
      if (steps[index + 1]) {
        return steps[index + 1].id;
      }
    }
  };

  const submitAnswer = async (isCorrect?: boolean) => {
    let obj: any = {};
    if (stepType === "picture_choice_question" || stepType === "multiple_choice_question") {
      obj = {
        answer: selectedAnswerIds,
        completed: true,
      };
    } else if (stepType === "audio" || stepType === "video" || stepType === "text_content") {
      obj = {
        answer: null,
        completed: true,
      };
    } else if (stepType === "keyword_question") {
      obj = {
        answer: null,
        text: text,
      };
    } else if (stepType === "model_answer_question") {
      obj = {
        answer: null,
        text: text,
        correct: true,
      };
    } else if (stepType === "toggle") {
      obj = {
        answer: null,
        value: selectedToggleValue,
      };
    }

    let data = {
      learner: user?.learner,
      step: stepId,
      answer: obj,
    };
    await submitStepAnswer(data);
  };

  return (
    <Grid
      container
      className="steps "
      style={{
        background: stepData.background_image
          ? `url(${stepData.background_image}) 0 0 / cover no-repeat`
          : "#FFFFFF",
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
      <Loading loading={loading} />
      <Grid item container direction="column" style={{ minHeight: "70vh" }}>
        {stepType === "video" && <VideoQuestion video={stepData.video} />}
        {stepType === "text_content" && <TextContentQuestion image={stepData.image} />}
        <Grid
          item
          sx={{
            marginTop: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              margin: "0% 0 2% 0",
              padding: stepType === "model_answer_question" ? "0 7% !important" : "0 25px",
              fontWeight: "600",
              marginTop: "0%",
              fontSize: "24px",
              marginBottom: "5%",
              color: "#0E4A66",
            }}
            variant="h5"
            gutterBottom
          >
            {stepData.question || stepData.title}
          </Typography>
        </Grid>

        {totalAnswerCount && (
          <Grid item sx={{ padding: "5% 10% 0 10%", textAlign: "center" }}>
            <Typography
              component="h5"
              sx={{ fontSize: "16px", color: "#0E4A66", fontWeight: "400" }}
            >
              select {totalAnswerCount} correct answer
            </Typography>
          </Grid>
        )}

        <Grid item sx={{ padding: "0% 10%", textAlign: "center", marginTop: "20px" }}>
          <Typography
            component="h5"
            sx={{
              color: "#0E4A66",
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
            {stepData.description || stepData.content}
          </Typography>
        </Grid>

        <Grid item sx={{ marginTop: "20px" }}>
          {stepType === "multiple_choice_question" ? (
            <TextQuestion
              selectedAnswerList={(ids: any) => setSelectedAnswerIds(ids)}
              getTotalSelected={(count: number) => {
                setSelectedCount(count);
                setText(" ");
              }}
              totalAnswerCount={totalAnswerCount}
              isSubmitted={isSubmitted}
              answers={stepData.answers}
            />
          ) : stepType === "picture_choice_question" ? (
            <PictureQuestion
              selectedAnswerList={(ids: any) => setSelectedAnswerIds(ids)}
              getTotalSelected={(count: number) => {
                setSelectedCount(count);
                setText(" ");
              }}
              totalAnswerCount={totalAnswerCount}
              isSubmitted={isSubmitted}
              answers={stepData.answers}
            />
          ) : stepType === "audio" ? (
            <AudioQuestion audio={stepData.audio} />
          ) : stepType === "toggle" ? (
            <ToggleQuestion
              selectedValue={(text: string) => {
                setSelectedToggleValue(text);
              }}
              min={stepData.min_value}
              max={stepData.max_value}
              step={stepData.step}
            />
          ) : stepType === "keyword_question" ? (
            <KeyboardQuestion
              answeredQuestion={(text: string) => {
                setText(text);
              }}
              isSubmitted={isSubmitted}
              keywords={stepData.keywords}
            />
          ) : stepType === "model_answer_question" ? (
            <ModelQuestion
              isCorrect={async (correct: boolean) => {
                await submitAnswer(correct);
                const nextStepId = getNextStepId();
                if (nextStepId) {
                  setIsSubmitted(false);
                  setSelectedCount(0);
                  setText("");
                  history.push(`/user-steps/${sectionId}/${nextStepId}`);
                } else {
                  history.push(`/section-success/${sectionId}/${steps[0]?.programme}`);
                }
              }}
              answeredQuestion={(text: string) => {
                setText(text);
              }}
              isSubmitted={isSubmitted}
              modelAnswer={stepData.model_answer}
            />
          ) : null}
        </Grid>
      </Grid>

      <Grid item px="18px" width="100%">
        {!loading &&
        !isSubmitted &&
        stepType !== "audio" &&
        stepType !== "video" &&
        stepType !== "toggle" &&
        stepType !== "text_content" ? (
          <Button
            sx={{
              padding: "16px 13.39px",
              fontSize: "24px",
              fontWeight: 800,
              backgroundColor: "#0E4A66",
              boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            size="large"
            onClick={async () => {
              setIsSubmitted(true);
              await submitAnswer();
            }}
            disabled={loading || selectedCount < totalAnswerCount || text.length === 0}
          >
            Submit
          </Button>
        ) : !loading && stepType !== "model_answer_question" ? (
          <Button
            sx={{
              padding: "16px 13.39px",
              fontSize: "24px",
              fontWeight: 800,
              backgroundColor: "#0E4A66",
              boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
              borderRadius: "8px",
            }}
            variant="contained"
            fullWidth
            size="large"
            onClick={async () => {
              if (
                stepType !== "picture_choice_question" &&
                stepType !== "model_answer_question" &&
                stepType !== "multiple_choice_question"
              ) {
                await submitAnswer();
              }
              const nextStepId = getNextStepId();
              if (nextStepId) {
                setIsSubmitted(false);
                setSelectedCount(0);
                setText("");
                history.push(`/user-steps/${sectionId}/${nextStepId}`);
              } else {
                history.push(`/section-success/${sectionId}/${steps[0]?.programme}`);
              }
            }}
            disabled={loading || selectedCount < totalAnswerCount}
          >
            Next
          </Button>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Steps;
