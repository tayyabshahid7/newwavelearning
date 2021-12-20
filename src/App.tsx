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
import AddTextContent from "pages/steps/AddTextContent";
import EditTextContent from "pages/steps/EditTextContent";
import AddLiveSession from "pages/steps/AddLiveSession";
import EditLiveSession from "pages/steps/EditLiveSession";
import AddMultipleChoice from "pages/steps/AddMultipleChoiceQuestion";
import EditMultipleChoice from "pages/steps/EditMultipleChoiceQuestion";
import AddPictureChoiceQuestion from "pages/steps/AddPictureChoiceQuestion";
import EditPictureChoiceQuestion from "pages/steps/EditPictureChoiceQuestion";
import AddVideoContentStep from "pages/AddVideoContentStep";
import EditVideoContentStep from "pages/EditVideoContentStep";
import AddAudioContent from "pages/steps/AddAudioContent";
import EditAudioContent from "pages/steps/EditAudioContent";
import AddToggleQuestion from "pages/steps/AddToggleQuestion";
import EditToggleQuestion from "pages/steps/EditToggleQuestion";
import AddKeywordQuestion from "pages/steps/AddKeywordQuestion";
import EditKeywordQuestion from "pages/steps/EditKeywordQuestion";
import AddModelAnswerQuestion from "pages/steps/AddModelAnswerQuestion";
import EditModelAnswerQuestion from "pages/steps/EditModelAnswerQuestion";

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
          component={AddTextContent}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-text_content"
          component={EditTextContent}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-live-session"
          component={AddLiveSession}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-live_session"
          component={EditLiveSession}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-multiple-choice-question"
          component={AddMultipleChoice}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-multiple_choice_question"
          component={EditMultipleChoice}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-picture-choice-question"
          component={AddPictureChoiceQuestion}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-picture_choice_question"
          component={EditPictureChoiceQuestion}
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
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-keyword-question"
          component={AddKeywordQuestion}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-keyword_question"
          component={EditKeywordQuestion}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/add-model-answer-question"
          component={AddModelAnswerQuestion}
        />
        <ProtectedRoute
          exact
          path="/sections/:sectionId/steps/:stepId/edit-model_answer_question"
          component={EditModelAnswerQuestion}
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
