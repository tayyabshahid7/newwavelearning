import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

import DashboardLayout from "components/DashboardLayout";
import React, { BaseSyntheticEvent, useState } from "react";
import { useHistory } from "react-router";
import { addProgramme } from "services/common";

const initialErrors = {
  name: {
    error: false,
    message: "",
  },
};

const AddProgrammePage = () => {
  const history = useHistory();
  const [validationFields, setValidationFields] = useState<any>(initialErrors);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let errorFound = false;
    if (form.name.length <= 0 || form.name.trim().length <= 0) {
      setValidationFields({
        ...validationFields,
        name: { error: true, message: "This field must not be empty" },
      });
      errorFound = true;
    }

    if (!errorFound) {
      try {
        const addedProgramme = await addProgramme(form);
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
    setForm({ ...form, [e.target.name]: e.target.value });
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
                value={form.name}
                onChange={handleChange}
                fullWidth
                size="small"
                error={validationFields.name.error}
                helperText={validationFields.name.error && validationFields.name.message}
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
