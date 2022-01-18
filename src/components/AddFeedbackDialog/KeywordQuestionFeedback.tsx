import React from "react";
import { Chip, Paper, Stack, Typography } from "@mui/material";

const KeywordQuestionFeedback = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Question</Typography>
        <Typography> {stepAnswer?.step.fields.question}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{stepAnswer?.step.fields.description}</Typography>
        <Typography variant="h6">Keywords</Typography>
        <Stack direction="row" spacing={1}>
          {stepAnswer?.step.fields.keywords?.map((keyword: any) => (
            <Chip key={keyword} color="primary" sx={{ color: "white" }} label={keyword} />
          ))}
        </Stack>
        <Typography variant="h6">Learner Answer</Typography>
        <Typography> {stepAnswer?.answer.text}</Typography>
      </Stack>
    </Paper>
  );
};

export default KeywordQuestionFeedback;
