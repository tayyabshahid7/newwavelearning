import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import { uploadLearners } from "services/common";
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
  const [files, setFiles] = useState<File[] | null>(null);
  const handleAddFiles = (files: File[]) => {
    setFiles(files);
  };

  const handleUploadFiles = async () => {
    try {
      const form = new FormData();
      form.append("cohort_id", cohortId.toString());
      files?.map(file => form.append("files", file));
      const newLearners = await uploadLearners(form);
      uploadFinishedCallback(newLearners);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Add Learners</DialogTitle>
      <DialogContent>
        <FileDropZone accept=".csv" addFilesCallback={handleAddFiles} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUploadFiles}>Upload</Button>
        <Button variant="text" color="error" onClick={cancelCallback}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLearnerDialog;
