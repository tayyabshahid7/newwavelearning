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
import StepAnswerDetails from "../StepAnswerDetails";

interface AddFeedbackDialogProps {
  feedback: Feedback;
  open: boolean;
  closeCallback: (confirm?: boolean, addedFeedback?: Feedback) => any;
}

const AddFeedbackDialog = ({ feedback, open, closeCallback }: AddFeedbackDialogProps) => {
  const [stepAnswer, setStepAnswer] = useState<any>(null);
  const [feedbackText, setFeedbackText] = useState<string>(feedback?.description || "");
  useEffect(() => {
    const fetchAnswer = async () => {
      const response = await getStepAnswer(feedback.step_answer?.id);
      setStepAnswer(response);
      setFeedbackText(feedback.description);
    };
    if (feedback) {
      fetchAnswer();
    }
    console.log(feedback);
  }, [feedback]);

  const handleChange = (e: BaseSyntheticEvent) => {
    setFeedbackText(e?.target.value);
  };

  const handleSubmitFeedback = async () => {
    try {
      const addedFeedback = await submitFeedback(feedback.id, feedbackText);
      setFeedbackText("");
      closeCallback(true, addedFeedback);
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
      <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="lg">
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <Typography>Content Type: {feedback?.step_type}</Typography>
            <Typography>Learner: {feedback?.learner}</Typography>
            <StepAnswerDetails stepType={feedback?.step_type} stepAnswer={stepAnswer} />
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
