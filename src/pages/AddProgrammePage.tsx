import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

import DashboardLayout from "components/DashboardLayout";
import FileDropZone from "components/FileDropZone";
import React, { BaseSyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import { addProgramme } from "services/common";

const initialErrors = {
  name: {
    error: false,
    message: "",
  },
  background: {
    error: false,
    message: "",
  },
};

const AddProgrammePage = () => {
  const history = useHistory();
  const [validationFields, setValidationFields] = useState<any>(initialErrors);
  const [loading, setLoading] = useState<boolean>(false);

  const [files, setFiles] = useState<File[] | null>(null);

  const handleAddFiles = (files: File[]) => {
    setFiles(files);
  };
  const [programmeName, setProgrammeName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let errorFound = false;
    if (programmeName.length <= 0 || programmeName.trim().length <= 0) {
      setValidationFields({
        ...validationFields,
        name: { error: true, message: "This field must not be empty" },
      });
      errorFound = true;
    }

    if (!errorFound) {
      try {
        const data = new FormData();
        data.append("name", programmeName);
        files?.map(file => data.append("image", file));
        const addedProgramme = await addProgramme(data);
        history.push(`/programmes/${addedProgramme.id}`);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    setValidationFields({
      ...validationFields,
      [e.target.name]: {
        error: false,
        message: "",
      },
    });
    setProgrammeName(e.target.value);
  };
  return (
    <DashboardLayout loading={loading}>
      <Typography variant="h4" sx={{ marginBottom: "50px" }}>
        Add Programme
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container component={Paper}>
          <Grid item xs={6}>
            <Stack
              spacing={{ xs: 5 }}
              sx={{ maxWidth: "500px", m: "auto", p: 5 }}
              component={Paper}
            >
              <TextField
                name="name"
                label="Programme Name"
                value={programmeName}
                onChange={handleChange}
                fullWidth
                size="small"
                error={validationFields.name.error}
                helperText={validationFields.name.error && validationFields.name.message}
              />
              <Typography>Image</Typography>
              <FileDropZone
                accept="image/*"
                addFilesCallback={handleAddFiles}
                maxFiles={2}
                showPreview
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ pr: 5, pb: 5, textAlign: "right" }}>
            <Button type="submit" size="large" disabled={loading}>
              Add Programme
            </Button>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default AddProgrammePage;
