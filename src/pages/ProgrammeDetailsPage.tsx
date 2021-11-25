import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, List, ListItem, Paper, Stack, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import { useParams } from "react-router";
import { Box } from "@mui/system";
import ProgrammeEditDialog from "components/ProgrammeEditDialog";
import { getProgrammeDetails } from "services/common";

interface ProgrammePageParams {
  programmeId: string;
}

const ProgrammeDetailsPage = () => {
  const { programmeId } = useParams<ProgrammePageParams>();
  const [programme, setProgramme] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProgrammeData = async () => {
      setLoading(true);
      try {
        const programmeDetails = await getProgrammeDetails(programmeId);
        setProgramme(programmeDetails.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchProgrammeData();
  }, [programmeId]);

  const handleOpenEditDialog = () => {
    setEditDialogOpen(true);
  };

  const handleEditProgramme = async (editedProgramme: any) => {
    setProgramme(editedProgramme);
    setEditDialogOpen(false);
  };

  return (
    <DashboardLayout selectedPage={"programmes"} loading={loading}>
      {programme && (
        <>
          <Stack spacing={3}>
            <Typography variant="h4">Programme details</Typography>
            <Grid sx={{ m: 0, p: 2 }} container component={Paper}>
              <Grid item container xs={6}>
                <List dense>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Programme Name:
                      </Box>
                      <Box sx={{ ml: 2 }}>{programme.name}</Box>
                    </Stack>
                  </ListItem>
                  <ListItem>
                    <Stack direction={"row"}>
                      <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                        Programme Image:
                      </Box>
                      <Box sx={{ ml: 2 }}>Programme image here</Box>
                    </Stack>
                  </ListItem>
                </List>
              </Grid>
              <Grid item sx={{ pr: 2, textAlign: "right" }} xs={6}>
                <Button onClick={handleOpenEditDialog}>Edit Programme</Button>
              </Grid>
            </Grid>
            <Divider />
          </Stack>
          <ProgrammeEditDialog
            open={editDialogOpen}
            programme={programme}
            editCallback={handleEditProgramme}
            cancelEditCallback={() => setEditDialogOpen(false)}
          />
        </>
      )}
    </DashboardLayout>
  );
};

export default ProgrammeDetailsPage;
