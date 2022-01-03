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
  const [dropzoneOpen, setDropzoneOpen] = useState<any>({
    image: false,
    bgImage: false,
  });
  const [image, setImage] = useState<File | null>(null);
  const [defaultBgImage, SetDefaultBgImage] = useState<File | null>(null);
  const [deleteImage, setDeleteImage] = useState<boolean>(false);
  const [deleteBgImage, setDeleteBgImage] = useState<boolean>(false);

  useEffect(() => {
    setDropzoneOpen({
      image: programme.image === null,
      bgImage: programme.background_image === null,
    });
    setDeleteImage(false);
    setDeleteBgImage(false);
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
      if (deleteImage) {
        data.append("image", "");
      } else if (image) {
        data.append("image", image);
      }
      if (deleteBgImage) {
        data.append("background_image", "");
      } else if (defaultBgImage) {
        data.append("background_image", defaultBgImage);
      }
      try {
        const response = await editProgramme(programme.id, data);
        editCallback(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    programme.image && setDropzoneOpen(false);
  };

  const handleAddImage = (files: File[]) => {
    setImage(files[0]);
  };

  const handleAddBgImage = (files: File[]) => {
    SetDefaultBgImage(files[0]);
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
            {dropzoneOpen.image ? (
              <>
                <Typography>Image</Typography>
                <FileDropZone
                  accept="image/*"
                  addFilesCallback={handleAddImage}
                  maxFiles={2}
                  showPreview
                />
              </>
            ) : deleteImage ? (
              <Typography>Background marked to be deleted after pressing "Save"</Typography>
            ) : (
              <>
                <Typography variant="body2">Programme background</Typography>
                <img src={programme.image} width={150} alt="background" />
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setDropzoneOpen({ ...dropzoneOpen, image: true })}
                >
                  Change Background
                </Button>
                <Button variant="text" color="error" onClick={() => setDeleteImage(true)}>
                  Mark to Delete Background
                </Button>
              </>
            )}
            {/* BACKGROUND IMAGE */}
            {dropzoneOpen.bgImage ? (
              <>
                <Typography>Default Background Image</Typography>
                <FileDropZone
                  accept="image/*"
                  addFilesCallback={handleAddBgImage}
                  maxFiles={2}
                  showPreview
                />
              </>
            ) : deleteBgImage ? (
              <Typography>Default Background marked to be deleted after pressing "Save"</Typography>
            ) : (
              <>
                <Typography variant="body2">Default background</Typography>
                <img src={programme.background_image} width={150} alt="background" />
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setDropzoneOpen({ ...dropzoneOpen, bgImage: true })}
                >
                  Change Default Background
                </Button>
                <Button variant="text" color="error" onClick={() => setDeleteBgImage(true)}>
                  Mark to Delete Default Background
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
