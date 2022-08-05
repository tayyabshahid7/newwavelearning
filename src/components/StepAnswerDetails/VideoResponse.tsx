import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

const VideoResponse = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Title</Typography>
        <Typography> {stepAnswer?.step.fields.title}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{stepAnswer?.step.fields.content}</Typography>
        <Typography variant="h6">Learner Answer</Typography>
        <video
          src={stepAnswer?.video_file_url}
          className="video"
          controls
          controlsList="nodownload"
        ></video>
      </Stack>
    </Paper>
  );
};

export default VideoResponse;
