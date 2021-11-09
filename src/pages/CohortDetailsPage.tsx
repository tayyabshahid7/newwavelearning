import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router";
import { getCohortDetails } from "../services/common";
import CohortSessionsTable from "../components/CohortSessionsTable";
import CohortLearnersTable from "../components/CohortLearnersTable";
import { Box } from "@mui/system";
import CohortEditDialog from "../components/CohortEditDialog";
import AddLearnerDialog from "../components/AddLearnerDialog";

const dummyLearners = [
  {
    id: 1,
    name: "Learner 1",
    completion: "3/15",
    time: "2hrs 32mins",
    last_login: "July 19, 20201, 6:20pm",
  },
  {
    id: 2,
    name: "Learner 1",
    completion: "3/15",
    time: "2hrs 32mins",
    last_login: "July 19, 20201, 6:20pm",
  },
  {
    id: 3,
    name: "Learner 1",
    completion: "3/15",
    time: "2hrs 32mins",
    last_login: "July 19, 20201, 6:20pm",
  },
  {
    id: 4,
    name: "Learner 1",
    completion: "3/15",
    time: "2hrs 32mins",
    last_login: "July 19, 20201, 6:20pm",
  },
  {
    id: 5,
    name: "Learner 1",
    completion: "3/15",
    time: "2hrs 32mins",
    last_login: "July 19, 20201, 6:20pm",
  },
];

interface CohortPageParams {
  cohortId: string;
}

const CohortDetailsPage = () => {
  const { cohortId } = useParams<CohortPageParams>();
  const [cohort, setCohort] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [learnerDialogOpen, setLearnerDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCohortData = async () => {
      setLoading(true);
      try {
        const response = await getCohortDetails(cohortId);
        setCohort(response.data);
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
    // TODO: Ser newly created learners using learners variable
    console.log(newLearners);
    setLearnerDialogOpen(false);
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
                <Button>Download CSV</Button>
                <Button onClick={() => setLearnerDialogOpen(true)}>Add new learner</Button>
              </Stack>
            </>
            <CohortLearnersTable learners={dummyLearners} />
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
