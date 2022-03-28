import React, { BaseSyntheticEvent, useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import { Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import FileDropZone from "components/FileDropZone";
import { useHistory, useParams } from "react-router";
import { addStep } from "services/common";
import { AddStepParams } from "common/types";

const AddAudioResponsePage = () => {
  const { sectionId } = useParams<AddStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({
    title: false,
    content: false,
    images: false,
    bgImages: false,
  });
  const [formData, setFormData] = useState<any>({
    title: "",
    content: "",
    feedback: false,
    image: null,
    bgImage: null,
  });

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, feedback: event.target.checked });
  };

  const handleAddBackgroundImage = (addedFiles: File[]) => {
    setFormData({ ...formData, bgImage: addedFiles[0] });
    setFormErrors({ ...formErrors, bgImage: false });
  };

  const handleAddImage = (addedFiles: File[]) => {
    setFormData({ ...formData, image: addedFiles[0] });
    setFormErrors({ ...formErrors, image: false });
  };

  const isFormValid = () => {
    let valid = true;
    if (formData.title.length < 1) {
      setFormErrors({ ...formErrors, title: true });
      valid = false;
    }
    if (formData.content.length < 1) {
      setFormErrors({ ...formErrors, content: true });
      valid = false;
    }
    return valid;
  };

  const handleSave = async () => {
    setLoading(true);
    if (isFormValid()) {
      const data = new FormData();

      data.append(
        "fields",
        JSON.stringify({
          title: formData.title,
          content: formData.content,
          feedback: formData.feedback,
        })
      );
      data.append("step_type", "audio_response");
      data.append("section", sectionId);
      data.append("number", "0");
      if (formData.image instanceof File) {
        data.append("image", formData.image);
      }
      if (formData.bgImage instanceof File) {
        data.append("background_image", formData.bgImage);
      }
      try {
        await addStep(data);
        history.goBack();
      } catch (error: any) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <DashboardLayout loading={loading}>
      <Paper>
        <Grid container sx={{ p: 8 }} spacing={6}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                value={formData.title}
                name="title"
                label="Title"
                onChange={handleTextChange}
                error={formErrors.title}
                helperText={formErrors.title && "This field is required"}
              />
              <TextField
                fullWidth
                multiline
                minRows={10}
                value={formData.content}
                name="content"
                label="Content"
                onChange={handleTextChange}
                error={formErrors.content}
                helperText={formErrors.content && "This field is required"}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography color={formErrors.images ? "error" : "default"}>Image</Typography>
              <FileDropZone
                accept="image/*"
                maxFiles={1}
                addFilesCallback={handleAddImage}
                showPreview
                helpText={"You can only upload image files"}
              />
              <Typography color={formErrors.bgImages ? "error" : "default"}>
                Background Image
              </Typography>
              <FileDropZone
                accept="image/*"
                maxFiles={1}
                addFilesCallback={handleAddBackgroundImage}
                showPreview
                helpText={"You can only upload image files"}
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
                <Switch checked={formData.feedback} onChange={handleFeedbackChange} />
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

export default AddAudioResponsePage;
