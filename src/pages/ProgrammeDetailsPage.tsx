import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import DashboardLayout from "components/DashboardLayout";
import { useParams } from "react-router";
import { Box } from "@mui/system";
import ProgrammeEditDialog from "components/ProgrammeEditDialog";
import { getProgrammeDetails } from "services/common";

import ProgrammeSectionsTable from "components/ProgrammeSectionsTable";

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
            <Typography variant="h4">{programme.name} Programme</Typography>
            <Grid sx={{ m: 0, p: 2 }} container component={Paper}>
              <Grid item container xs={6}>
                <Stack direction="row">
                  <Box sx={{ minWidth: "100px", textAlign: "right", fontWeight: "bold" }}>
                    Image:
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    {programme.image ? (
                      <img
                        src={programme.image}
                        width={150}
                        alt="programme background"
                      />
                    ) : (
                      <Typography>None</Typography>
                    )}
                  </Box>
                </Stack>
              </Grid>
              <Grid item sx={{ pr: 2, textAlign: "right" }} xs={6}>
                <Button onClick={handleOpenEditDialog}>Edit Programme</Button>
              </Grid>
            </Grid>
            <Divider />
            <ProgrammeSectionsTable programmeId={programme.id} />
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
