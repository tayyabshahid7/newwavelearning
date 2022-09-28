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

const EditPictureChoiceQuestion = () => {
  const { stepId } = useParams<EditStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [changeBackground, setChangeBackground] = useState<boolean>(false);
  const [deleteBackground, setDeleteBackground] = useState<boolean>(false);
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [stepData, setStepData] = useState<any>({
    question: "",
    description: "",
    feedback: false,
    background_image: null,
    correct_answers: 1,
    answers: [],
  });

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        setStepData(response.fields);
        setImage(response.fields.image);
        setChangeImage(response.fields.image instanceof String);
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
    setStepData({ ...stepData, answers: newAnswers });
  };

  const handlePictureChange = (event: any) => {
    const answerId = parseInt(event.target.id.split("-")[1]);
    let newAnswers = stepData.answers;
    const answerIndex = newAnswers.findIndex((a: any) => a.id === answerId);
    newAnswers[answerIndex].picture = event.target.files[0];
    setStepData({ ...stepData, answers: newAnswers });
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
    setStepData({ ...stepData, answers: newAnswers });
  };

  const updateFiles = (newImages: File[]) => {
    setBackgroundImage(newImages[0]);
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
    setBackgroundImage(null);
    setChangeBackground(false);
    setDeleteBackground(false);
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "picture_choice_question");

    let fields = JSON.parse(JSON.stringify(stepData)); // DEEP COPY

    stepData.answers.forEach((a: any) => {
      if (a.picture instanceof File) {
        // because there may be strings from non-edited pictures
        data.append("pictures", a.picture);
        let modifiedAnswer = fields.answers.find((ma: any) => ma.id === a.id);
        modifiedAnswer.picture = a.picture.name;
      }
    });

    if (deleteBackground) {
      fields.background_image = null;
    } else if (backgroundImage) {
      data.append("background_image", backgroundImage);
      fields.background_image = backgroundImage.name;
    }

    data.append("image", image);

    if (!image) {
      fields.image = null;
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

  const handleCancelRemoveImage = () => {
    setImage(stepData.image);
  };

  const handleChangeImage = () => {
    setImage(null);
    setChangeImage(true);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleCancelChangeImage = () => {
    setImage(stepData.image);
    setChangeImage(false);
  };

  const handleAddImage = (addedFiles: File[]) => {
    setImage(addedFiles[0]);
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
              <TextField
                name="correct_answers"
                value={stepData.correct_answers}
                type="number"
                label="Number or correct answers"
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
              <Stack direction="row" spacing={2} sx={{ overflow: "scroll", maxWidth: "668px" }}>
                {stepData.answers.map((answer: any) => (
                  <Stack key={answer.id} direction="column" textAlign="center" spacing={1}>
                    <Paper variant="outlined" sx={{ p: 2, minHeight: "280px" }}>
                      {answer.picture ? (
                        <Stack spacing={1}>
                          <img
                            src={
                              answer.picture instanceof File
                                ? URL.createObjectURL(answer.picture)
                                : answer.picture
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
              <Typography>Image</Typography>
              {changeImage ? (
                <>
                  <FileDropZone
                    accept="image/*"
                    maxFiles={1}
                    addFilesCallback={handleAddImage}
                    showPreview
                    helpText={"You can only upload image files"}
                  />

                  <Button variant="text" color="error" onClick={handleCancelChangeImage}>
                    Cancel image change
                  </Button>
                </>
              ) : image !== null ? (
                <>
                  <img src={image} width={150} alt="step" />
                  <Button variant="text" onClick={handleChangeImage}>
                    Change image
                  </Button>
                  <Button variant="text" color="error" onClick={handleRemoveImage}>
                    Remove image
                  </Button>
                </>
              ) : stepData.image !== null ? (
                <Button variant="text" color="error" onClick={handleCancelRemoveImage}>
                  Cancel Remove image
                </Button>
              ) : (
                <Button variant="text" onClick={handleChangeImage}>
                  Add image
                </Button>
              )}
              <Typography>Background Image</Typography>
              {stepData.background_image && !changeBackground && !deleteBackground ? (
                <>
                  <img src={stepData.background_image} alt="step background" width={250} />
                  <Button variant="text" onClick={() => setChangeBackground(true)}>
                    Change background image
                  </Button>
                  <Button variant="text" color="error" onClick={() => setDeleteBackground(true)}>
                    Delete background image
                  </Button>
                </>
              ) : deleteBackground ? (
                <>
                  <Typography>Background will be deleted when "Save" button is pressed</Typography>
                  <Button variant="text" color="error" onClick={() => setDeleteBackground(false)}>
                    Cancel Delete Background
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
                  {stepData.background_image && (
                    <Button variant="text" color="error" onClick={cancelChangeBackground}>
                      Cancel change
                    </Button>
                  )}
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

export default EditPictureChoiceQuestion;
