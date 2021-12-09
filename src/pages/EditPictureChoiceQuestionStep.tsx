import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import FileDropZone from "components/FileDropZone";
import { EditStepParams } from "common/types";
import { editStep, getStepDetails } from "services/common";
import { UploadFile } from "@mui/icons-material";

const EditPictureChoiceQuestionStep = () => {
  const { stepId } = useParams<EditStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File[]>([]);
  const [changeBackground, setChangeBackground] = useState<boolean>(false);
  const [stepData, setStepData] = useState<any>({
    question: "",
    description: "",
    feedback: false,
    answers: [],
    pictures: [],
  });

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        let newPictures = new Array<any>();
        response.fields.answers.forEach(
          (answer: any) => (newPictures[answer.id] = response.fields.pictures[answer.picture_name])
        );
        setStepData({ ...response.fields, pictures: newPictures });
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId]);

  const handleAddChoice = () => {
    let newIndex = 0;
    if (stepData.answers.length > 0) {
      newIndex = stepData.answers[stepData.answers.length - 1].id + 1;
    }
    let newAnswers = stepData.answers;
    newAnswers.push({ id: newIndex, text: "", correct: false, picture_name: null });
    const newPictures = stepData.pictures;
    newPictures[newIndex] = null;
    setStepData({ ...stepData, answers: newAnswers, pictures: newPictures });
  };

  const handlePictureChange = (event: any) => {
    const answerId = parseInt(event.target.id.split("-")[1]);
    let newPictures = stepData.pictures;
    let newAnswers = stepData.answers;
    const answerIndex = newAnswers.findIndex((a: any) => a.id === answerId);
    const newPicture = event.target.files[0];
    newPictures[newPicture.name] = newPicture;
    newAnswers[answerIndex].picture_name = newPicture.name;
    setStepData({ ...stepData, answers: newAnswers, pictures: newPictures });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(e.target.value);
    let answerIndex = stepData.answers.findIndex((answer: any) => answer.id === selectedId);
    let newAnswers = stepData.answers;
    newAnswers[answerIndex].correct = e.target.checked;
    setStepData({ ...stepData, answers: newAnswers });
  };

  const deleteAnswer = (answerId: number) => {
    let newAnswers = stepData.answers.filter((answer: any) => answer.id !== answerId);
    let newPictures = stepData.pictures;
    if (newPictures.length > 0) {
      delete newPictures[stepData.answers[answerId].picture_name];
    }
    setStepData({ ...stepData, answers: newAnswers, pictures: newPictures });
  };

  const updateFiles = (newImages: File[]) => {
    setBackgroundImage(newImages);
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  const handleAnswerTextChange = (e: BaseSyntheticEvent) => {
    let newAnswers = stepData.answers;
    const answerId = newAnswers.findIndex((a: any) => a.id === parseInt(e.target.id));
    newAnswers[answerId].text = e.target.value;
    setStepData({ ...stepData, answers: newAnswers });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepData({ ...stepData, feedback: event.target.checked });
  };

  const cancelChangeBackground = () => {
    setBackgroundImage([]);
    setChangeBackground(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "picture_choice_question");

    const fields = {
      question: stepData.question,
      description: stepData.description,
      feedback: stepData.feedback,
      answers: stepData.answers,
      pictures: stepData.pictures,
      background_image: stepData.background_image,
    };

    if (stepData.pictures instanceof Object) {
      for (const prop in stepData.pictures) {
        if (stepData.pictures[prop] instanceof File) {
          data.append("pictures", stepData.pictures[prop]);
          fields.pictures[prop] = stepData.pictures[prop].name;
        }
      }
    }
    if (backgroundImage.length > 0) {
      backgroundImage.map((image: File) => data.append("background_image", image));
    }

    data.append("fields", JSON.stringify(fields));

    try {
      await editStep(stepId, data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
    history.goBack();
  };

  return (
    <DashboardLayout loading={loading}>
      <Paper>
        <Grid container sx={{ p: 8 }} spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Edit Picture Choice Question</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                name="question"
                value={stepData.question}
                label="Question"
                onChange={handleTextChange}
              />
              <TextField
                name="description"
                value={stepData.description}
                multiline
                label="Description"
                minRows={3}
                onChange={handleTextChange}
              />
              <Stack direction="row">
                <Typography variant="h6">Answers</Typography>

                <Button variant="text" onClick={handleAddChoice}>
                  Add Choice
                </Button>
              </Stack>
              <Typography variant="body2">
                Use the checkboxes to mark the asnwers as correct
              </Typography>
              <Stack direction="row" spacing={2}>
                {stepData.answers.map((answer: any) => (
                  <Stack key={answer.id} direction="column" textAlign="center" spacing={1}>
                    <Paper variant="outlined" sx={{ p: 2, minHeight: "280px" }}>
                      {stepData.pictures[answer.picture_name] ? (
                        <Stack spacing={1}>
                          <img
                            src={
                              stepData.pictures[answer.id] instanceof File
                                ? URL.createObjectURL(stepData.pictures[answer.picture_name])
                                : stepData.pictures[answer.picture_name]
                            }
                            width={200}
                            height={200}
                            alt="choice"
                          />
                          <label htmlFor={`picture-${answer.id}`}>
                            <input
                              accept="image/*"
                              id={`picture-${answer.id}`}
                              type="file"
                              hidden
                              onChange={handlePictureChange}
                            />
                            <Button variant="text" component="span" fullWidth>
                              Change picture
                            </Button>
                          </label>
                        </Stack>
                      ) : (
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          minWidth="200px"
                          minHeight="200px"
                        >
                          <label htmlFor={`picture-${answer.id}`}>
                            <input
                              accept="image/*"
                              id={`picture-${answer.id}`}
                              type="file"
                              hidden
                              onChange={handlePictureChange}
                            />
                            <IconButton
                              color="default"
                              aria-label="upload picture"
                              component="span"
                            >
                              <UploadFile fontSize="large" />
                            </IconButton>
                          </label>
                        </Box>
                      )}
                    </Paper>

                    <TextField
                      id={`${answer.id}`}
                      value={answer.text}
                      fullWidth
                      onChange={handleAnswerTextChange}
                    />
                    <Checkbox
                      checked={answer.correct}
                      onChange={handleCheckboxChange}
                      value={answer.id}
                      disableRipple
                      size="medium"
                    />
                    <Button color="error" variant="text" onClick={() => deleteAnswer(answer.id)}>
                      Delete
                    </Button>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography>Background Image</Typography>
              {stepData.background_image && !changeBackground ? (
                <>
                  <img src={stepData.background_image} alt="step background" width={250} />
                  <Button variant="text" onClick={() => setChangeBackground(true)}>
                    Change background image
                  </Button>
                </>
              ) : (
                <>
                  <FileDropZone
                    accept="image/*"
                    addFilesCallback={updateFiles}
                    helpText="You can upload just 1 image file"
                    maxFiles={1}
                    showPreview
                  />
                  <Button variant="text" color="error" onClick={cancelChangeBackground}>
                    Cancel change
                  </Button>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={6} alignItems="flex-end">
            <Button size="large" color="error" onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Stack direction="row" spacing={4} justifyContent="flex-end">
              <Stack direction="row" alignItems="center">
                <Typography> Facilitator Feedback</Typography>
                <Switch checked={stepData.feedback} onChange={handleFeedbackChange} />
              </Stack>
              <Button size="large" onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
};

export default EditPictureChoiceQuestionStep;
