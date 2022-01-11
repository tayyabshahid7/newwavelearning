import React, { BaseSyntheticEvent, ChangeEvent, useState } from "react";
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
import { AddStepParams } from "common/types";
import { addStep } from "services/common";
import { Delete } from "@mui/icons-material";

const AddMultipleChoiceQuestion = () => {
  const { sectionId } = useParams<AddStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [stepData, setStepData] = useState<any>({
    question: "",
    description: "",
    feedback: false,
    correct_anwsers: 1,
    answers: [],
  });
  const [images, setImages] = useState<File[]>([]);

  const updateFiles = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleAddChoice = () => {
    let newIndex = 0;
    if (stepData.answers.length > 0) {
      newIndex = stepData.answers[stepData.answers.length - 1].id + 1;
    }
    let newAnswers = stepData.answers;
    newAnswers.push({ id: newIndex, text: "", correct: false });
    setStepData({ ...stepData, answers: newAnswers });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedId = parseInt(e.target.value);
    let answerIndex = stepData.answers.findIndex((answer: any) => answer.id === selectedId);
    let newAnswers = stepData.answers;
    newAnswers[answerIndex].correct = e.target.checked;
    setStepData({ ...stepData, answers: newAnswers });
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

  const deleteAnswer = (answerId: number) => {
    let newAnswers = stepData.answers.filter((answer: any) => answer.id !== answerId);
    setStepData({ ...stepData, answers: newAnswers });
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "multiple_choice_question");
    data.append("number", "0");
    data.append("section", sectionId);
    data.append("fields", JSON.stringify(stepData));
    images.map((image: File) => data.append("background_image", image));
    try {
      await addStep(data);
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
            <Typography variant="h4">Add Multiple Choice Question</Typography>
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
              <Typography variant="h6">Answers</Typography>
              <Typography variant="body2">
                Use the checkboxes to mark the answers as correct
              </Typography>
              {stepData.answers.map((answer: any) => (
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

export default AddMultipleChoiceQuestion;
