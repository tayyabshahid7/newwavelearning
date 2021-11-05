import React, { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Session } from "../../../common/types";

interface SessionRagesProps {
  session: Session;
}

const SessionRanges = ({ session }: SessionRagesProps) => {
  const [addEditRange, setAddEditRange] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [validationFields, setValidationFields] = useState<any>({
    startDate: { error: false, message: "" },
    endDate: { error: false, message: "" },
  });

  const handleSaveRangeChanges = () => {
    debugger;
    if (startDate && endDate) {
      session.range = `${startDate} - ${endDate}`;
    } else {
      session.range = null;
    }
    setAddEditRange(false);
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

  const handleAddEditRange = () => {
    
    setAddEditRange(true);
  };

  return addEditRange ? (
    <Stack direction="row">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          inputFormat="dd/MM/yyyy"
          showTodayButton
          renderInput={params => (
            <TextField
              size="small"
              {...params}
              error={validationFields.startDate.error}
              helperText={validationFields.startDate.error && validationFields.startDate.message}
            />
          )}
        />

        <DatePicker
          label="Start Date"
          value={endDate}
          onChange={handleEndDateChange}
          inputFormat="dd/MM/yyyy"
          showTodayButton
          renderInput={params => (
            <TextField
              size="small"
              {...params}
              error={validationFields.endDate.error}
              helperText={validationFields.endDate.error && validationFields.endDate.message}
            />
          )}
        />
      </LocalizationProvider>
      <Button variant="text" onClick={handleSaveRangeChanges}>
        Save Changes
      </Button>
      <Button
        variant="text"
        color="error"
        onClick={() => {
          setEndDate(null);
          setStartDate(null);
          setAddEditRange(false);
        }}
      >
        Cancel
      </Button>
    </Stack>
  ) : (
    <Stack direction="row">
      {session.range && <Typography>{session.range}</Typography>}
      <Button variant="text" onClick={handleAddEditRange}>
        {session.range ? "Edit range" : "Add range"}
      </Button>
    </Stack>
  );
};

export default SessionRanges;
