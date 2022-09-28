import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Box, Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import FileDropZone from "components/FileDropZone";
import { EditStepParams } from "common/types";
import { editStep, getStepDetails } from "services/common";
import { UploadFile } from "@mui/icons-material";
import Player from "components/Player";

const EditAudioContent = () => {
  const { stepId } = useParams<EditStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [changeBackground, setChangeBackground] = useState<boolean>(false);
  const [deleteBackground, setDeleteBackground] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [stepData, setStepData] = useState<any>({
    title: "",
    description: "",
    feedback: false,
    audio: false,
    background_image: false,
  });

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        setStepData(response.fields);
        setAudioFile(response.fields.audio);
        setImage(response.fields.image);
        setChangeImage(response.fields.image instanceof String);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId]);

  const updateFiles = (newImages: File[]) => {
    setBackgroundImage(newImages[0]);
  };

  const cancelChangeBackground = () => {
    setBackgroundImage(null);
    setChangeBackground(false);
    setDeleteBackground(false);
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStepData({ ...stepData, feedback: event.target.checked });
  };

  const handleAddAudio = (event: any) => {
    setAudioFile(event.target.files[0]);
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "audio");
    if (audioFile instanceof File) {
      data.append("audio", audioFile);
    }
    let fields = stepData;
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
            <Typography variant="h4">Edit Audio Content</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                name="title"
                value={stepData.title}
                label="Audio Title"
                onChange={handleTextChange}
              />
              <TextField
                name="description"
                value={stepData.description}
                multiline
                label="Audio Description"
                minRows={3}
                onChange={handleTextChange}
              />

              <Stack direction="row" spacing={2}>
                <Stack direction="column" textAlign="center" spacing={1}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    {audioFile ? (
                      <Stack spacing={1}>
                        <Player source={audioFile} fileType="audio" />
                        <label htmlFor="audio">
                          <input
                            accept="audio/*"
                            id="audio"
                            type="file"
                            hidden
                            onChange={handleAddAudio}
                          />
                          <Button variant="text" component="span" fullWidth>
                            Change audio
                          </Button>
                        </label>
                      </Stack>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minWidth="200px"
                      >
                        <label htmlFor="audio">
                          <input
                            accept="audio/*"
                            id="audio"
                            type="file"
                            hidden
                            onChange={handleAddAudio}
                          />
                          <Button
                            variant="text"
                            component="span"
                            startIcon={<UploadFile fontSize="large" />}
                          >
                            Upload
                          </Button>
                        </label>
                      </Box>
                    )}
                  </Paper>
                </Stack>
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

export default EditAudioContent;
