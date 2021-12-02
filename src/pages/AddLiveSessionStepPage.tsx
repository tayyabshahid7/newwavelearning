import React, { useState } from "react";
import DashboardLayout from "components/DashboardLayout";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LIVE_SESSION_TYPES } from "common/constants";
import { useHistory } from "react-router";

const AddLiveSessionStepPage = () => {
  const [stepData, setStepData] = useState<any>({
    title: "",
    description: "",
    sessionType: "",
    sessionDuration: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setStepData({ ...stepData, [event.target.name]: event.target.value });
  };

  return (
    <DashboardLayout loading={loading}>
      <Paper>
        <Grid container sx={{ p: 8 }} spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Add Live Session step</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField name="title" label="Session Title" fullWidth />
              <TextField
                name="description"
                label="Session Description"
                fullWidth
                multiline
                minRows={5}
              />
              <FormControl fullWidth>
                <InputLabel id="session-type">Session Type</InputLabel>
                <Select
                  labelId="session-type"
                  name="sessionType"
                  value={stepData.sessionType}
                  label="Session Type"
                  onChange={handleSelectChange}
                >
                  {LIVE_SESSION_TYPES.map(lstype => (
                    <MenuItem key={lstype.value} value={lstype.value}>
                      {lstype.text}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="session-duration">Session Duration</InputLabel>
                <Select
                  labelId="session-duration"
                  name="sessionDuration"
                  value={stepData.sessionDuration}
                  label="Session Type"
                  onChange={handleSelectChange}
                >
                  {[1, 2, 3, 4, 5, 6].map((duration, index) => (
                    <MenuItem key={index} value={duration}>
                      {duration} hour{duration === 1 ? "" : "s"}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            Background Image???
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button size="large" color="error" onClick={() => history.goBack()}>
                Cancel
              </Button>
              <Button size="large">Save</Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
};

export default AddLiveSessionStepPage;
