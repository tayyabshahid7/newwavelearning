import React, { BaseSyntheticEvent, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Box, Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import FileDropZone from "components/FileDropZone";
import { AddStepParams } from "common/types";
import { addStep } from "services/common";
import { UploadFile } from "@mui/icons-material";
import Player from "components/Player";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

let bucketName = process.env.REACT_APP_S3_BUCKET_NAME;
let s3Key: any = process.env.REACT_APP_S3_KEY;
let s3Region: any = process.env.REACT_APP_S3_REGION;

let credentials: any = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

const AddVideoContent = () => {
  const { sectionId } = useParams<AddStepParams>();
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [stepData, setStepData] = useState<any>({
    title: "",
    description: "",
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

  const handleAddVideo = (event: any) => {
    setVideoFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    let target: any = {
      Bucket: bucketName,
      Key: s3Key + videoFile?.name,
      Body: videoFile,
      partSize: 10,
    };
    try {
      const parallelUploads3 = new Upload({
        client: new S3Client({ region: s3Region, credentials }),
        leavePartsOnError: false, // optional manually handle dropped parts
        params: target,
      });

      parallelUploads3.on("httpUploadProgress", progress => {
        console.log(progress);
      });

      await parallelUploads3.done();
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("step_type", "video");
    data.append("number", "0");
    data.append("section", sectionId);

    if (image) {
      data.append("image", image);
    }
    if (backgroundImage) {
      data.append("background_image", backgroundImage);
    }

    let fields: any = stepData;
    if (videoFile) {
      await uploadFile();
      let name = s3Key + videoFile?.name;
      const s3ObjectUrl = `https://${bucketName}.s3.${s3Region}.amazonaws.com/${name}`;
      fields["video"] = s3ObjectUrl;
      data.append("fields", JSON.stringify(fields));
      await saveData(data);
    } else {
      data.append("fields", JSON.stringify(fields));
      await saveData(data);
    }
  };

  const saveData = async (data: any) => {
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
            <Typography variant="h4">Add Video Content</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                name="title"
                value={stepData.title}
                label="Video Title"
                onChange={handleTextChange}
              />
              <TextField
                name="description"
                value={stepData.description}
                multiline
                label="Video Description"
                minRows={3}
                onChange={handleTextChange}
              />

              <Stack direction="row" spacing={2}>
                <Stack direction="column" textAlign="center" spacing={1}>
                  <Paper variant="outlined" sx={{ p: 2, minHeight: "280px" }}>
                    {videoFile ? (
                      <Stack spacing={1}>
                        <Player source={videoFile} fileType="video" />

                        <label htmlFor="video">
                          <input
                            accept="video/*"
                            id="video"
                            type="file"
                            hidden
                            onChange={handleAddVideo}
                          />
                          <Button variant="text" component="span" fullWidth>
                            Change video
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
                        <label htmlFor="video">
                          <input
                            accept="video/*"
                            id="video"
                            type="file"
                            hidden
                            onChange={handleAddVideo}
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

export default AddVideoContent;
