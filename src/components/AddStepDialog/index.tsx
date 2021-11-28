import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

interface AddStepDialogProps {
  open: boolean;
  sectionId: number;
  cancelCallback: (data?: any) => any;
  continueCallback: (data?: any) => any;
}

const AddStepDialog = ({ open, cancelCallback, continueCallback, sectionId }: AddStepDialogProps) => {
  const [formData, setFormData] = useState<any>({
    section: sectionId,
    number: 0,
    fields: "",
    step_type: "",
  });
  const handleContinue = async () => {
    // TODO: implement add step
    continueCallback();
  };

  const handleCancel = () => {
    setFormData({
      section: sectionId,
      number: 0,
      fields: "",
      step_type: "",
    });
    cancelCallback();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormData({
      ...formData,
      step_type: event.target.value,
    });
  };

  return (
    <>
      <Dialog open={open} fullWidth>
        <DialogTitle>Add Step</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ p: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="step-type-label">Content Type</InputLabel>
              <Select
                labelId="step-type-label"
                id="step_type"
                value={formData.step_type}
                label="Conten Type"
                onChange={handleChange}
              >
                <MenuItem value={1}>Live Session</MenuItem>
                <MenuItem value={2}>Text Content</MenuItem>
                <MenuItem value={3}>Etc</MenuItem>
              </Select>
            </FormControl>
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

export default AddStepDialog;
