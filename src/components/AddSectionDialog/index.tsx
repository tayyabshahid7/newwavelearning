import React, { BaseSyntheticEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { addSection } from "services/common";

interface AddSectionDialogProps {
  open: boolean;
  programmeId: number;
  cancelCallback: (data?: any) => any;
  addCallback: (data?: any) => any;
}

const AddSectionDialog = ({
  open,
  cancelCallback,
  addCallback,
  programmeId,
}: AddSectionDialogProps) => {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    number: 0,
    programme: programmeId.toString(),
  });
  const handleContinue = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("number", formData.number);
    data.append("programme", formData.programme);
    try {
      const response = await addSection(data);
      addCallback(response.data);
      setFormData({
        title: "",
        description: "",
        number: 0,
        programme: programmeId.toString(),
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      description: "",
      number: 0,
      programme: programmeId.toString(),
    });
    cancelCallback();
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>Add Section</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ p: 2 }}>
            <TextField
              id="title"
              label="Title"
              value={formData.title}
              onChange={handleTextChange}
            />
            <TextField
              id="description"
              label="Description"
              value={formData.description}
              onChange={handleTextChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleContinue}>Continue</Button>
          <Button variant="text" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddSectionDialog;
