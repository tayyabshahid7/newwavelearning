import React, { useEffect, useState } from "react";
// import Loading from "components/Loading";
import { Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { getStepAnswer } from "services/common";
import { Feedback } from "common/types";
import StepAnswerBody from "./StepAnswerBody";

interface AddFeedbackDialogProps {
  feedback: Feedback;
  open: boolean;
  closeCallback: () => any;
}

const AddFeedbackDialog = ({ feedback, open, closeCallback }: AddFeedbackDialogProps) => {
  const [stepAnswer, setStepAnswer] = useState<any>(null);
  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await getStepAnswer(feedback.step_answer);
      setStepAnswer(response);
    };
    if (feedback) {
      fetchAnswer();
    }
  }, [feedback]);
  return (
    <>
      <Dialog open={open} onClose={closeCallback} fullWidth maxWidth="lg">
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Typography>Content Type: {feedback?.step_type}</Typography>
            <Typography>Learner: {feedback?.learner}</Typography>
            <StepAnswerBody stepType={feedback?.step_type} stepAnswer={stepAnswer} />
            <TextField multiline minRows={5} label="Your feedback" />
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFeedbackDialog;
