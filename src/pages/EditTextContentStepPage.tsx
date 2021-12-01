import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import { Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import FileDropZone from "components/FileDropZone";
import { useHistory, useParams } from "react-router";
import { addStep, getStepDetails } from "services/common";

interface EditStepParams {
  sectionId: string;
  stepId: string;
}

const EditTextContentPage = () => {
  const { sectionId, stepId } = useParams<EditStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<any>({
    title: false,
    content: false,
  });
  const [formData, setFormData] = useState<any>({
    title: "",
    content: "",
    feedback: false,
    images: null,
    bgImages: null,
  });

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const stepData = await getStepDetails(stepId);
        setFormData({
          title: stepData.fields.title,
          content: stepData.fields.content,
          feedback: stepData.fields.feedback,
          images: stepData.fields.image,
          bgImages: stepData.fields.background_image,
        });
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchStepData();
  }, [stepId]);

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, feedback: event.target.checked });
  };

  const handleAddBackgroundImage = (addedFiles: File[]) => {
    setFormData({ ...formData, images: addedFiles });
  };

  const handleAddImage = (addedFiles: File[]) => {
    setFormData({ ...formData, bgImages: addedFiles });
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
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("section", sectionId);
      data.append("feedback", formData.feedback);
      data.append("step_type", "text_content");
      data.append("number", "0");
      formData.images.map((image: File) => data.append("image", image));
      formData.bgImages.map((image: File) => data.append("background_image", image));
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
              />
              <TextField
                fullWidth
                multiline
                minRows={10}
                value={formData.content}
                name="content"
                label="Content"
                onChange={handleTextChange}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Typography>Image</Typography>
              {formData.images ? (
                <Stack spacing={1}>
                  <img src={formData.images} width={150} alt="step" />
                  <Button variant="text">Change Image</Button>
                </Stack>
              ) : (
                <FileDropZone
                  accept="image/*"
                  maxFiles={1}
                  addFilesCallback={handleAddImage}
                  showPreview
                  helpText={"You can only upload image files"}
                />
              )}
              <Typography>Background Image</Typography>
              {formData.bgImages ? (
                <Stack spacing={1}>
                  <img src={formData.bgImages} width={150} alt="step" />
                  <Button variant="text">Change Image</Button>
                </Stack>
              ) : (
                <FileDropZone
                  accept="image/*"
                  maxFiles={1}
                  addFilesCallback={handleAddBackgroundImage}
                  showPreview
                  helpText={"You can only upload image files"}
                />
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

export default EditTextContentPage;
