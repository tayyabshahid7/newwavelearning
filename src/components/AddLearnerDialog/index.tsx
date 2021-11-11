import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Stack,
} from "@mui/material";
import { uploadLearners } from "services/common";
import FileDropZone from "../FileDropZone";
import Loading from "components/Loading";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<File[] | null>(null);
  const [uploadDone, setUploadDone] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<any | null>(null);
  const handleAddFiles = (files: File[]) => {
    setFiles(files);
  };

  const handleUploadFiles = async () => {
    setLoading(true);
    try {
      const form = new FormData();
      form.append("cohort_id", cohortId.toString());
      files?.map(file => form.append("files", file));
      const response = await uploadLearners(form);
      setUploadResponse(response);
      setUploadDone(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleContinue = () => {
    uploadFinishedCallback(uploadResponse.learners);
    setUploadDone(false);
    setUploadResponse(null);
    setFiles(null);
  };
  return (
    <>
      <Loading loading={loading} />
      <Dialog open={open} fullWidth>
        <DialogTitle>Add Learners</DialogTitle>
        <DialogContent>
          {uploadDone ? (
            <Stack spacing={2}>
              <Typography>
                You have uploaded {uploadResponse?.new} learner
                {uploadResponse?.new === 1 ? "" : "s"}
              </Typography>
              <Typography>
                There were {uploadResponse?.existing.length} previously added or repeated learner
                {uploadResponse?.existing.length === 1 ? "" : "s"} 
              </Typography>
              <Stack>
                {uploadResponse?.existing.map((e: any) => (
                  <Typography sx={{ pl: 2 }}>{e}</Typography>
                ))}
              </Stack>
              <Typography>Failed: {uploadResponse?.failed.length > 0 ? "" : "None"}</Typography>
              <Stack>
                {uploadResponse?.failed.map((f: any) => (
                  <Typography sx={{ pl: 2 }}>{f}</Typography>
                ))}
              </Stack>
            </Stack>
          ) : (
            <FileDropZone accept=".csv" addFilesCallback={handleAddFiles} />
          )}
        </DialogContent>
        <DialogActions>
          {uploadDone ? (
            <Button onClick={handleContinue}>Continue</Button>
          ) : (
            <>
              <Button onClick={handleUploadFiles} disabled={files === null}>
                Upload
              </Button>
              <Button variant="text" color="error" onClick={cancelCallback}>
                Cancel
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddLearnerDialog;
