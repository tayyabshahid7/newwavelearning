import React, { useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
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
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const AddCohortPage = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [programme, setProgramme] = useState<string>("");
  const [facilitator, setFacilitator] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === "programme") {
      setProgramme(event.target.value as string);
    } else if (event.target.name === "facilitator") {
      setFacilitator(event.target.value as string);
    }
  };

  const handleAddCohort = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("SUBMITTED");
      setLoading(false);
    }, 3000);
  };
  return (
    <>
      <DashboardLayout selectedPage={"cohorts"}>
        <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography variant="h4" sx={{ marginBottom: "50px" }}>
          Add Cohort
        </Typography>
        <form onSubmit={handleAddCohort}>
          <Grid container component={Paper}>
            <Grid item xs={6}>
              <Stack
                spacing={{ xs: 5 }}
                sx={{ maxWidth: "500px", m: "auto", p: 5 }}
                component={Paper}
              >
                <TextField id="name" label="Cohort Name" type="name" fullWidth size="small" />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={newValue => setStartDate(newValue)}
                        renderInput={params => <TextField size="small" {...params} />}
                        showTodayButton
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Start Date"
                        value={endDate}
                        onChange={newValue => setEndDate(newValue)}
                        renderInput={params => <TextField size="small" {...params} />}
                        showTodayButton
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <FormControl fullWidth size="small">
                  <InputLabel id="programme-label">Cohort Status</InputLabel>
                  <Select
                    labelId="programme-label"
                    id="programme"
                    name="programme"
                    label="Programme"
                    value={programme}
                    onChange={handleChange}
                  >
                    <MenuItem value="1">Programm Ten</MenuItem>
                    <MenuItem value="2">Program Twenty</MenuItem>
                    <MenuItem value="3">Program Thirty</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel id="facilitator-label">Facilitator</InputLabel>
                  <Select
                    labelId="facilitator-label"
                    id="facilitator"
                    name="facilitator"
                    label="Facilitator"
                    value={facilitator}
                    onChange={handleChange}
                  >
                    <MenuItem value="1">Facilitator Ten</MenuItem>
                    <MenuItem value="2">Facilitator Twenty</MenuItem>
                    <MenuItem value="3">Facilitator Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ pr: 5, pb: 5, textAlign: "right" }}>
              <Button size="large" onClick={handleAddCohort} disabled={loading}>
                Programme details
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardLayout>
    </>
  );
};

export default AddCohortPage;
