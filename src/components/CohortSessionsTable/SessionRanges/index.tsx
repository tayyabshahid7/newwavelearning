import React, { useEffect, useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Session } from "../../../common/types";
import { format, parse } from "date-fns";
import { SaveLiveSession } from "../../../services/common";
import es from "date-fns/esm/locale/es/index.js";

interface SessionRagesProps {
  session: Session;
}

const SessionRanges = ({ session }: SessionRagesProps) => {
  const [addEditRange, setAddEditRange] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [range, setRange] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>();
  const [validationFields, setValidationFields] = useState<any>({
    startDate: { error: false, message: "" },
    endDate: { error: false, message: "" },
  });

  useEffect(() => {
    if (session.start_time !== null) {
      setStartDate(parse(session.start_time, "yyyy-MM-dd", new Date()));
    }
    if (session.end_time !== null) {
      setEndDate(parse(session.end_time, "yyyy-MM-dd", new Date()));
    }
    if (session.start_time && session.end_time) {
      const st = parse(session.start_time, "yyyy-MM-dd", new Date());
      const et = parse(session.end_time, "yyyy-MM-dd", new Date());
      setRange(`${format(st, "dd/MM/yyyy")} - ${format(et, "dd/MM/yyyy")}`);
    } else {
      setRange(null);
    }
  }, [session]);

  const handleSaveRangeChanges = () => {
    if (!startDate) {
      setValidationFields({
        validationFields,
        startDate: { error: true, message: "This field must not be empty" },
      });
    } else if (!endDate) {
      setValidationFields({
        validationFields,
        endDate: { error: true, message: "This field must not be empty" },
      });
    }
    if (startDate && endDate) {
      const data = {
        start_time: format(startDate, "yyyy-MM-dd"),
        end_time: format(endDate, "yyyy-MM-dd"),
      };
      SaveLiveSession(session.id, data);
      setRange(`${format(startDate, "dd/MM/yyyy")} - ${format(endDate, "dd/MM/yyyy")}`);
      setAddEditRange(false);
    }
  };

  const handleCancelRangeChanges = () => {
    setStartDate(parse(session.start_time, "yyyy-MM-dd", new Date()));
    setEndDate(parse(session.end_time, "yyyy-MM-dd", new Date()));
    setValidationFields({
      startDate: { error: false, message: "" },
      endDate: { error: false, message: "" },
    });
    setAddEditRange(false);
  };

  const handleEndDateChange = (newDate: Date | null) => {
    if (validationFields.startDate?.error || validationFields.endDate?.error) {
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

  console.log(startDate, endDate);

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
              error={validationFields.startDate?.error}
              helperText={validationFields.startDate?.error && validationFields.startDate?.message}
            />
          )}
        />

        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          inputFormat="dd/MM/yyyy"
          showTodayButton
          renderInput={params => (
            <TextField
              size="small"
              {...params}
              error={validationFields.endDate?.error}
              helperText={validationFields.endDate?.error && validationFields.endDate?.message}
            />
          )}
        />
      </LocalizationProvider>
      <Button variant="text" onClick={handleSaveRangeChanges}>
        Save Changes
      </Button>
      <Button variant="text" color="error" onClick={handleCancelRangeChanges}>
        Cancel
      </Button>
    </Stack>
  ) : (
    <Stack direction="row" alignItems="center">
      {range && <Typography>{range}</Typography>}
      <Button variant="text" onClick={handleAddEditRange}>
        {range ? "Edit range" : "Add range"}
      </Button>
    </Stack>
  );
};

export default SessionRanges;
