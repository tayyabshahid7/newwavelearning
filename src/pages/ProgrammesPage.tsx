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
  TableRow,
} from "@mui/material";
import { getProgrammes, deleteProgramme } from "services/common";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProgrammes();
        setProgrammes(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const openDeletePrompt = (programme: any) => {
    setDialog({
      open: true,
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
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar(error.response?.data.detail, { variant: "warning" });
    }
    setDialog({ ...dialog, open: false });
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
                      onClick={() => openDeletePrompt(programme)}
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
      </Stack>
      <PromptDialog
        open={dialog.open}
        title="Are you sure you would like to delete the following programme?"
        content={`Programme: ${dialog.programme?.name}`}
        okButtonText="Yes"
        cancelButtonText="No"
        confirmCallback={handleDeleteProgramme}
        closeCallback={() => setDialog({ ...dialog, open: false })}
      />
    </DashboardLayout>
  );
};

export default ProgrammesPage;
