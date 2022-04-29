import React from "react";
import KeywordQuestionDetails from "./KeywordQuestionDetails";
import ModelAnswerQuestionDetails from "./ModelAnswerQuestionDetails";
import MultipleChoiceDetails from "./MultipleChoiceDetails";
import PictureChoiceQuestionDetails from "./PictureChoiceQuestionDetails";
import ToggleQuestionDetails from "./ToggleQuestionDetails";
import OpenEndedQuestion from "./OpenEndedQuestion";
import VideoResponse from "./VideoResponse";
import AudioResponse from "./AudioResponse";

interface StepAnswerBodyProps {
  stepAnswer: any;
  stepType?: string | null;
}

const StepAnswerDetails = ({ stepAnswer, stepType }: StepAnswerBodyProps) => {
  let stepBody = null;
  switch (stepType) {
    case "audio_response":
      stepBody = <AudioResponse stepAnswer={stepAnswer} />;
      break;
    case "video_response":
      stepBody = <VideoResponse stepAnswer={stepAnswer} />;
      break;
    case "open_ended_question":
      stepBody = <OpenEndedQuestion stepAnswer={stepAnswer} />;
      break;
    case "multiple_choice_question":
      stepBody = <MultipleChoiceDetails stepAnswer={stepAnswer} />;
      break;
    case "keyword_question":
      stepBody = <KeywordQuestionDetails stepAnswer={stepAnswer} />;
      break;
    case "model_answer_question":
      stepBody = <ModelAnswerQuestionDetails stepAnswer={stepAnswer} />;
      break;
    case "toggle":
      stepBody = <ToggleQuestionDetails stepAnswer={stepAnswer} />;
      break;
    case "picture_choice_question":
      stepBody = <PictureChoiceQuestionDetails stepAnswer={stepAnswer} />;
      break;
    default:
      break;
  }
  return stepBody;
};
export default StepAnswerDetails;
