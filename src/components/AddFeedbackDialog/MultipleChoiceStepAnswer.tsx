import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const MultipleChoiceStepAnswer = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Typography> Answer:</Typography>
      <Typography>Number of required answers: {stepAnswer?.step.fields.correct_answers}</Typography>
      <ul>
        {stepAnswer?.step.fields.answers?.map((answer: any) => (
          <li>
            <Stack direction="row" spacing={3}>
              <Typography>{answer.text}</Typography>
              {answer.correct && <Typography color="green">Correct Answer</Typography>}
              <Typography color={answer.correct ? "primary" : "error"}>
                {stepAnswer.answer.includes(answer.id) && "Learner Answer"}
              </Typography>
            </Stack>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default MultipleChoiceStepAnswer;
