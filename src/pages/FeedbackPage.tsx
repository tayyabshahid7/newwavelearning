import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import { getFeedbackFiltersData, getFilteredFeedbackList } from "services/common";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState<any>([]);
  const [cohortList, setCohortList] = useState<any>([]);
  const [learnerList, setLearnerList] = useState<any>([]);
  const [allLearners, setAllLearners] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    cohortId: "0",
    learnerId: "0",
  });
  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await getFilteredFeedbackList(filters.cohortId, filters.learnerId);
        setFeedbackList(response.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchFeedbackData();
  }, [filters]);

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const response = (await getFeedbackFiltersData()) as any;
        setCohortList(response.cohorts);
        setLearnerList(response.learners);
        setAllLearners(response.learners);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchFilterData();
  }, []);

  const handleCohortFilterChange = (event: SelectChangeEvent) => {
    if (event.target.value === "0") {
      setLearnerList(allLearners);
    } else {
      const newLearnerList = allLearners.filter(
        (learner: any) => learner.cohort_id === event.target.value
      );
      setLearnerList(newLearnerList);
    }
    setFilters({ ...filters, cohortId: event.target.value });
  };

  const handleLearnerFilterChange = (event: SelectChangeEvent) => {
    setFilters({ ...filters, learnerId: event.target.value });
  };

  return (
    <DashboardLayout selectedPage={"feedback"}>
      <Typography variant="h2">Feedback</Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={3}>
          <FormControl fullWidth>
            <InputLabel id="select-cohort-label">Cohort</InputLabel>
            <Select
              labelId="select-cohort-label"
              id="select-cohort"
              value={filters.cohortId}
              label="Cohort"
              onChange={handleCohortFilterChange}
            >
              <MenuItem value={"0"}>All</MenuItem>
              {cohortList.map((cohort: any) => (
                <MenuItem key={cohort.cid} value={cohort.cid}>
                  {cohort.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="select-learner-label">Learner</InputLabel>
            <Select
              labelId="select-learner-label"
              id="select-learner"
              value={filters.learnerId}
              label="Learner"
              onChange={handleLearnerFilterChange}
            >
              <MenuItem value={"0"}>All</MenuItem>
              {learnerList.map((learner: any) => (
                <MenuItem key={learner.id} value={learner.id}>
                  {learner.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Cohort</TableCell>
                <TableCell>Question type</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList.map((feedback: any) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.learner}</TableCell>
                  <TableCell>{feedback.cohort_name}</TableCell>
                  <TableCell>{feedback.step_type}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent={"end"} spacing={2}>
                      <Button variant="text">More Info</Button>
                      <Button>Feedback</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </DashboardLayout>
  );
};

export default FeedbackPage;
