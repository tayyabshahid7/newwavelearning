import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { EditCohort, getAllProgrammesList, getFacilitators } from "../../services/common";
import { format, parse } from "date-fns";

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

interface CohortEditDialogProps {
  open: boolean;
  cohort: any;
  editCallback: (editedCohort: any) => any;
  cancelEditCallback: () => any;
}

const CohortEditDialog = ({
  open,
  cohort,
  editCallback,
  cancelEditCallback,
}: CohortEditDialogProps) => {
  const [name, setName] = useState<string>(cohort.name);
  const [programme, setProgramme] = useState<string>(cohort.programme);
  const [facilitator, setFacilitator] = useState<string>(cohort.facilitator);
  const [startDate, setStartDate] = useState<Date | null>(
    parse(cohort.start_date, "dd/MM/yyyy", new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(
    parse(cohort.end_date, "dd/MM/yyyy", new Date())
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [programmeList, setProgrammeList] = useState<any>(null);
  const [facilitatorList, setFacilitatorList] = useState<any>(null);
  const [validationFields, setValidationFields] = useState<any>(initialErrors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getAllProgrammesList();
        setProgrammeList(response.data);
        response = await getFacilitators();
        setFacilitatorList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (open) {
      fetchData();
    }
  }, [cohort, open]);

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
  const handleEditCohort = async (e: React.FormEvent) => {
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
        const response = await EditCohort(cohort.id, formData);
        editCallback(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Edit Cohort</DialogTitle>
      <DialogContent>
        <form onSubmit={handleEditCohort}>
          <Stack spacing={2} sx={{ p: 2 }}>
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
              <Stack direction="row" spacing={1}>
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

                <DatePicker
                  label="End Date"
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
              </Stack>
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          color="error"
          variant="text"
          onClick={cancelEditCallback}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button onClick={handleEditCohort} disabled={loading}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CohortEditDialog;
