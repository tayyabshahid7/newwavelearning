import React from "react";
import "./App.css";
import { LOGIN_PAGE } from "./common/constants";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgottenPassword from "./pages/ForgottenPassword";
import DashBoardPage from "./pages/DashboardPage";
import PasswordReset from "./pages/PasswordReset";
import CohortsPage from "./pages/CohortsPage";
import ProgrammesPage from "./pages/ProgrammesPage";
import FeedbackPage from "./pages/FeedbackPage";
import UsersPage from "./pages/UsersPage";
import AddCohortPage from "./pages/AddCohortPage";
import CohortDetailsPage from "./pages/CohortDetailsPage";
import AddLearnerPage from "pages/AddLearnerPage";
import ProgrammeDetailsPage from "pages/ProgrammeDetailsPage";
import AddProgrammePage from "pages/AddProgrammePage";
import SectionDetailsPage from "pages/SectionDetailsPage";
import NotFoundPage from "pages/NotFoundPage";
import AddTextContentPage from "pages/AddTextContentStepPage";
import EditTextContentPage from "pages/EditTextContentStepPage";
import AddLiveSessionStepPage from "pages/AddLiveSessionStepPage";
import EditLiveSessionStepPage from "pages/EditLiveSessionStepPage";
import AddMultipleChoiceQuestionStep from "pages/AddMultipleChoiceQuestionStepPage";
import EditMultipleChoiceQuestionStep from "pages/EditMultipleChoiceQuestionStepPage";
import AddPictureChoiceQuestionStep from "pages/AddPictureChoiceQuestionStep";
import EditPictureChoiceQuestionStep from "pages/EditPictureChoiceQuestionStep";
import AddVideoContentStep from "pages/AddVideoContentStep";
import EditVideoContentStep from "pages/EditVideoContentStep";
import AddAudioContent from "pages/steps/AddAudioContent";
import EditAudioContent from "pages/steps/EditAudioContent";
import AddToggleQuestion from "pages/steps/AddToggleQuestion";
import EditToggleQuestion from "pages/steps/EditToggleQuestion";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN_PAGE} component={LoginPage} />
        <Route exact path="/forgotten-password" component={ForgottenPassword} />
        <Route path="/reset-password/:signature/:token" component={PasswordReset} />
        <ProtectedRoute exact path="/dashboard" component={DashBoardPage} />
        <ProtectedRoute exact path="/cohorts" component={CohortsPage} />
        <ProtectedRoute exact path="/cohorts/add" component={AddCohortPage} />
        <ProtectedRoute exact path="/cohorts/:cohortId" component={CohortDetailsPage} />
        <ProtectedRoute exact path="/programmes" component={ProgrammesPage} />
        <ProtectedRoute exact path="/programmes/add" component={AddProgrammePage} />
        <ProtectedRoute exact path="/programmes/:programmeId" component={ProgrammeDetailsPage} />
        <ProtectedRoute
          exact
          path="/programmes/:programmeId/sections/:sectionId"
          component={SectionDetailsPage}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-text-content"
          component={AddTextContentPage}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-text_content"
          component={EditTextContentPage}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-live-session"
          component={AddLiveSessionStepPage}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-live_session"
          component={EditLiveSessionStepPage}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-multiple-choice-question"
          component={AddMultipleChoiceQuestionStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-multiple_choice_question"
          component={EditMultipleChoiceQuestionStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-picture-choice-question"
          component={AddPictureChoiceQuestionStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-picture_choice_question"
          component={EditPictureChoiceQuestionStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-video"
          component={AddVideoContentStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-video"
          component={EditVideoContentStep}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-audio"
          component={AddAudioContent}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-audio"
          component={EditAudioContent}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-toggle"
          component={AddToggleQuestion}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-toggle"
          component={EditToggleQuestion}
        />
        <ProtectedRoute exact path="/feedback" component={FeedbackPage} />
        <ProtectedRoute exact path="/users" component={UsersPage} />
        <ProtectedRoute exact path="/learners/:cohortId/add" component={AddLearnerPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
