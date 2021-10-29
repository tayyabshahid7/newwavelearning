import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";

interface CohortsPageProps {
  history: RouteComponentProps["history"];
}

const CohortsPage = ({ history }: CohortsPageProps) => {
  const [cohortStatus, setEmail] = useState("All");

  const handleChange = (event: SelectChangeEvent) => {
    setEmail(event.target.value as string);
  };

  const cohortsData = [
    { id: 1, name: "EY1", learners_count: 12, status: "1" },
    { id: 1, name: "EY1", learners_count: 12, status: "1" },
    { id: 1, name: "EY1", learners_count: 12, status: "1" },
    { id: 1, name: "EY1", learners_count: 12, status: "1" },
    { id: 1, name: "EY1", learners_count: 12, status: "1" },
  ];

  return (
    <DashboardLayout selectedPage={"cohorts"}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4">Cohorts</Typography>
        </Grid>
        <Grid item xs={6} textAlign="right">
          <Button size="large" onClick={() => history.push("/cohorts/add")}>
            Add Cohort
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ margin: "20px 0" }} />
      <Grid container>
        <Grid item xs={3}>
          <FormControl fullWidth size="small">
            <InputLabel id="cohort-status-level">Cohort Status</InputLabel>
            <Select
              labelId="cohort-status-level"
              id="cohort-status-select"
              label="Cohort Status"
              value={cohortStatus}
              onChange={handleChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1">Ten</MenuItem>
              <MenuItem value="2">Twenty</MenuItem>
              <MenuItem value="3">Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <caption>&nbsp;{/*Used to add the space at the bottom of the table*/}</caption>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Cohort</TableCell>
              <TableCell align="left">Learners</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohortsData.map((cohort, i) => (
              <TableRow key={cohort.name + i}>
                <TableCell align="center">
                  <b>#{i + 1}</b>
                </TableCell>
                <TableCell>{cohort.name}</TableCell>
                <TableCell>
                  {cohort.learners_count} learner{cohort.learners_count > 1 ? "s" : ""}
                </TableCell>
                <TableCell align="center">{cohort.status}</TableCell>
                <TableCell align="right">
                  <Button size="small" sx={{ mr: 5 }}>
                    View cohort
                  </Button>
                  <Button variant="text" color="error" sx={{ mr: 5 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardLayout>
  );
};

export default CohortsPage;
