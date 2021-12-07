import React, { useEffect, useState } from "react";
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
import { axs } from "services/axiosAPI";
import { useHistory } from "react-router";

interface AddStepDialogProps {
  open: boolean;
  sectionId: number;
  cancelCallback: (data?: any) => any;
}

const AddStepDialog = ({
  open,
  cancelCallback,
  sectionId,
}: AddStepDialogProps) => {
  const history = useHistory();
  const [stepTypes, setStepTypes] = useState<any>(null);
  const [selectedType, setSelectedType] = useState<any>("");

  useEffect(() => {
    const getStepTypes = async () => {
      try {
        const response = await axs.get("/steps/step-types");
        setStepTypes(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getStepTypes();
  }, []);

  const handleContinue = async () => {
    const stepType = selectedType.replaceAll("_", "-");
    history.push(`/sections/${sectionId}/steps/add-${stepType}`);
  };

  const handleCancel = () => {
    setSelectedType("");
    cancelCallback();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
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
                value={selectedType}
                label="Conten Type"
                onChange={handleChange}
              >
                {stepTypes?.map((stepType: any) => (
                  <MenuItem key={stepType.constant} value={stepType.constant}>
                    {stepType.description}
                  </MenuItem>
                ))}
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
