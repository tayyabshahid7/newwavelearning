import React, { BaseSyntheticEvent, useEffect, useState } from "react";
// import Loading from "components/Loading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getStepAnswer, submitFeedback } from "services/common";
import { Feedback } from "common/types";
import StepAnswerBody from "./StepAnswerBody";

interface AddFeedbackDialogProps {
  feedback: Feedback;
  open: boolean;
  closeCallback: () => any;
}

const AddFeedbackDialog = ({ feedback, open, closeCallback }: AddFeedbackDialogProps) => {
  const [stepAnswer, setStepAnswer] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState<string>("");
  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await getStepAnswer(feedback.step_answer);
      setStepAnswer(response);
      setFeedbackText("");
    };
    if (feedback) {
      fetchAnswer();
    }
  }, [feedback]);

  const handleChange = (e: BaseSyntheticEvent) => {
    setFeedbackText(e?.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      await submitFeedback(feedback.id, feedbackText);
      setFeedbackText("");
      closeCallback();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setFeedbackText("");
    closeCallback();
  };

  return (
    <>
      <Dialog open={open} onClose={closeCallback} fullWidth maxWidth="lg">
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Typography>Content Type: {feedback?.step_type}</Typography>
            <Typography>Learner: {feedback?.learner}</Typography>
            <StepAnswerBody stepType={feedback?.step_type} stepAnswer={stepAnswer} />
            <TextField
              name="feedback"
              multiline
              minRows={5}
              label="Your feedback"
              value={feedbackText}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
          <Button color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddFeedbackDialog;
