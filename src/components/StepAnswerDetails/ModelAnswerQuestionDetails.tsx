import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

const ModelAnswerQuestionDetails = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Question</Typography>
        <Typography> {stepAnswer?.step.fields.question}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography> {stepAnswer?.step.fields.description}</Typography>
        <Typography variant="h6">Model Answer</Typography>
        <Typography>{stepAnswer?.step.fields.model_answer}</Typography>
        <Typography variant="h6">Student Answer</Typography>
        <Typography> {stepAnswer?.answer.text}</Typography>
        <Typography variant="button">
          Student Marked as: {stepAnswer?.answer.correct ? "Correct" : "Incorrect"}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ModelAnswerQuestionDetails;
