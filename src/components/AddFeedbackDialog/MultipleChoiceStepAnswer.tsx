import { Stack, Typography } from "@mui/material";
import React from "react";

const MultipleChoiceStepAnswer = ({ stepAnswer }: any) => {
  return (
    <>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Typography> Answer:</Typography>
      <ul>
        {stepAnswer?.step.fields.answers.map((answer: any) => (
          <li>
            <Stack direction="row" spacing={3}>
              <Typography>{answer.text}</Typography>
              <Typography color="green">{answer.correct && "Correct answer"}</Typography>
              <Typography color="primary">
                {stepAnswer.answer.includes(answer.id) && "- User Answer"}
              </Typography>
              <Typography color="error">
                {!stepAnswer.answer.includes(answer.id) && "- User Answer"}
              </Typography>
            </Stack>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MultipleChoiceStepAnswer;
