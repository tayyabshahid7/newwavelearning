import { Paper, Typography } from "@mui/material";
import React from "react";

const ToggleQuestionFeedback = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Typography>Student Answer: {stepAnswer?.answer.value}</Typography>
    </Paper>
  );
};

export default ToggleQuestionFeedback;
