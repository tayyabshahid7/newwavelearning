import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import { useHistory, useParams } from "react-router";
import { Button, Divider, Stack, Paper, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import SectionStepsTable from "components/SectionStepsTable";
import { getSection } from "services/common";
import { useSnackbar } from "notistack";
import SectionEditDialog from "components/SectionEditDialog";

interface SectionDetailPageParams {
  sectionId: string;
  programmeId: string;
}

const SectionDetailsPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { sectionId, programmeId } = useParams<SectionDetailPageParams>();
  const [section, setSection] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await getSection(sectionId);
        setSection(sectionData);
      } catch (error: any) {
        enqueueSnackbar(error.response?.data.detail, { variant: "error" });
      }
    };
    fetchData();
  }, [sectionId, enqueueSnackbar]);

  const handleStepDelete = (stepId: number) => {
    // TODO: handle step deletion
    console.log(stepId);
  };

  const handleEditedSection = (editedSection: any) => {
    setSection(editedSection);
    setEditDialogOpen(false);
  };

  return (
    <>
      <DashboardLayout selectedPage={"programmes"}>
        <Button
          variant="text"
          size="large"
          startIcon={<ArrowBack fontSize="large" />}
          onClick={() => history.push(`/programmes/${programmeId}`)}
        >
          Back to programme details
        </Button>
        <Stack spacing={3}>
          <Typography variant="h4">
            {section?.programme_name} - {section?.title}
          </Typography>
          <Grid sx={{ m: 0, p: 2 }} container component={Paper}>
            <Grid item container xs={6}>
              <Stack spacing={1}>
                <Typography variant="body1">
                  <b>Description:</b> {section?.description}
                </Typography>
                <Typography variant="body1">
                  <b>Order Number:</b> {section?.number}
                </Typography>
                <Typography variant="body1">
                  <b>Image:</b>
                </Typography>
                {section?.image ? <img src={section?.image} width={150} alt="section" /> : "None"}
              </Stack>
            </Grid>
            <Grid item sx={{ pr: 2, textAlign: "right" }} xs={6}>
              <Button
                onClick={() => {
                  setEditDialogOpen(true);
                }}
              >
                Edit Section
              </Button>
            </Grid>
          </Grid>

          <Divider />
          <SectionStepsTable onDelete={handleStepDelete} sectionId={section?.id} />
        </Stack>
      </DashboardLayout>
      <SectionEditDialog
        section={section}
        open={editDialogOpen}
        editCallback={handleEditedSection}
        cancelEditCallback={() => setEditDialogOpen(false)}
      />
    </>
  );
};

export default SectionDetailsPage;
