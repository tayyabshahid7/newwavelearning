import React, { BaseSyntheticEvent, useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import { Button, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import FileDropZone from "components/FileDropZone";
import { useHistory } from "react-router";

const AddTextContentPage = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<any>({
    title: "",
    content: "",
    feedback: false,
  });

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      feedback: event.target.checked,
    });
  };

  const handleAddFile = (addedFiles: File[]) => {
    setFiles(addedFiles);
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
              <Typography>Background Image</Typography>
              <FileDropZone
                accept="image/*"
                maxFiles={1}
                addFilesCallback={handleAddFile}
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
              <Button size="large">Save</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
};

export default AddTextContentPage;
