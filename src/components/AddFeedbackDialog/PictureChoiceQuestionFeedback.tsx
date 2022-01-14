import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const PictureChoiceQuestionFeedback = ({ stepAnswer }: any) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography>Question: {stepAnswer?.step.fields.question}</Typography>
      <Typography>Description: {stepAnswer?.step.fields.description}</Typography>
      <Typography>Number of required answers: {stepAnswer?.step.fields.correct_answers}</Typography>
      <Typography> Answer:</Typography>
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
    </Paper>
  );
};

export default PictureChoiceQuestionFeedback;
