import React, { BaseSyntheticEvent, ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
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
import { Delete } from "@mui/icons-material";

const EditMultipleChoiceQuestionStep = () => {
  const { stepId } = useParams<EditStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [changeBackground, setChangeBackground] = useState<boolean>(false);
  const [images, setImages] = useState<File[]>([]);
  const [stepForm, setStepForm] = useState<any>({
    question: "",
    description: "",
    feedback: false,
    answers: [],
  });

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        setStepForm(response.fields);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId]);

  const updateFiles = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleAddChoice = () => {
    let newIndex = 0;
    if (stepForm.answers.length > 0) {
      newIndex = stepForm.answers[stepForm.answers.length - 1].id + 1;
    }
    let newAnswers = stepForm.answers;
    newAnswers.push({ id: newIndex, text: "", correct: false });
    setStepForm({ ...stepForm, answers: newAnswers });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(e.target.value);
    let answerIndex = stepForm.answers.findIndex((answer: any) => answer.id === selectedId);
    let newAnswers = stepForm.answers;
    newAnswers[answerIndex].correct = e.target.checked;
    setStepForm({ ...stepForm, answers: newAnswers });
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setStepForm({ ...stepForm, [e.target.name]: e.target.value });
  };

  const handleAnswerTextChange = (e: BaseSyntheticEvent) => {
    const answerId = e.target.id;
    let newAnswers = stepForm.answers;
    newAnswers[answerId].text = e.target.value;
    setStepForm({ ...stepForm, answers: newAnswers });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepForm({ ...stepForm, feedback: event.target.checked });
  };

  const cancelChangeBackground = () => {
    setImages([]);
    setChangeBackground(false);
  };

  const deleteAnswer = (answerId: number) => {
    let newAnswers = stepForm.answers.filter((answer: any) => answer.id !== answerId);
    setStepForm({ ...stepForm, answers: newAnswers });
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "multiple_choice_question");
    data.append("fields", JSON.stringify(stepForm));
    if (images.length > 0) {
      images.map((image: File) => data.append("background_image", image));
    }

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
            <Typography variant="h4">Edit Multiple Choice Question</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                name="question"
                value={stepForm.question}
                label="Question"
                onChange={handleTextChange}
              />
              <TextField
                name="description"
                value={stepForm.description}
                multiline
                label="Description"
                minRows={3}
                onChange={handleTextChange}
              />
              <Typography variant="h6">Answers</Typography>
              <Typography variant="body2">
                Use the checkboxes to mark the asnwers as correct
              </Typography>
              {stepForm.answers.map((answer: any) => (
                <Stack key={answer.id} direction="row">
                  <IconButton
                    aria-label="delete answer"
                    // color="error"
                    onClick={() => deleteAnswer(answer.id)}
                  >
                    <Delete />
                  </IconButton>
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
                  />
                </Stack>
              ))}
              <Button variant="text" onClick={handleAddChoice}>
                Add Choice
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography>Background Image</Typography>
              {stepForm.background_image && !changeBackground ? (
                <>
                  <img src={stepForm.background_image} alt="step background" width={250} />
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
                <Switch checked={stepForm.feedback} onChange={handleFeedbackChange} />
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

export default EditMultipleChoiceQuestionStep;
