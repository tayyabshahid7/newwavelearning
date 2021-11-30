import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import { useHistory, useParams } from "react-router";
import { Button, Divider, Stack, Paper } from "@mui/material";
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
          <Stack direction="row" component={Paper} justifyContent="space-between" sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Typography variant="body1">
                <b>Description:</b> {section?.description}
              </Typography>
              <Typography variant="body1">
                <b>Order Number:</b> {section?.number}
              </Typography>
            </Stack>
            <Button
              size="large"
              onClick={() => {
                setEditDialogOpen(true);
              }}
            >
              Edit Section
            </Button>
          </Stack>
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
