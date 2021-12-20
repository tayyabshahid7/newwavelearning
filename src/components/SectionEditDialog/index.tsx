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

import { editSection } from "../../services/common";
import FileDropZone from "components/FileDropZone";
import Loading from "components/Loading";

const initialErrors = {
  title: {
    error: false,
    message: "",
  },
  number: {
    error: false,
    message: "",
  },
  description: {
    error: false,
    message: "",
  },
};

interface SectionEditDialogProps {
  open: boolean;
  section: any;
  editCallback: (editedSection?: any) => any;
  cancelEditCallback: () => any;
}

const SectionEditDialog = ({
  open,
  section,
  editCallback,
  cancelEditCallback,
}: SectionEditDialogProps) => {
  const [editForm, setEditForm] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [validationFields, setValidationFields] = useState<any>(initialErrors);
  const [dropzoneOpen, setDropzoneOpen] = useState<boolean>(section?.image === null);
  const [deleteBackground, setDeleteBackground] = useState<boolean>(false);

  useEffect(() => {
    if (section) {
      setEditForm({
        title: section.title,
        number: section.number,
        description: section.description,
        files: [],
      });
    }
    setDeleteBackground(false);
    setDropzoneOpen(section?.image === null);
  }, [section, open]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validationFields[e.target.name].error) {
      setValidationFields({ ...validationFields, [e.target.name]: { error: false, message: "" } });
    }
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    if (editForm.title.length < 1) {
      setValidationFields({
        ...validationFields,
        title: { error: true, message: "This field is required" },
      });
      return false;
    }
    if (editForm.description.length < 1) {
      setValidationFields({
        ...validationFields,
        description: { error: true, message: "This field is required" },
      });
      return false;
    }
    if (editForm.number.length < 1) {
      setValidationFields({
        ...validationFields,
        number: { error: true, message: "This field is required" },
      });
      return false;
    }
    if (editForm.programme === "") {
      setValidationFields({
        ...validationFields,
        programme: { error: true, message: "This field is required" },
      });
      return false;
    }
    // If nothing wrong
    return true;
  };
  const handleEditSection = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      const data = new FormData();

      data.append("title", editForm.title);
      data.append("number", editForm.number);
      data.append("description", editForm.description);
      if (deleteBackground) {
        data.append("image", "");
      } else {
        editForm.files.map((file: File) => data.append("image", file));
      }

      try {
        const response = await editSection(section.id, data);
        editCallback(response);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setValidationFields(initialErrors);
    cancelEditCallback();
  };

  const handleAddFiles = (newFiles: File[]) => {
    setEditForm({ ...editForm, files: newFiles });
  };

  return (
    <>
      <Loading loading={loading} />
      <Dialog open={open} fullWidth>
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSection}>
            <Stack spacing={2} sx={{ p: 2 }}>
              <TextField
                name="title"
                label="Title"
                onChange={handleTextChange}
                value={editForm.title}
                fullWidth
                size="small"
                error={validationFields.title.error}
                helperText={validationFields.title.error && validationFields.title.message}
              />
              <TextField
                name="description"
                label="Description"
                multiline
                onChange={handleTextChange}
                value={editForm.description}
                fullWidth
                size="small"
                error={validationFields.description.error}
                helperText={
                  validationFields.description.error && validationFields.description.message
                }
              />
              <TextField
                name="number"
                label="Section Number"
                onChange={handleTextChange}
                value={editForm.number}
                fullWidth
                size="small"
                type="number"
                error={validationFields.number.error}
                helperText={validationFields.number.error && validationFields.number.message}
              />

              {dropzoneOpen ? (
                <FileDropZone
                  accept="image/*"
                  addFilesCallback={handleAddFiles}
                  maxFiles={2}
                  showPreview
                />
              ) : deleteBackground ? (
                <Typography>Background marked to be deleted after pressing "Save"</Typography>
              ) : (
                <>
                  <Typography variant="body2">Image</Typography>
                  <img src={section?.image} width={150} alt="background" />
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
            onClick={handleCancelEdit}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleEditSection} disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SectionEditDialog;
