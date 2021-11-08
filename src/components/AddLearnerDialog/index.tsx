import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import FileDropZone from "../FileDropZone";

interface AddLearnerDialogProps {
  open: boolean;
  cohortId: number;
  cancelCallback: () => any;
  uploadFinishedCallback: (newLearners: any) => any;
}

const AddLearnerDialog = ({
  open,
  cohortId,
  cancelCallback,
  uploadFinishedCallback,
}: AddLearnerDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Add Learners</DialogTitle>
      <DialogContent>
        <FileDropZone accept="" />
      </DialogContent>
      <DialogActions>
        <Button onClick={uploadFinishedCallback}>Upload</Button>
        <Button variant="text" color="error" onClick={cancelCallback}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLearnerDialog;
