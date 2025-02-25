import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, Button, TextField, useMediaQuery } from "@mui/material";
import {
  getSection,
  getSectionSteps,
  getStepDetails,
  submitStepAnswer,
} from "../../../services/common";
import "./style.scss";
import Loading from "../../../components/Loading";
import { useLocation, useParams } from "react-router-dom";
import arrowIcon from "../../static/images/right-arrow 6.png";
import sidebarLogoImage from "../../static/images/right-sidebar-logo.png";
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
import AudioResponse from "./AudioResponse";
import VideoResponse from "./VideoResponse";
import OpenEndedQuestion from "./OpenEndedQuestion";
import SideNavbar from "../../components/SideNavbar";
import LiveSession from "./LiveSession";
import ProgressBar from "@ramonak/react-progress-bar";
import { Burger, Menu } from "../../components/BurgerMenu";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

type IntroParams = {
  cohortId: string;
  stepId: string;
  sectionId: any;
};

const emptyStepData = {
  content: "",
  image: null,
  title: "",
  background_image: "",
  answers: [],
  description: "",
  audio: "",
  video: "",
  answer: [],
  url: "",
};

let bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
let s3Key: any = process.env.REACT_APP_S3_KEY;
let s3Region: any = process.env.REACT_APP_S3_REGION;

let credentials: any = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

const Steps = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const node: any = useRef();
  const { cohortId, stepId, sectionId } = useParams<IntroParams>();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [text, setText] = useState("");
  const [totalAnswerCount, setTotalAnswerCount] = useState(0);
  const [stepType, setStepType] = useState("");
  const [selectedToggleValue, setSelectedToggleValue] = useState("");
  const [selectedAnswerIds, setSelectedAnswerIds] = useState<any>([]);
  const [steps, setSteps] = useState<StepData[]>([]);
  const [userAnswer, setUserAnswer] = useState<StepData[]>([]);
  const [videoFile, setVideoFile] = useState<File | any>(null);
  const [audioFile, setAudioFile] = useState<File | any>(null);
  const [programmeId, setProgrammeId] = useState<any>("");
  const [learner, setLearner] = useState<any>("");
  const [bgImage, setBgImage] = useState<any>(null);
  const [sectionData, setSectionData] = useState<any>({});
  const [liveSessionDetail, setLiveSessionDetail] = useState<any>([]);
  const [stepData, setStepData] = useState<any>(emptyStepData);
  const isMobile = useMediaQuery("(max-width:800px)");
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getStepData = useCallback(
    async (stepOrder: any) => {
      try {
        if (sectionId) {
          let isCurrentStep = false;
          const response: any = await getSectionSteps(sectionId, false, Number(cohortId));
          if (response.data.length > 0) {
            // setSectionName(response?.data[0]?.section_name);
            setProgrammeId(response?.data[0]?.programme);
          }
          let arr: any = [];
          stepOrder.filter(function (order: any) {
            return response.data.forEach(function (list: any) {
              if (order === list.id) {
                arr.push(list);
              }
            });
          });

          arr.forEach((item: any) => {
            if (!item.is_answered && !isCurrentStep) {
              item.current_step = true;
              isCurrentStep = true;
            } else if (!item.is_answered) {
              item.is_locked = true;
            }
          });
          setLoading(false);
          setSteps(arr);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [sectionId, cohortId]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionInfo: any = await getSection(sectionId, Number(cohortId));
        setSectionData(sectionInfo);
        await getStepData(sectionInfo?.step_order);
      } catch (error: any) {}
    };
    fetchData();
  }, [getStepData, sectionId, cohortId]);

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      setStepData(emptyStepData);
      try {
        const response: any = await getStepDetails(stepId, cohortId);
        setStepData(response.fields);
        setLearner(response.learner);
        setLiveSessionDetail(response.live_session_details);
        if (response.answer.length > 0) {
          setIsSubmitted(true);
          setSelectedCount(Object.keys(response.answer[0].answer).length);
        }
        if (response.fields.background_image) {
          let url = response.fields.background_image;
          url = url.replace(/ /g, "%20");
          setBgImage(url);
        } else if (response.programme_data.background_image) {
          let url = response.programme_data.background_image;
          url = url.replace(/ /g, "%20");
          setBgImage(url);
        } else {
          setBgImage(null);
        }
        setUserAnswer(response.answer);
        setTotalAnswerCount(response.fields?.correct_answers);
        setStepType(response?.step_type);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId, cohortId]);

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
    } else if (
      stepType === "audio_response" ||
      stepType === "audio" ||
      stepType === "video" ||
      stepType === "text_content"
    ) {
      obj = {
        answer: null,
        completed: true,
      };
    } else if (stepType === "video_response") {
      obj = {
        answer: null,
        completed: true,
      };
    } else if (stepType === "keyword_question" || stepType === "open_ended_question") {
      obj = {
        answer: null,
        text: text,
      };
    } else if (stepType === "model_answer_question") {
      obj = {
        answer: null,
        text: text,
        correct: isCorrect,
      };
    } else if (stepType === "toggle") {
      obj = {
        answer: null,
        value: selectedToggleValue,
      };
    }
    let s3ObjectUrl = "";
    const data = new FormData();
    if (stepType === "video_response") {
      setLoading(true);
      await uploadFile();
      setLoading(false);
      let name = s3Key + videoFile?.name;
      s3ObjectUrl = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${name}`;
      // data.append("file_answer", videoFile);
    }
    data.append("video_file_url", s3ObjectUrl);
    data.append("learner", learner);
    data.append("step", stepId);
    data.append("answer", JSON.stringify(obj));

    stepType === "audio_response" && data.append("file_answer", audioFile);
    await submitStepAnswer(data);
    const sectionInfo: any = await getSection(sectionId, Number(cohortId));
    setSectionData(sectionInfo);
    await getStepData(sectionInfo?.step_order);
  };

  const uploadFile = async () => {
    let target: any = {
      Bucket: bucketName,
      Key: s3Key + videoFile?.name,
      Body: videoFile,
      partSize: 10,
    };
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: s3Region, credentials }),
        leavePartsOnError: true, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", progress => {
        console.log(progress);
      });

      await parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Grid container sx={{ minHeight: "120vh" }}>
      {!isMobile && (
        <Grid item sm={0} md={3} lg={2}>
          <SideNavbar cohortId={cohortId} programmeId={programmeId} />
        </Grid>
      )}
      <Grid
        className="steps mobile"
        container
        item
        sm={12}
        md={8}
        sx={{
          padding: "40px",
          background: bgImage ? `url(${bgImage}) 0 0 / cover no-repeat` : "#FFFFFF",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            padding: "6% 0%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
        </Grid>
        <Grid ref={node} className="burger-menu">
          <Burger open={open} setOpen={setOpen} />
          <Menu
            cohortId={cohortId}
            open={open}
            setOpen={setOpen}
            close={() => {
              setOpen(false);
            }}
          />
        </Grid>

        <Loading loading={loading} />
        <Grid item container direction="column" style={{ minHeight: "70vh" }}>
          <ProgressBar
            height={"9px"}
            borderRadius={"8px"}
            bgColor={"#0E4A66"}
            className={"progress-bar"}
            completed={(sectionData?.completed_steps / sectionData.steps) * 100}
          />
          {stepType !== "live_session" && (
            <Grid
              item
              sx={{
                // marginTop: "10%",
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
                  marginTop: "3%",
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
          )}
          {stepData.image && <TextContentQuestion image={stepData.image} />}
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
          {stepType !== "live_session" && (
            <Grid item sx={{ padding: "1.5% 10%", textAlign: "center", marginTop: "20px" }}>
              <Typography
                component="h5"
                sx={{
                  color: "#0E4A66",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                <TextField
                  className={"text-content"}
                  fullWidth
                  multiline
                  variant="standard" // <== changed this
                  margin="normal"
                  required
                  value={stepData.description || stepData.content}
                  autoFocus
                  disabled={true}
                  InputProps={{
                    disableUnderline: true, // <== added this
                  }}
                />
              </Typography>
            </Grid>
          )}

          {stepType === "video" && <VideoQuestion video={stepData.video} />}
          {stepType === "live_session" && (
            <LiveSession data={stepData} liveSessionDetail={liveSessionDetail} />
          )}
          {stepType === "text_content" && stepData.url && (
            <Grid item sx={{ padding: "0% 10%", textAlign: "center", marginTop: "20px" }}>
              <Button
                sx={{
                  background: "#F76639",
                  fontSize: "16px",
                  fontWeight: "400",
                  cursor: "pointer !important",
                  "&:hover": {
                    background: "#c96247",
                  },
                }}
                onClick={() => {
                  window.open(stepData.url, "_blank");
                }}
              >
                Click link here
              </Button>
            </Grid>
          )}
          <Grid
            item
            sx={{
              marginTop: "20px",
              minHeight: stepType === "picture_choice_question" ? "55vh" : "unset",
              overflow: stepType === "picture_choice_question" ? "auto" : "unset",
              marginBottom: "2%",
              "@media (max-width: 767px)": {
                display:
                  stepType !== "toggle" &&
                  stepType !== "audio_response" &&
                  stepType !== "multiple_choice_question"
                    ? "flex !important"
                    : "block",
                margin:
                  stepType !== "audio_response" &&
                  stepType !== "toggle" &&
                  stepType !== "multiple_choice_question"
                    ? "auto"
                    : "unset",
              },
            }}
          >
            {stepType === "multiple_choice_question" ? (
              <TextQuestion
                userAnswer={userAnswer}
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
                userAnswer={userAnswer}
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
            ) : stepType === "audio_response" ? (
              <AudioResponse
                isSubmitted={isSubmitted}
                userAnswer={userAnswer}
                uploadAudio={(video: any) => {
                  setAudioFile(video);
                }}
              />
            ) : stepType === "video_response" ? (
              <VideoResponse
                isSubmitted={isSubmitted}
                userAnswer={userAnswer}
                uploadVideo={(video: any) => {
                  setVideoFile(video);
                }}
              />
            ) : stepType === "toggle" ? (
              <ToggleQuestion
                isSubmitted={isSubmitted}
                userAnswer={userAnswer}
                selectedValue={(text: string) => {
                  setSelectedToggleValue(text);
                }}
                min={stepData.min_value}
                max={stepData.max_value}
                step={stepData.step}
              />
            ) : stepType === "keyword_question" ? (
              <KeyboardQuestion
                userAnswer={userAnswer}
                answeredQuestion={(text: string) => {
                  setText(text);
                }}
                isSubmitted={isSubmitted}
                keywords={stepData.keywords}
              />
            ) : stepType === "open_ended_question" ? (
              <OpenEndedQuestion
                userAnswer={userAnswer}
                answeredQuestion={(text: string) => {
                  setText(text);
                }}
                isSubmitted={isSubmitted}
                keywords={stepData.keywords}
              />
            ) : stepType === "model_answer_question" ? (
              <ModelQuestion
                userAnswer={userAnswer}
                goToNextStep={() => {
                  const nextStepId = getNextStepId();
                  if (nextStepId) {
                    setIsSubmitted(false);
                    setSelectedCount(0);
                    setText("");
                    history.push(`/user-steps/${cohortId}/${sectionId}/${nextStepId}`);
                  } else {
                    history.push(
                      `/section-success/${cohortId}/${sectionId}/${steps[0]?.programme}`
                    );
                  }
                }}
                isCorrect={async (correct: boolean) => {
                  await submitAnswer(correct);
                  const nextStepId = getNextStepId();
                  if (nextStepId) {
                    setIsSubmitted(false);
                    setSelectedCount(0);
                    setText("");
                    history.push(`/user-steps/${cohortId}/${sectionId}/${nextStepId}`);
                  } else {
                    history.push(
                      `/section-success/${cohortId}/${sectionId}/${steps[0]?.programme}`
                    );
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

        <Grid
          item
          sx={{
            width: "100%",
            "@media (max-width: 768px)": {
              position: "fixed",
              backgroundColor: "white",
              bottom: 0,
            },
            padding: "10px",
          }}
        >
          {!loading &&
          !isSubmitted &&
          stepType !== "audio" &&
          stepType !== "video" &&
          stepType !== "audio_response" &&
          stepType !== "toggle" &&
          stepType !== "live_session" &&
          stepType !== "text_content" ? (
            <Button
              sx={{
                padding: "16px 13.39px",
                fontSize: "24px",
                fontWeight: 800,
                backgroundColor: "#0E4A66",
                boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                borderRadius: "8px",
                marginBottom: "4%",
              }}
              variant="contained"
              fullWidth
              size="large"
              onClick={async () => {
                setIsSubmitted(true);
                stepType !== "model_answer_question" && (await submitAnswer());
              }}
              disabled={
                loading || stepType === "video_response"
                  ? videoFile === null
                  : selectedCount < totalAnswerCount || text.length === 0
              }
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
                marginBottom: "4%",
              }}
              variant="contained"
              fullWidth
              size="large"
              onClick={async () => {
                if (
                  userAnswer.length === 0 &&
                  stepType !== "picture_choice_question" &&
                  stepType !== "model_answer_question" &&
                  stepType !== "keyword_question" &&
                  stepType !== "open_ended_question" &&
                  stepType !== "video_response" &&
                  stepType !== "multiple_choice_question"
                ) {
                  await submitAnswer();
                }
                const nextStepId = getNextStepId();
                if (nextStepId) {
                  setSelectedAnswerIds([]);
                  setIsSubmitted(false);
                  setSelectedCount(0);
                  setText("");
                  history.push(`/user-steps/${cohortId}/${sectionId}/${nextStepId}`);
                } else {
                  history.push(`/section-success/${cohortId}/${sectionId}/${steps[0]?.programme}`);
                }
              }}
              disabled={loading || selectedCount < totalAnswerCount}
            >
              Next
            </Button>
          ) : null}
        </Grid>
      </Grid>
      {!isMobile && (
        <Grid
          container
          item
          zeroMinWidth
          sm={0}
          md={1}
          lg={2}
          sx={{
            background: "#e2f6f9",
            alignItems: "center",
            position: "sticky",
            right: 0,
            top: 0,
            height: "100vh",
            display: "block",
          }}
          component={Box}
        >
          <Grid item sx={{ paddingTop: "30px", justifyContent: "center", display: "flex" }}>
            <img
              style={{ cursor: "pointer" }}
              src={sidebarLogoImage}
              width="120px"
              height="120px"
              alt="New Wave Logo"
            />
          </Grid>
          <Grid item sx={{ width: "100%", position: "relative" }}>
            <ul>
              {steps.map((item: any, ind: number) => {
                return (
                  <li
                    key={ind}
                    className={`bar ${item.is_answered ? "completed " : ""}`.concat(
                      ind === 0 ? "first-item " : ""
                    )}
                  >
                    <span>{item.fields?.question || item.fields?.title}</span>
                  </li>
                );
              })}
            </ul>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default Steps;
