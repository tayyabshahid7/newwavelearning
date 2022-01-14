import React from "react";
import { Paper, Typography } from "@mui/material";

const ModelAnswerQuestionFeedback = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Typography>Model Answer: {stepAnswer?.step.fields.model_answer}</Typography>
      <Typography>
        Student Marked as: {stepAnswer?.answer.correct ? "Correct" : "Incorrect"}
      </Typography>
      <Typography>Student Answer: {stepAnswer?.answer.text}</Typography>
    </Paper>
  );
};

export default ModelAnswerQuestionFeedback;
