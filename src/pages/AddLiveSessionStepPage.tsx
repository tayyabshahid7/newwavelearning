import React, { BaseSyntheticEvent, useState } from "react";
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
import { HOURS, LIVE_SESSION_TYPES, MINUTES } from "common/constants";
import { useHistory, useParams } from "react-router";
import { addStep } from "services/common";
import { AddStepParams } from "common/types";

const AddLiveSessionStepPage = () => {
  const { sectionId } = useParams<AddStepParams>();
  const [stepData, setStepData] = useState<any>({
    title: "",
    description: "",
    step_description: "",
    session_type: "",
    hours: "",
    minutes: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const handleSelectChange = (event: SelectChangeEvent) => {
    setStepData({ ...stepData, [event.target.name]: event.target.value });
  };

  const handleTextChange = (e: BaseSyntheticEvent) => {
    setStepData({ ...stepData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("step_type", "live_session");
      data.append("section", sectionId);
      data.append("number", "0");
      data.append("fields", JSON.stringify(stepData));
      await addStep(data);
      history.goBack();
    } catch (error: any) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <DashboardLayout loading={loading}>
      <Paper>
        <Grid container sx={{ p: 8 }} spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Add Live Session</Typography>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                name="title"
                label="Session Title"
                fullWidth
                value={stepData.title}
                onChange={handleTextChange}
              />
              <TextField
                name="description"
                label="Session Description"
                fullWidth
                multiline
                value={stepData.description}
                onChange={handleTextChange}
                minRows={5}
              />
              <TextField
                name="step_description"
                label="Step Description"
                fullWidth
                multiline
                value={stepData.step_description}
                onChange={handleTextChange}
                minRows={5}
              />
              <FormControl fullWidth>
                <InputLabel id="session-type">Session Type</InputLabel>
                <Select
                  labelId="session-type"
                  name="session_type"
                  value={stepData.session_type}
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
              <Typography variant="body2">Session Duration</Typography>
              <Stack direction="row" spacing={1}>
                <FormControl fullWidth>
                  <InputLabel id="session-hours">Hours</InputLabel>
                  <Select
                    labelId="session-hours"
                    name="hours"
                    value={stepData.hours}
                    label="Hours"
                    onChange={handleSelectChange}
                  >
                    {HOURS.map((duration, index) => (
                      <MenuItem key={`h-${index}`} value={duration}>
                        {duration} hour{duration === 1 ? "" : "s"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="session-minutes">Minutes</InputLabel>
                  <Select
                    labelId="session-minutes"
                    name="minutes"
                    value={stepData.minutes}
                    label="Minutes"
                    onChange={handleSelectChange}
                  >
                    {MINUTES.map((duration, index) => (
                      <MenuItem key={`m-${index}`} value={duration}>
                        {duration} minute{duration === 1 ? "" : "s"}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button size="large" color="error" onClick={() => history.goBack()}>
                Cancel
              </Button>
              <Button size="large" onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
};

export default AddLiveSessionStepPage;
