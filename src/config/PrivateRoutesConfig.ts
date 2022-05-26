import Roles from "./roles";

// Components
import Programmes from "./../userPages/pages/programmes";
import CohortsPage from "../pages/CohortsPage";
import LiveSession from "../userPages/pages/LiveSession";
import Feedback from "../userPages/pages/feedback";
import LiveSessionDetail from "../userPages/pages/LiveSession/Details";
import FeedbackDetail from "../userPages/pages/feedback/Details";
import StepsList from "../userPages/pages/programmes/section-steps-list";
import ProgrammeSection from "../userPages/pages/programmes/programmes-sections";
import UserDashboard from "../userPages/pages/dashboard";
import LeaderBoard from "../userPages/pages/leaderboard";
import Steps from "../userPages/pages/steps";
import CompleteSection from "../userPages/pages/steps/CompleteSection";
import DashBoardPage from "../pages/DashboardPage";
import AddCohortPage from "../pages/AddCohortPage";
import CohortDetailsPage from "../pages/CohortDetailsPage";
import ProgrammesPage from "../pages/ProgrammesPage";
import AddProgrammePage from "../pages/AddProgrammePage";
import ProgrammeDetailsPage from "../pages/ProgrammeDetailsPage";
import SectionDetailsPage from "../pages/SectionDetailsPage";
import AddTextContent from "../pages/steps/AddTextContent";
import EditTextContent from "../pages/steps/EditTextContent";
import AddLiveSession from "../pages/steps/AddLiveSession";
import EditLiveSession from "../pages/steps/EditLiveSession";
import AddMultipleChoice from "../pages/steps/AddMultipleChoiceQuestion";
import EditMultipleChoice from "../pages/steps/EditMultipleChoiceQuestion";
import AddPictureChoiceQuestion from "../pages/steps/AddPictureChoiceQuestion";
import EditPictureChoiceQuestion from "../pages/steps/EditPictureChoiceQuestion";
import AddVideoContent from "../pages/steps/AddVideoContentStep";
import AddOpenEndedQuestion from "../pages/steps/AddOpenEndedQuestion";
import EditOpenEndedQuestion from "../pages/steps/EditOpenEndedQuestion";
import AddVideoResponsePage from "../pages/steps/AddVideoResponse";
import EditVideoResponsePage from "../pages/steps/EditVideoResponse";
import AddAudioResponsePage from "../pages/steps/AddAudioResponse";
import EditAudioResponsePage from "../pages/steps/EditAudioResponse";
import EditVideoContent from "../pages/steps/EditVideoContentStep";
import AddAudioContent from "../pages/steps/AddAudioContent";
import EditAudioContent from "../pages/steps/EditAudioContent";
import AddToggleQuestion from "../pages/steps/AddToggleQuestion";
import EditToggleQuestion from "../pages/steps/EditToggleQuestion";
import AddKeywordQuestion from "../pages/steps/AddKeywordQuestion";
import EditKeywordQuestion from "../pages/steps/EditKeywordQuestion";
import AddModelAnswerQuestion from "../pages/steps/AddModelAnswerQuestion";
import EditModelAnswerQuestion from "../pages/steps/EditModelAnswerQuestion";
import FeedbackPage from "../pages/FeedbackPage";
import UsersPage from "../pages/UsersPage";
import UserDetailsPage from "../pages/UserDetailsPage";
import AddLearnerPage from "../pages/AddLearnerPage";

const privateRoutes = [
  {
    component: Programmes,
    path: "/user-programmes",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: LiveSession,
    path: "/user-live-sessions/:cohortId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: Feedback,
    path: "/user-feedback/:cohortId/:programmeId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: LiveSessionDetail,
    path: "/user-live-session-detail/",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: FeedbackDetail,
    path: "/user-feedback-detail/",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: StepsList,
    path: "/user-section-steps/:cohortId/:sectionId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: ProgrammeSection,
    path: "/user-programmes-section/:cohortId/:programmeId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: UserDashboard,
    path: "/user-dashboard/:cohortId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: LeaderBoard,
    path: "/leaderBoard/:cohortId/:programmeId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: Steps,
    path: "/user-steps/:cohortId/:sectionId/:stepId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },
  {
    component: CompleteSection,
    path: "/section-success/:cohortId/:sectionId/:programmeId",
    exact: true,
    permission: [Roles.ADMIN, Roles.LEARNER],
  },

  // only admin routes
  {
    component: CohortsPage,
    path: "/cohorts",
    permission: [Roles.ADMIN],
  },
  {
    component: DashBoardPage,
    path: "/dashboard",
    permission: [Roles.ADMIN],
  },
  {
    component: AddCohortPage,
    path: "/cohorts/add",
    permission: [Roles.ADMIN],
  },
  {
    component: CohortDetailsPage,
    path: "/cohorts/:cohortId",
    permission: [Roles.ADMIN],
  },
  {
    component: ProgrammesPage,
    path: "/programmes/",
    permission: [Roles.ADMIN],
  },
  {
    component: AddProgrammePage,
    path: "/programmes/add",
    permission: [Roles.ADMIN],
  },
  {
    component: ProgrammeDetailsPage,
    path: "/programmes/:programmeId",
    permission: [Roles.ADMIN],
  },
  {
    component: SectionDetailsPage,
    path: "/programmes/:programmeId/sections/:sectionId",
    permission: [Roles.ADMIN],
  },
  {
    component: AddTextContent,
    path: "/sections/:sectionId/steps/add-text-content",
    permission: [Roles.ADMIN],
  },
  {
    component: EditTextContent,
    path: "/sections/:sectionId/steps/:stepId/edit-text_content",
    permission: [Roles.ADMIN],
  },
  {
    component: AddLiveSession,
    path: "/sections/:sectionId/steps/add-live-session",
    permission: [Roles.ADMIN],
  },
  {
    component: EditLiveSession,
    path: "/sections/:sectionId/steps/:stepId/edit-live_session",
    permission: [Roles.ADMIN],
  },
  {
    component: AddMultipleChoice,
    path: "/sections/:sectionId/steps/add-multiple-choice-question",
    permission: [Roles.ADMIN],
  },
  {
    component: EditMultipleChoice,
    path: "/sections/:sectionId/steps/:stepId/edit-multiple_choice_question",
    permission: [Roles.ADMIN],
  },
  {
    component: AddPictureChoiceQuestion,
    path: "/sections/:sectionId/steps/add-picture-choice-question",
    permission: [Roles.ADMIN],
  },
  {
    component: EditPictureChoiceQuestion,
    path: "/sections/:sectionId/steps/:stepId/edit-picture_choice_question",
    permission: [Roles.ADMIN],
  },
  {
    component: AddVideoContent,
    path: "/sections/:sectionId/steps/add-video",
    permission: [Roles.ADMIN],
  },
  {
    component: AddOpenEndedQuestion,
    path: "/sections/:sectionId/steps/add-open-ended-question",
    permission: [Roles.ADMIN],
  },
  {
    component: EditOpenEndedQuestion,
    path: "/sections/:sectionId/steps/:stepId/edit-open_ended_question",
    permission: [Roles.ADMIN],
  },
  {
    component: AddVideoResponsePage,
    path: "/sections/:sectionId/steps/add-video-response",
    permission: [Roles.ADMIN],
  },
  {
    component: EditVideoResponsePage,
    path: "/sections/:sectionId/steps/:stepId/edit-video_response",
    permission: [Roles.ADMIN],
  },
  {
    component: AddAudioResponsePage,
    path: "/sections/:sectionId/steps/add-audio-response",
    permission: [Roles.ADMIN],
  },
  {
    component: EditAudioResponsePage,
    path: "/sections/:sectionId/steps/:stepId/edit-audio_response",
    permission: [Roles.ADMIN],
  },
  {
    component: EditVideoContent,
    path: "/sections/:sectionId/steps/:stepId/edit-video",
    permission: [Roles.ADMIN],
  },
  {
    component: AddAudioContent,
    path: "/sections/:sectionId/steps/add-audio",
    permission: [Roles.ADMIN],
  },
  {
    component: EditAudioContent,
    path: "/sections/:sectionId/steps/:stepId/edit-audio",
    permission: [Roles.ADMIN],
  },
  {
    component: AddToggleQuestion,
    path: "/sections/:sectionId/steps/add-toggle",
    permission: [Roles.ADMIN],
  },
  {
    component: EditToggleQuestion,
    path: "/sections/:sectionId/steps/:stepId/edit-toggle",
    permission: [Roles.ADMIN],
  },
  {
    component: AddKeywordQuestion,
    path: "/sections/:sectionId/steps/add-keyword-question",
    permission: [Roles.ADMIN],
  },
  {
    component: EditKeywordQuestion,
    path: "/sections/:sectionId/steps/:stepId/edit-keyword_question",
    permission: [Roles.ADMIN],
  },
  {
    component: AddModelAnswerQuestion,
    path: "/sections/:sectionId/steps/add-model-answer-question",
    permission: [Roles.ADMIN],
  },
  {
    component: EditModelAnswerQuestion,
    path: "/sections/:sectionId/steps/:stepId/edit-model_answer_question",
    permission: [Roles.ADMIN],
  },
  {
    component: FeedbackPage,
    path: "/feedback",
    permission: [Roles.ADMIN],
  },
  {
    component: UsersPage,
    path: "/users",
    permission: [Roles.ADMIN],
  },
  {
    component: UserDetailsPage,
    path: "/users/:userId/",
    permission: [Roles.ADMIN],
  },
  {
    component: AddLearnerPage,
    path: "/learners/:cohortId/add",
    permission: [Roles.ADMIN],
  },
];

export default privateRoutes;
