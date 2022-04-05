import React, { BaseSyntheticEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import FileDropZone from "components/FileDropZone";
import { AddStepParams } from "common/types";
import { addStep } from "services/common";

const AddToggleQuestion = () => {
  const { sectionId } = useParams<AddStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [stepData, setStepData] = useState<any>({
    question: "",
    description: "",
    step: 1,
    max: 0,
    min: 5,
    feedback: false,
  });

  const updateFiles = (newImages: File[]) => {
    setBackgroundImage(newImages[0]);
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepData({ ...stepData, feedback: event.target.checked });
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "toggle");
    data.append("number", "0");
    data.append("section", sectionId);

    data.append("fields", JSON.stringify(stepData));
    if (backgroundImage) {
      data.append("background_image", backgroundImage);
    }

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
            <Typography variant="h4">Add Toggle Question</Typography>
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
                name="step"
                value={stepData.step}
                type="number"
                label="Step size"
                onChange={handleTextChange}
              />
              <TextField
                name="max_value"
                value={stepData.max_value}
                type="number"
                label="Maximum value"
                onChange={handleTextChange}
              />
              <TextField
                name="min_value"
                value={stepData.min_value}
                type="number"
                label="Minimum value"
                onChange={handleTextChange}
              />
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

export default AddToggleQuestion;
