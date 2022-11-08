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
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router";
import DashboardLayout from "../components/DashboardLayout";
import PromptDialog from "../components/PromptDialog";
import { deleteCohort, getCohorts } from "../services/common";

interface CohortsPageProps {
  history1: RouteComponentProps["history"];
}

const CohortsPage = ({ history1 }: CohortsPageProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [cohortStatus, setCohortStatus] = useState("all");
  const [loading, setLoading] = useState<boolean>(false);
  const [cohortList, setCohortList] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [dialog, setDialog] = useState<any>({
    open: false,
    cohort: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getCohorts();
        setCohortList(response.data.results);
        delete response.data.results;
        setPagination({ ...response.data, page: 0 });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    let pageUrl = null;
    if (newPage > pagination.page) {
      pageUrl = pagination.next;
    } else if (newPage < pagination.page) {
      pageUrl = pagination.previous;
    }

    try {
      const response = await getCohorts(pageUrl);
      setCohortList(response.data.results);
      delete response.data.results;
      setPagination({ ...response.data, page: newPage });
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (event: SelectChangeEvent) => {
    const newStatus = event.target.value as string;
    try {
      let pageUrl = `/cohorts/?search=${newStatus}`;
      const response = await getCohorts(pageUrl);
      setCohortList(response.data.results);
      delete response.data.results;
      setPagination({ ...response.data, page: 0 });
      setCohortStatus(newStatus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCohort = (cohort: any) => {
    setDialog({
      open: true,
      cohort: cohort,
    });
  };

  const deleteCohortCallback = async (cohortId: number) => {
    setLoading(true);
    try {
      await deleteCohort(cohortId);
      const newCohortList = cohortList.filter((cohort: any) => cohort.id !== cohortId);
      setCohortList(newCohortList);
      setPagination({ ...pagination, count: pagination.count - 1 });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response?.data.detail, { variant: "error" });
    }
    setLoading(false);
    setDialog({ ...dialog, open: false });
  };

  return (
    <DashboardLayout selectedPage={"cohorts"} loading={loading}>
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
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="live">Live</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Cohort</TableCell>
              <TableCell align="left">Average Steps Completed</TableCell>
              <TableCell align="left">Learners</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohortList?.map((cohort: any, i: number) => (
              <TableRow key={cohort.id}>
                <TableCell align="center">
                  <b>#{i + 1}</b>
                </TableCell>
                <TableCell>{cohort.name}</TableCell>
                <TableCell>{cohort.average_steps_completed}</TableCell>
                <TableCell>
                  {cohort.learners_count} learner{cohort.learners_count !== 1 && "s"}
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    sx={{ mr: 5 }}
                    onClick={() => history.push(`/cohorts/${cohort.id}`)}
                  >
                    View cohort
                  </Button>
                  <Button
                    onClick={() => handleDeleteCohort(cohort)}
                    variant="text"
                    color="error"
                    sx={{ mr: 5 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={pagination?.count || 0}
                page={pagination?.page || 0}
                rowsPerPage={10}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <PromptDialog
        open={dialog.open}
        title="Are you sure you would like to delete the following cohort?"
        content={`Cohort: ${dialog.cohort?.name}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={() => deleteCohortCallback(dialog.cohort.id)}
        closeCallback={() => setDialog({ ...dialog, open: false })}
      />
    </DashboardLayout>
  );
};

export default CohortsPage;
