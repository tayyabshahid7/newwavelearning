import React, { useEffect, useState } from "react";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
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
import DashboardLayout from "components/DashboardLayout";
import { useHistory, useParams } from "react-router-dom";
import { getUserDetailAnswer, getUserDetails } from "services/common";
import StepAnswerDetails from "components/StepAnswerDetails";
import EditUserDialog from "components/EditUserDialog/inedx";
import { Learner } from "../common/types";
import { CSVDownload } from "react-csv";

interface UserDetailsPageParams {
  userId: string;
}

const UserDetailsPage = () => {
  const history = useHistory();
  const { userId } = useParams<UserDetailsPageParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [answer, setAnswer] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [downloadLearnersCSV, setDownloadLearnersCSV] = useState<boolean>(false);
  const [learnersCsvData, setLearnersCsvData] = useState<any>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await getUserDetails(userId);
        const answers = await getUserDetailAnswer(userId);
        setUser(response.data);
        setAnswer(answers.data);
      } catch (error: any) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUserDetails();
  }, [userId]);

  const handleUpdateEditedUser = (editedUser: any) => {
    setUser({ ...user, ...editedUser });
    setEditDialogOpen(false);
  };

  const handleDownloadLearnersCSV = () => {
    let data = answer.map((item: any) => {
      return [
        item.step.step_type,
        item.step.fields.question || item.step.fields.answer,
        item.step.fields.description,
        item.step.fields.question || item.step.fields.answer,
        item.answer.value,
      ];
    });
    data = [["type", "question/title", "description", "answer", "correct answers"], ...data];
    setLearnersCsvData(data);
    setDownloadLearnersCSV(true);
    setTimeout(setDownloadLearnersCSV, 100, false);
  };

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
      {downloadLearnersCSV && <CSVDownload data={learnersCsvData} target="_blank" />}
      <Button onClick={handleDownloadLearnersCSV}>Download Learners CSV</Button>

      {user && (
        <Stack spacing={3} component={Paper} sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>
              <b>Email:</b> {user.email}
            </Typography>
            <Button onClick={() => setEditDialogOpen(true)}>Edit User</Button>
          </Stack>
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
                      <b>Completion:</b> {learner.completed_steps + "/" + learner.steps}
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
      <EditUserDialog
        user={user}
        open={editDialogOpen}
        cancelCallback={() => setEditDialogOpen(false)}
        editedUserCallback={handleUpdateEditedUser}
      />
    </DashboardLayout>
  );
};

export default UserDetailsPage;
