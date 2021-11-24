import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import { useParams } from "react-router";
import CohortSessionsTable from "components/CohortSessionsTable";
import CohortLearnersTable from "components/CohortLearnersTable";
import { Box } from "@mui/system";
import CohortEditDialog from "components/CohortEditDialog";
import AddLearnerDialog from "components/AddLearnerDialog";
import { CSVDownload } from "react-csv";
import { deleteLearner, getCohortDetails, getCohortLearners } from "services/common";
import { Learner } from "common/types";

interface CohortPageParams {
  cohortId: string;
}

const CohortDetailsPage = () => {
  const { cohortId } = useParams<CohortPageParams>();
  const [cohort, setCohort] = useState<any>(null);
  const [learners, setLearners] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [learnerDialogOpen, setLearnerDialogOpen] = useState<boolean>(false);
  const [downloadLearnersCSV, setDownloadLearnersCSV] = useState<boolean>(false);
  const [learnersCsvData, setLearnersCsvData] = useState<any>(null);

  useEffect(() => {
    const fetchCohortData = async () => {
      setLoading(true);
      try {
        const cohortDetails = await getCohortDetails(cohortId);
        const learnersList = await getCohortLearners(cohortId);
        setCohort(cohortDetails.data);
        setLearners(learnersList);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchCohortData();
  }, [cohortId]);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleEditCohort = async (editedCohort: any) => {
    setCohort(editedCohort);
    setEditDialogOpen(false);
  };

  const handleAddLearners = (newLearners: any) => {
    setLearners(newLearners);
    setLearnerDialogOpen(false);
  };

  const handleLearnerDelete = async (learnerId: number) => {
    try {
      await deleteLearner(learnerId);
      const newLearners = learners.filter((l: any) => l.id !== learnerId);
      setLearners(newLearners);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadLearnersCSV = () => {
    let data = learners.map((learner: Learner, i: number) => [
      learner.email,
      learner.first_name,
      learner.last_name,
    ]);
    data = [["email", "first Name", "last name"], ...data];
    setLearnersCsvData(data);
    setDownloadLearnersCSV(true);
    setTimeout(setDownloadLearnersCSV, 100, false);
  };

  return (
    <DashboardLayout selectedPage={"cohorts"} loading={loading}>
      {cohort && (
        <>
          <Stack spacing={3}>
            <Typography variant="h4">Cohort details</Typography>
            <Grid sx={{ m: 0, p: 2 }} container component={Paper}>
              <Grid item container xs={6}>
                <List dense>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Cohort:
                      </Box>
                      <Box sx={{ ml: 2 }}>{cohort.name}</Box>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Programme:
                      </Box>
                      <Box sx={{ ml: 2 }}>{cohort.programme_name}</Box>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Facilitator:
                      </Box>
                      <Box sx={{ ml: 2 }}>{cohort.facilitator_name}</Box>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Start Date:
                      </Box>
                      <Box sx={{ ml: 2 }}>{cohort.start_date}</Box>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Start End:
                      </Box>
                      <Box sx={{ ml: 2 }}>{cohort.end_date}</Box>
                    </Stack>
                  </ListItem>
                </List>
              </Grid>
              <Grid item sx={{ pr: 2, textAlign: "right" }} xs={6}>
                <Button onClick={handleOpenEditDialog}>Edit Cohort</Button>
              </Grid>
            </Grid>
            <Divider />
            <CohortSessionsTable sessions={cohort.live_sessions} />
            <Divider />
            <>
              <Typography variant="h5">Learners</Typography>
              <Stack justifyContent="flex-end" direction="row" spacing={3}>
                {downloadLearnersCSV && <CSVDownload data={learnersCsvData} target="_blank" />}
                <Button onClick={handleDownloadLearnersCSV}>Download CSV</Button>
                <Button onClick={() => setLearnerDialogOpen(true)}>Add new learner</Button>
              </Stack>
            </>
            <CohortLearnersTable learners={learners} onDelete={handleLearnerDelete} />
          </Stack>
          <CohortEditDialog
            open={editDialogOpen}
            cohort={cohort}
            editCallback={handleEditCohort}
            cancelEditCallback={() => setEditDialogOpen(false)}
          />
          <AddLearnerDialog
            open={learnerDialogOpen}
            cohortId={cohort.id}
            cancelCallback={() => setLearnerDialogOpen(false)}
            uploadFinishedCallback={handleAddLearners}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default CohortDetailsPage;
