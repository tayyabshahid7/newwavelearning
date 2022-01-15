import React from "react";
import { Chip, Paper, Stack, Typography } from "@mui/material";

const KeywordQuestionFeedback = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Stack direction="row" spacing={1}>
        <Typography>Keywords:</Typography>
        {stepAnswer?.step.fields.keywords?.map((keyword: any) => (
          <Chip key={keyword} color="primary" sx={{ color: "white" }} label={keyword} />
        ))}
      </Stack>
      <Typography>Learner Answer:</Typography>
      <Typography> {stepAnswer?.answer.text}</Typography>
    </Paper>
  );
};

export default KeywordQuestionFeedback;
