import { Button, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import { isValidEmail } from "common/utils";
import DashboardLayout from "components/DashboardLayout";
import React, { BaseSyntheticEvent, useState } from "react";

const initialErrors = {
  email: {
    error: false,
    message: "",
  },
  firstName: {
    error: false,
    message: "",
  },
  lastName: {
    error: false,
    message: "",
  },
};

interface AddLearnerPageProps {
  cohortId: number;
}

const AddLearnerPage = ({ cohortId }: AddLearnerPageProps) => {
  const [validationFields, setValidationFields] = useState<any>(initialErrors);
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<any>({
    cohortId: cohortId,
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let errorFound = false;
    if (form.email.length <= 0 || form.email.trim().length <= 0) {
      setValidationFields({
        ...validationFields,
        email: { error: true, message: "This field must not be empty" },
      });
      errorFound = true;
    } else if (!isValidEmail(form.email)) {
      setValidationFields({
        ...validationFields,
        email: { error: true, message: "Please enter a valid email" },
      });
      errorFound = true;
    } else if (form.firstName.length <= 0 || form.firstName.trim().length <= 0) {
      setValidationFields({
        ...validationFields,
        firstName: { error: true, message: "This field must not be empty" },
      });
      errorFound = true;
    } else if (form.lastName.length <= 0 || form.lastName.trim().length <= 0) {
      setValidationFields({
        ...validationFields,
        lastName: { error: true, message: "This field must not be empty" },
      });
      errorFound = true;
    }

    if (errorFound) {
      setLoading(false);
      return;
    }
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
        Add Learner
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
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                size="small"
                error={validationFields.email.error}
                helperText={validationFields.email.error && validationFields.email.message}
              />
              <TextField
                name="firstName"
                label="First name"
                fullWidth
                size="small"
                value={form.firstName}
                onChange={handleChange}
                error={validationFields.firstName.error}
                helperText={validationFields.firstName.error && validationFields.firstName.message}
              />
              <TextField
                name="lastName"
                label="Last name"
                fullWidth
                size="small"
                value={form.lastName}
                onChange={handleChange}
                error={validationFields.lastName.error}
                helperText={validationFields.lastName.error && validationFields.lastName.message}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ pr: 5, pb: 5, textAlign: "right" }}>
            <Button type="submit" size="large" disabled={loading}>
              Add Learner
            </Button>
          </Grid>
        </Grid>
      </form>
    </DashboardLayout>
  );
};

export default AddLearnerPage;
