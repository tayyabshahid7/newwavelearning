import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
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
import { AddCohort, getFacilitators, getProgrammes } from "../services/common";
import { format } from "date-fns";
import { useHistory } from "react-router";

const initialErrors = {
  name: {
    error: false,
    message: "",
  },
  startDate: {
    error: false,
    message: "",
  },
  endDate: {
    error: false,
    message: "",
  },
  programme: {
    error: false,
    message: "",
  },
  facilitator: {
    error: false,
    message: "",
  },
};

const AddCohortPage = () => {
  const history = useHistory();
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [programme, setProgramme] = useState<string>("");
  const [facilitator, setFacilitator] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [programmeList, setProgrammeList] = useState<any>(null);
  const [facilitatorList, setFacilitatorList] = useState<any>(null);
  const [validationFields, setValidationFields] = useState<any>(initialErrors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammes();
        setProgrammeList(response.data.results);
      } catch (error) {
        console.log(error);
      }

      try {
        const response = await getFacilitators();
        setFacilitatorList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === "programme") {
      if (validationFields.programme.error) {
        setValidationFields({ ...validationFields, programme: { error: false, message: "" } });
      }
      setProgramme(event.target.value as string);
    } else if (event.target.name === "facilitator") {
      if (validationFields.facilitator.error) {
        setValidationFields({ ...validationFields, facilitator: { error: false, message: "" } });
      }
      setFacilitator(event.target.value as string);
    }
  };

  const handleStartDateChange = (newDate: Date | null) => {
    if (validationFields.startDate.error || validationFields.endDate.error) {
      setValidationFields({
        ...validationFields,
        startDate: { error: false, message: "" },
        endDate: { error: false, message: "" },
      });
    }
    setStartDate(newDate);
  };
  const handleEndDateChange = (newDate: Date | null) => {
    if (validationFields.startDate.error || validationFields.endDate.error) {
      setValidationFields({
        ...validationFields,
        startDate: { error: false, message: "" },
        endDate: { error: false, message: "" },
      });
    }
    setEndDate(newDate);
  };

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
    if (startDate === null) {
      setValidationFields({
        ...validationFields,
        startDate: { error: true, message: "This field is required" },
      });

      return false;
    }
    if (endDate === null) {
      setValidationFields({
        ...validationFields,
        endDate: { error: true, message: "This field is required" },
      });
      return false;
    }
    if (startDate && endDate && startDate > endDate) {
      setValidationFields({
        ...validationFields,
        startDate: { error: true, message: "Start date must be less than End date" },
      });
      return false;
    }
    if (programme === "") {
      setValidationFields({
        ...validationFields,
        programme: { error: true, message: "This field is required" },
      });
      return false;
    }
    if (facilitator === "") {
      setValidationFields({
        ...validationFields,
        facilitator: { error: true, message: "This field is required" },
      });
      return false;
    }
    // If nothing wrong
    return true;
  };
  const handleAddCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isFormValid()) {
      const formData = {
        name: name,
        start_date: format(startDate as Date, "yyyy-MM-dd"),
        end_date: format(endDate as Date, "yyyy-MM-dd"),
        programme: programme,
        facilitator: facilitator,
      };
      try {
        await AddCohort(formData);
        history.push("/cohorts");
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
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
                <TextField
                  name="name"
                  label="Cohort Name"
                  onChange={handleNameChange}
                  value={name}
                  fullWidth
                  size="small"
                  error={validationFields.name.error}
                  helperText={validationFields.name.error && validationFields.name.message}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={5}>
                      <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        inputFormat="dd/MM/yyyy"
                        renderInput={params => (
                          <TextField
                            size="small"
                            {...params}
                            error={validationFields.startDate.error}
                            helperText={
                              validationFields.startDate.error && validationFields.startDate.message
                            }
                          />
                        )}
                        showTodayButton
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Start Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        inputFormat="dd/MM/yyyy"
                        renderInput={params => (
                          <TextField
                            size="small"
                            {...params}
                            error={validationFields.endDate.error}
                            helperText={
                              validationFields.endDate.error && validationFields.endDate.message
                            }
                          />
                        )}
                        showTodayButton
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <FormControl fullWidth size="small" error={validationFields.programme.error}>
                  <InputLabel id="programme-label">Programme</InputLabel>
                  <Select
                    labelId="programme-label"
                    id="programme"
                    name="programme"
                    label="Programme"
                    value={programme}
                    onChange={handleChange}
                  >
                    {programmeList?.map((p: any) => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {validationFields.programme.error && (
                    <FormHelperText>{validationFields.programme.message}</FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth size="small" error={validationFields.facilitator.error}>
                  <InputLabel id="facilitator-label">Facilitator</InputLabel>
                  <Select
                    labelId="facilitator-label"
                    id="facilitator"
                    name="facilitator"
                    label="Facilitator"
                    value={facilitator}
                    onChange={handleChange}
                    error={validationFields.facilitator.error}
                  >
                    {facilitatorList?.map((f: any) => (
                      <MenuItem key={f.id} value={f.id}>
                        {f.full_name}
                      </MenuItem>
                    ))}
                  </Select>
                  {validationFields.facilitator.error && (
                    <FormHelperText>{validationFields.facilitator.message}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ pr: 5, pb: 5, textAlign: "right" }}>
              <Button size="large" onClick={handleAddCohort} disabled={loading}>
                Add Cohort
              </Button>
            </Grid>
          </Grid>
        </form>
      </DashboardLayout>
    </>
  );
};

export default AddCohortPage;
