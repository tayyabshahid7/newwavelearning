import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

const AudioResponse = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Title</Typography>
        <Typography> {stepAnswer?.step.fields.title}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{stepAnswer?.step.fields.content}</Typography>
        <Typography variant="h6">Learner Answer</Typography>
        <audio controls src={stepAnswer?.file_answer}>
          Your browser does not support html audio element.
        </audio>
      </Stack>
    </Paper>
  );
};

export default AudioResponse;
