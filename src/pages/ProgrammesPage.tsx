import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import DashboardLayout from "../components/DashboardLayout";
import { useHistory } from "react-router";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { getProgrammes, deleteProgramme, duplicateProgramme } from "services/common";
import PromptDialog from "components/PromptDialog";
import { useSnackbar } from "notistack";

const ProgrammesPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [programmes, setProgrammes] = useState<any>(null);
  const [dialog, setDialog] = useState<any>({
    open: false,
    programme: null,
  });
  const [pagination, setPagination] = useState<any>({
    current: 0,
    next: null,
    previous: null,
    count: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammes();
        setProgrammes(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          current: 0,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const openPropmt = (programme: any, action = "") => {
    setDialog({
      open: action,
      programme: programme,
    });
  };

  const handleDeleteProgramme = async () => {
    try {
      await deleteProgramme(dialog.programme.id);
      const newProgrammes = programmes.filter(
        (programme: any) => programme.id !== dialog.programme.id
      );
      setProgrammes(newProgrammes);
      setPagination({ ...pagination, count: pagination.count - 1 });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response?.data.detail, { variant: "warning" });
    }
    setDialog({ ...dialog, open: false });
  };

  const handleDuplicateProgramme = async () => {
    try {
      const newProgramme = await duplicateProgramme(dialog.programme.id);
      setProgrammes([...programmes, newProgramme]);
      setPagination({ ...pagination, count: pagination.count + 1 });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response?.data.detail, { variant: "error" });
    }
    setDialog({ ...dialog, open: false });
  };

  const handlePageChange = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => {
    try {
      let response = null;
      if (page > pagination.current) {
        response = await getProgrammes(pagination.next);
      } else if (page < pagination.current) {
        response = await getProgrammes(pagination.previous);
      }
      if (response !== null) {
        setProgrammes(response.data.results);
        setPagination({
          count: response.data.count,
          next: response.data.next,
          previous: response.data.previous,
          current: page,
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <DashboardLayout selectedPage={"programmes"}>
      <Stack spacing={2}>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">Programmes</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button size="large" onClick={() => history.push("/programmes/add")}>
              Add Programme
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "20px 0" }} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Programme</TableCell>
                <TableCell align="left">Cohorts</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {programmes?.map((programme: any, i: number) => (
                <TableRow key={programme.id}>
                  <TableCell>#{i + 1}</TableCell>
                  <TableCell>{programme.name}</TableCell>
                  <TableCell>
                    {programme.cohorts} cohort{programme.cohorts !== 1 && "s"}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      sx={{ mr: 5 }}
                      onClick={() => history.push(`/programmes/${programme.id}`)}
                    >
                      View Programme
                    </Button>
                    <Button
                      onClick={() => openPropmt(programme, "duplicate")}
                      variant="text"
                      sx={{ mr: 5 }}
                    >
                      Duplicate
                    </Button>
                    <Button
                      onClick={() => openPropmt(programme, "delete")}
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
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={pagination.count}
          onPageChange={handlePageChange}
          page={pagination.current}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
        />
      </Stack>
      <PromptDialog
        open={dialog.open === "delete"}
        title="Are you sure you would like to delete the following programme?"
        content={`Programme: ${dialog.programme?.name}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleDeleteProgramme}
        closeCallback={() => setDialog({ ...dialog, open: false })}
      />
      <PromptDialog
        open={dialog.open === "duplicate"}
        title="Are you sure you would like to duplicate the following programme? (Cohorts will not be copied)"
        content={`Programme: ${dialog.programme?.name}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleDuplicateProgramme}
        closeCallback={() => setDialog({ ...dialog, open: false })}
      />
    </DashboardLayout>
  );
};

export default ProgrammesPage;
