import React, { useEffect, useState } from "react";
import { ArrowBack, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
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

  const getCorrectAnswers = (item: any) => {
    let data = [];
    data =
      item &&
      item.map((obj: any) => {
        if (obj.correct) {
          return obj.id;
        }
      });
    if (data) {
      data = data.filter((element: any) => {
        return element !== undefined;
      });
      return data;
    }
  };

  const getUserAnswer = (item: any) => {
    let type = item.step.step_type;
    let answer = "";
    if (type === "picture_choice_question" || type === "multiple_choice_question") {
      answer = item?.answer?.answer?.toString();
    } else if (type === "video_response") {
      answer = item?.video_file_url;
    } else if (type === "video") {
      answer = item.step.fields.video;
    } else if (type === "audio") {
      answer = item.step.fields.audio;
    } else if (type === "audio_response") {
      answer = item?.file_answer;
    } else if (type === "toggle") {
      answer = item?.answer.value;
    } else if (type === "text_content") {
      answer = item?.step.fields.content;
    } else if (
      type === "open_ended_question" ||
      type === "keyword_question" ||
      type === "model_answer_question"
    ) {
      answer = item?.answer?.text;
    }
    return answer;
  };

  const handleDownloadLearnersCSV = () => {
    let data = answer.map((item: any) => {
      let type = item.step.step_type;
      let fields = item.step.fields;
      return [
        item.step.step_type,
        fields.question || fields.answer,
        fields.description,
        getUserAnswer(item),
        type === "keyword_question"
          ? fields.keywords.toString()
          : type === "model_answer_question"
          ? fields.model_answer
          : getCorrectAnswers(fields.answers),
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
      <Grid sx={{ display: "flex", justifyContent: "end", marginBottom: "10px" }}>
        <Button onClick={handleDownloadLearnersCSV}>Download Learners CSV</Button>
      </Grid>

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
