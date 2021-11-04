import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import DashboardLayout from "../components/DashboardLayout";
import { useParams } from "react-router";
import { getCohortDetails } from "../services/common";
import CohortSessionsTable from "../components/CohortSessionsTable";
import CohortLearnersTable from "../components/CohortLearnersTable";
import { Box } from "@mui/system";

const dummySessions = [
  { id: 1, name: "Session 1", range: null },
  { id: 2, name: "Session 2", range: "01/11/2021 - 05/11/2021" },
];

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

  return (
    <DashboardLayout selectedPage={"cohorts"} loading={loading}>
      {cohort && (
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
              <Button>Edit Cohort</Button>
            </Grid>
          </Grid>
          <Divider />
          <CohortSessionsTable sessions={dummySessions} />
          <Divider />
          <CohortLearnersTable learners={dummyLearners} />
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default CohortDetailsPage;
