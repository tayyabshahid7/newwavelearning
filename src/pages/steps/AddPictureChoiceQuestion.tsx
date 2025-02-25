import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
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
import { AddStepParams } from "common/types";
import { addStep } from "services/common";
import { UploadFile } from "@mui/icons-material";

const AddPictureChoiceQuestion = () => {
  const { sectionId } = useParams<AddStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [stepData, setStepData] = useState<any>({
    question: "",
    description: "",
    feedback: false,
    correct_answers: 1,
    answers: [],
  });

  const handleAddChoice = () => {
    let newIndex = 0;
    if (stepData.answers.length > 0) {
      newIndex = stepData.answers[stepData.answers.length - 1].id + 1;
    }
    let newAnswers = stepData.answers;
    newAnswers.push({ id: newIndex, text: "", correct: false, picture: null });
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

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "picture_choice_question");
    data.append("number", "0");
    data.append("section", sectionId);
    if (image) {
      data.append("image", image);
    }

    let fields = JSON.parse(JSON.stringify(stepData)); // DEEP COPY
    stepData.answers.forEach((a: any) => {
      data.append("pictures", a.picture);
      let modifiedAnswer = fields.answers.find((ma: any) => ma.id === a.id);
      modifiedAnswer.picture = a.picture.name;
    });
    data.append("fields", JSON.stringify(fields));
    backgroundImage.forEach((image: File) => data.append("background_image", image));

    try {
      await addStep(data);
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
    history.goBack();
  };

  const handleAddImage = (addedFiles: File[]) => {
    setImage(addedFiles[0]);
  };

  return (
    <DashboardLayout loading={loading}>
      <Paper>
        <Grid container sx={{ p: 8 }} spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Add Picture Choice Question</Typography>
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
              <Stack direction="row" spacing={2}>
                {stepData.answers.map((answer: any) => (
                  <Stack key={answer.id} direction="column" textAlign="center" spacing={1}>
                    <Button color="error" variant="text" onClick={() => deleteAnswer(answer.id)}>
                      Delete
                    </Button>
                    <Paper variant="outlined" sx={{ p: 2, minHeight: "280px" }}>
                      {answer.picture ? (
                        <Stack spacing={1}>
                          <img
                            src={URL.createObjectURL(answer.picture)}
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
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography>Image</Typography>
              <FileDropZone
                accept="image/*"
                maxFiles={1}
                addFilesCallback={handleAddImage}
                showPreview
                helpText={"You can only upload image files"}
              />
              <Typography>Background Image</Typography>
              <FileDropZone
                accept="image/*"
                addFilesCallback={updateFiles}
                helpText="You can upload just 1 image file"
                maxFiles={1}
                showPreview
              />
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

export default AddPictureChoiceQuestion;
