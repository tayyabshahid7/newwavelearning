import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { editProgramme } from "services/common";

const initialErrors = {
  name: {
    error: false,
    message: "",
  },
};

interface ProgrammeEditDialogProps {
  open: boolean;
  programme: any;
  editCallback: (editedProgramme: any) => any;
  cancelEditCallback: () => any;
}

const ProgrammeEditDialog = ({
  open,
  programme,
  editCallback,
  cancelEditCallback,
}: ProgrammeEditDialogProps) => {
  const [name, setName] = useState<string>(programme.name);
  const [loading, setLoading] = useState<boolean>(false);
  const [validationFields, setValidationFields] = useState<any>(initialErrors);

  useEffect(() => {
    const fetchData = async () => {};
    if (open) {
      fetchData();
    }
  }, [programme, open]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validationFields.name.error) {
      setValidationFields({ ...validationFields, name: { error: false, message: "" } });
    }
    setName(e.target.value);
  };

  const isFormValid = () => {
    if (name.length < 1) {
      setValidationFields({
        ...validationFields,
        name: { error: true, message: "This field is required" },
      });
      return false;
    }
    // If nothing wrong
    return true;
  };
  const handleEditProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      const formData = {
        name: name,
      };
      try {
        const response = await editProgramme(programme.id, formData);
        editCallback(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Edit Programme</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditProgramme}>
          <Stack spacing={2} sx={{ p: 2 }}>
            <TextField
              name="name"
              label="Programme Name"
              onChange={handleNameChange}
              value={name}
              fullWidth
              size="small"
              error={validationFields.name.error}
              helperText={validationFields.name.error && validationFields.name.message}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          color="error"
          variant="text"
          onClick={cancelEditCallback}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={handleEditProgramme} disabled={loading}>
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProgrammeEditDialog;
