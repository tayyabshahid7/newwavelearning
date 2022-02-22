import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { getStepDetails } from "../../../services/common";
import "./style.scss";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import burgerIcon from "../../static/images/burger-icon.svg";
import arrowIcon from "../../static/images/right-arrow 6.png";
import TextQuestion from "./TextQuestion";
import PictureQuestion from "./PictureQuestion";
import AudioQuestion from "./AudioQuestion";
import VideoQuestion from "./VideoQuestion";

type IntroParams = {
  stepId: string;
};

const Steps = () => {
  const { stepId } = useParams<IntroParams>();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [totalAnswerCount, setTotalAnswerCount] = useState(0);
  const [answerList, setAnswerList] = useState([]);
  const [stepType, setStepType] = useState("");
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
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response: any = await getStepDetails(stepId);
        setStepData(response.fields);
        setTotalAnswerCount(response.fields?.correct_answers);
        setAnswerList(response.fields?.answers);
        setStepType(response?.step_type);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, []);

  return (
    <Grid
      container
      className="steps"
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
          style={{ cursor: "pointer" }}
          src={arrowIcon}
          width="27px"
          height="27px"
          alt="Arrow Logo"
        />

        <img
          style={{ cursor: "pointer" }}
          src={burgerIcon}
          width="50px"
          height="27px"
          alt="Burger Logo"
        />
      </Grid>
      <Loading loading={loading} />
      <Grid item container direction="column" style={{ minHeight: "70vh" }}>
        {stepType === "video" && <VideoQuestion video={stepData.video} />}
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
              padding: "0 25px",
              fontWeight: "600",
              marginTop: "10%",
              marginBottom: "5%",
            }}
            variant="h5"
            gutterBottom
          >
            {stepData.question || stepData.title}
          </Typography>
        </Grid>

        {totalAnswerCount && (
          <Grid item sx={{ padding: "5% 10% 0 10%", textAlign: "center" }}>
            <Typography component="h5" sx={{ fontSize: "16px", color: "#6A6E71" }}>
              select {totalAnswerCount} correct answer
            </Typography>
          </Grid>
        )}

        <Grid item sx={{ padding: "0% 10%", textAlign: "center", marginTop: "20px" }}>
          <Typography component="h5" sx={{ color: "#6A6E71", fontSize: "16px" }}>
            {stepData.description}
          </Typography>
        </Grid>

        <Grid sx={{ marginTop: "50px" }}>
          {stepType === "multiple_choice_question" ? (
            <TextQuestion
              getTotalSelected={(count: number) => {
                setSelectedCount(count);
              }}
              totalAnswerCount={totalAnswerCount}
              isSubmitted={isSubmitted}
              answers={stepData.answers}
            />
          ) : stepType === "picture_choice_question" ? (
            <PictureQuestion
              getTotalSelected={(count: number) => {
                setSelectedCount(count);
              }}
              totalAnswerCount={totalAnswerCount}
              isSubmitted={isSubmitted}
              answers={stepData.answers}
            />
          ) : stepType === "audio" ? (
            <AudioQuestion audio={stepData.audio} />
          ) : null}
        </Grid>
      </Grid>

      <Grid item px="18px" width="100%">
        <Button
          sx={{ padding: "13.39px", fontSize: "16px", borderRadius: "16px", fontWeight: 500 }}
          variant="contained"
          fullWidth
          size="large"
          onClick={() => {
            setIsSubmitted(true);
          }}
          disabled={loading || selectedCount < totalAnswerCount}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Steps;
