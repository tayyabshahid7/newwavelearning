import { ArrowBack, Expand, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import PictureChoiceQuestionDetails from "components/StepAnswerDetails/PictureChoiceQuestionDetails";
import DashboardLayout from "components/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getUserDetails } from "services/common";
import StepAnswerDetails from "components/StepAnswerDetails";

interface UserDetailsPageParams {
  userId: string;
}

const UserDetailsPage = () => {
  const history = useHistory();
  const { userId } = useParams<UserDetailsPageParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await getUserDetails(userId);
        setUser(response.data);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <DashboardLayout selectedPage={"users"} loading={loading}>
      <Button
        variant="text"
        size="large"
        startIcon={<ArrowBack fontSize="large" />}
        onClick={() => history.push("/users")}
      >
        Back to users list
      </Button>
      <Typography variant="h4">User Details</Typography>
      {user && (
        <Stack spacing={3} component={Paper} sx={{ p: 4 }}>
          <Typography>
            <b>Email:</b> {user.email}
          </Typography>
          <Typography>
            <b>Full name:</b> {user.first_name} {user.last_name}
          </Typography>
          <Typography>
            <b>Role:</b> {user.role}
          </Typography>
          <Typography variant="h5">Cohorts</Typography>
          <Paper variant="outlined">
            {user.associated_learners?.map((learner: any) => (
              <Accordion key={learner.id}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Stack
                    spacing={3}
                    direction="row"
                    sx={{ width: "100%" }}
                    justifyContent={"space-around"}
                  >
                    <Typography>
                      <b>Cohort:</b> {learner.cohort_name}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      <b>Programme:</b> {learner.programme || "5/7"}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      <b>Completion:</b> {learner.completion || "5/7"}
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      <b>Facilitator:</b> {learner.facilitator}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="h6">Answers</Typography>
                  {learner.answers.map((stepAnswer: any) => (
                    <StepAnswerDetails
                      key={stepAnswer.id}
                      stepType={stepAnswer.step.step_type}
                      stepAnswer={stepAnswer}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </Paper>
        </Stack>
      )}
    </DashboardLayout>
  );
};

export default UserDetailsPage;
