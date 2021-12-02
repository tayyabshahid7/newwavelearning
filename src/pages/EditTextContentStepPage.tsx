import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import { Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import FileDropZone from "components/FileDropZone";
import { useHistory, useParams } from "react-router";
import { editStep, getStepDetails } from "services/common";

interface EditStepParams {
  stepId: string;
}

const EditTextContentPage = () => {
  const { stepId } = useParams<EditStepParams>();
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
    images: [],
    bgImages: [],
  });
  const [changeBgImage, setChangeBgImage] = useState<boolean>(false);
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [stepData, setStepData] = useState<any>({});

  useEffect(() => {
    const fetchStepData = async () => {
      try {
        const response = await getStepDetails(stepId);
        const data = {
          title: response.fields.title,
          content: response.fields.content,
          feedback: response.fields.feedback,
          images: response.fields.image,
          bgImages: response.fields.background_image,
        };
        setStepData(data);
        setFormData({
          title: data.title,
          content: data.content,
          feedback: data.feedback,
          images: [],
          bgImages: [],
        });
        setChangeBgImage(response.fields.background_image === null);
        setChangeImage(response.fields.image === null);
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
    setFormData({ ...formData, bgImages: addedFiles });
  };

  const handleAddImage = (addedFiles: File[]) => {
    setFormData({ ...formData, images: addedFiles });
  };

  const handleChangeBgImage = () => {
    setFormData({ ...formData, bgImages: null });
    setChangeBgImage(true);
  };

  const handleCangelChangeBgImage = () => {
    setFormData({ ...formData, bgImages: stepData.bgImages });
    setChangeBgImage(false);
  };

  const handleChangeImage = () => {
    setFormData({ ...formData, images: null });
    setChangeImage(true);
  };

  const handleCancelChangeImage = () => {
    setFormData({ ...formData, images: stepData.images });
    setChangeImage(false);
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
      const fields = {
        title: formData.title,
        content: formData.content,
        feedback: formData.feedback,
        step_type: "text_content", // So the backend knows which type of field is being updated
        image: stepData.images,
        background_image: stepData.bgImages,
      };
      data.append("fields", JSON.stringify(fields));
      formData.images.map((image: File) => data.append("image", image));
      formData.bgImages.map((image: File) => data.append("background_image", image));
      try {
        await editStep(stepId, data);
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
              {changeImage ? (
                <>
                  <FileDropZone
                    accept="image/*"
                    maxFiles={1}
                    addFilesCallback={handleAddImage}
                    showPreview
                    helpText={"You can only upload image files"}
                  />
                  {stepData.images !== null && (
                    <Button variant="text" color="error" onClick={handleCancelChangeImage}>
                      Cancel image change
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <img src={stepData.images} width={150} alt="step" />
                  <Button variant="text" onClick={handleChangeImage}>
                    Change image
                  </Button>
                </>
              )}
              <Typography>Background Image</Typography>
              {changeBgImage ? (
                <>
                  <FileDropZone
                    accept="image/*"
                    maxFiles={1}
                    addFilesCallback={handleAddBackgroundImage}
                    showPreview
                    helpText={"You can only upload image files"}
                  />
                  <Button variant="text" color="error" onClick={handleCangelChangeBgImage}>
                    Cancel background image change
                  </Button>
                </>
              ) : (
                <>
                  <img src={stepData.bgImages} width={150} alt="step" />
                  <Button variant="text" onClick={handleChangeBgImage}>
                    Change background image
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
