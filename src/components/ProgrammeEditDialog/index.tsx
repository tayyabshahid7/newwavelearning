import React, { useEffect, useState } from "react";
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

import { editProgramme } from "services/common";
import FileDropZone from "components/FileDropZone";
import Loading from "components/Loading";

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
  const [dropzoneOpen, setDropzoneOpen] = useState<boolean>(programme.background_image === null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [deleteBackground, setDeleteBackground] = useState<boolean>(false);

  useEffect(() => {
    setDropzoneOpen(programme.background_image === null);
    setDeleteBackground(false);
    setName(programme.name);
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
      const data = new FormData();
      data.append("name", name);
      if (deleteBackground) {
        data.append("background_image", "");
      } else {
        files?.map(file => data.append("background_image", file));
      }
      try {
        const response = await editProgramme(programme.id, data);
        editCallback(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    programme.background_image && setDropzoneOpen(false);
  };

  const handleAddFiles = (files: File[]) => {
    setFiles(files);
  };

  const handleCancelButton = () => {
    cancelEditCallback();
  };

  return (
    <Dialog open={open} fullWidth>
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
            {dropzoneOpen ? (
              <FileDropZone
                accept="image/*"
                addFilesCallback={handleAddFiles}
                maxFiles={2}
                showPreview
              />
            ) : deleteBackground ? (
              <Typography>Background marked to be deleted after pressig "Edit"</Typography>
            ) : (
              <>
                <Typography variant="body2">Programme background</Typography>
                <img src={programme.background_image} width={150} alt="background" />
                <Button variant="text" color="primary" onClick={() => setDropzoneOpen(true)}>
                  Change Background
                </Button>
                <Button variant="text" color="error" onClick={() => setDeleteBackground(true)}>
                  Mark to Delete Background
                </Button>
              </>
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          color="error"
          variant="text"
          onClick={handleCancelButton}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={handleEditProgramme} disabled={loading}>
          Edit
        </Button>
      </DialogActions>
      <Loading loading={loading} />
    </Dialog>
  );
};

export default ProgrammeEditDialog;
