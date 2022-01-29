import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const MultipleChoiceDetails = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Question</Typography>
        <Typography> {stepAnswer?.step.fields.question}</Typography>
        <Typography variant="h6">Description:</Typography>
        <Typography> {stepAnswer?.step.fields.description}</Typography>
        <Typography variant="h6"> Answer:</Typography>
        <Typography variant="button">
          Number of required answers: {stepAnswer?.step.fields.correct_answers}
        </Typography>
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
      </Stack>
    </Paper>
  );
};

export default MultipleChoiceDetails;
