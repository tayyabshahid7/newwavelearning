import React, { BaseSyntheticEvent, useEffect, useState } from "react";
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
import { useHistory, useParams } from "react-router";
import { editStep, getStepDetails } from "services/common";
import { EditStepParams } from "common/types";

const EditLiveSessionStepPage = () => {
  const history = useHistory();
  const { stepId } = useParams<EditStepParams>();
  const [stepData, setStepData] = useState<any>({
    title: "",
    description: "",
    session_type: "",
    session_duration: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStepData = async () => {
      setLoading(true);
      try {
        const response = await getStepDetails(stepId);
        setStepData({
          title: response.fields.title,
          description: response.fields.description,
          session_type: response.fields.session_type,
          session_duration: response.fields.session_duration,
        });
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchStepData();
  }, [stepId]);

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
      data.append("fields", JSON.stringify(stepData));
      await editStep(stepId, data);
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
            <Typography variant="h4">Edit Live Session</Typography>
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
              <FormControl fullWidth>
                <InputLabel id="session-duration">Session Duration</InputLabel>
                <Select
                  labelId="session-duration"
                  name="session_duration"
                  value={stepData.session_duration}
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

export default EditLiveSessionStepPage;
