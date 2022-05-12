import Roles from "./roles";

// Components
import Programmes from "./../userPages/pages/programmes";
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

export default [
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
];
