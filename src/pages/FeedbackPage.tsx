import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import {
  filterUserByEmail,
  getAllProgrammesList,
  getFacilitators,
  getFacilitatorUsers,
  getFeedbackFiltersData,
  getFilteredFeedbackList,
  getUsers,
} from "services/common";
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
  TextField,
} from "@mui/material";
import AddFeedbackDialog from "components/AddFeedbackDialog";
import { Feedback } from "common/types";
import { Warning } from "@mui/icons-material";
import { getUser } from "../services/auth";

const FeedbackPage = () => {
  const [dialog, setDialog] = useState<any>({
    open: false,
    feedback: null,
  });
  const [facilitatorList, setFacilitatorList] = useState<any>(null);
  const [feedbackList, setFeedbackList] = useState<any>([]);
  const [cohortList, setCohortList] = useState<any>([]);
  const [learnerList, setLearnerList] = useState<any>([]);
  const [allLearners, setAllLearners] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    cohortId: "0",
    learnerId: "0",
  });

  const user = getUser();
  const [email, setEmail] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFacilitators();
        setFacilitatorList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  const openFeedbackDialog = (feedback: any) => {
    setDialog({ feedback: feedback, open: true });
  };

  const handleCloseFeedbackDialog = (
    confirm: boolean = false,
    addedFeedback: Feedback | null = null
  ) => {
    if (confirm && addedFeedback !== null) {
      const oldFeedback = feedbackList.find((f: any) => f.id === addedFeedback.id);
      const newFeedback = Object.assign(oldFeedback, addedFeedback);
      const newFeedbackList = [...feedbackList];
      newFeedbackList.splice(
        feedbackList.findIndex((f: any) => f.id === addedFeedback.id),
        1,
        newFeedback
      );
      setFeedbackList(newFeedbackList);
    }
    setDialog({ ...dialog, open: false });
  };

  const handleSearchUser = async (event: any) => {
    event.preventDefault();
    try {
      const response: any = await filterUserByEmail(email);
      setFeedbackList(response.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleTextChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleFacilitatorFilterChange = async (event: any) => {
    event.preventDefault();
    try {
      const response: any = await getFacilitatorUsers(event.target.value);
      setFeedbackList(response.data);
    } catch (error: any) {
      console.log(error);
    }
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
          {user.role === "admin" ? (
            <>
              <form onSubmit={handleSearchUser} style={{ width: "100%" }}>
                <TextField
                  onChange={handleTextChange}
                  value={filters.searchText}
                  label="Search"
                  fullWidth
                />
              </form>
              <FormControl fullWidth>
                <InputLabel id="select-learner-label">Facilitator</InputLabel>
                <Select
                  labelId="select-facilitator-label"
                  id="select-facilitator"
                  label="All"
                  onChange={handleFacilitatorFilterChange}
                >
                  <MenuItem value={"0"}>All</MenuItem>
                  {facilitatorList &&
                    facilitatorList.map((item: any) => (
                      <MenuItem key={item.id} value={item.email}>
                        {item.email}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          ) : (
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
                    {learner.email} [{learner.cohort_name}]
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Cohort</TableCell>
                <TableCell>Question type</TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {feedbackList.map((feedback: any) => (
                <TableRow key={feedback.id}>
                  <TableCell>{feedback.learner}</TableCell>
                  <TableCell>{feedback.cohort_name}</TableCell>
                  <TableCell>{feedback.step_type}</TableCell>
                  <TableCell>
                    {!feedback.done && (
                      <Stack direction="row" spacing={1}>
                        <Warning sx={{ color: "#FD773B" }} />
                        <Typography>Feedback needed</Typography>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent={"end"} spacing={2}>
                      {feedback.done ? (
                        <Button variant="text" onClick={() => openFeedbackDialog(feedback)}>
                          Edit Feedback
                        </Button>
                      ) : (
                        <Button onClick={() => openFeedbackDialog(feedback)}>Feedback</Button>
                      )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <AddFeedbackDialog
        open={dialog.open}
        feedback={dialog.feedback}
        closeCallback={handleCloseFeedbackDialog}
      />
    </DashboardLayout>
  );
};

export default FeedbackPage;
