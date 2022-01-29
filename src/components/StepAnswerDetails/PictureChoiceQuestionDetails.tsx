import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const PictureChoiceQuestionDetails = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Question</Typography>
        <Typography> {stepAnswer?.step.fields.question}</Typography>
        <Typography variant="h6">Description</Typography>
        <Typography>{stepAnswer?.step.fields.description}</Typography>
        <Typography variant="h6"> Answer:</Typography>
        <Typography variant="button">
          Number of required answers: {stepAnswer?.step.fields.correct_answers}
        </Typography>
        <Stack spacing={2} direction="row">
          {stepAnswer?.step.fields.answers?.map((answer: any) => (
            <Paper key={answer.id} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={3} alignItems={"center"}>
                <img src={answer.picture} alt={answer.text} height={100} />
                <Typography>{answer.text}</Typography>
                <Typography color={answer.correct ? "primary" : "error"}>
                  {stepAnswer.answer.includes(answer.id) && "Learner Answer"}
                </Typography>
                {answer.correct && <Typography color="green">Correct Answer</Typography>}
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default PictureChoiceQuestionDetails;
