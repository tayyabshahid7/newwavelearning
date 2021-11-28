import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

import DashboardLayout from "../components/DashboardLayout";
import { useHistory, useParams } from "react-router";
import { Button, Divider, Stack, Grid } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import SectionStepsTable from "components/SectionStepsTable";
import { getSection } from "services/common";
import { useSnackbar } from "notistack";

interface SectionDetailPageParams {
  sectionId: string;
  programmeId: string;
}

const SectionDetailsPage = () => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { sectionId, programmeId } = useParams<SectionDetailPageParams>();
  const [section, setSection] = useState<any>(null);

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
    console.log(stepId);
  };

  return (
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
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h4">
              {section?.programme_name} - {section?.title}
            </Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Button size="large" onClick={() => {}}>
              Edit Section
            </Button>
          </Grid>
        </Grid>
        <Divider />
        <SectionStepsTable onDelete={handleStepDelete} sectionId={section?.id} />
      </Stack>
    </DashboardLayout>
  );
};

export default SectionDetailsPage;
