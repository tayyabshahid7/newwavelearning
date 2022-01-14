import React from "react";
import KeywordQuestionFeedback from "./KeywordQuestionFeedback";
import ModelAnswerQuestionFeedback from "./ModelAnswerQuestionFeedback";
import MultipleChoiceStepAnswer from "./MultipleChoiceStepAnswer";
import PictureChoiceQuestionFeedback from "./PictureChoiceQuestionFeedback";
import ToggleQuestionFeedback from "./ToggleQuestionFeedback";

interface StepAnswerBodyProps {
  stepAnswer: any;
  stepType?: string | null;
}

const StepAnswerBody = ({ stepAnswer, stepType }: StepAnswerBodyProps) => {
  let stepBody = null;
  switch (stepType) {
    case "multiple_choice_question":
      stepBody = <MultipleChoiceStepAnswer stepAnswer={stepAnswer} />;
      break;
    case "keyword_question":
      stepBody = <KeywordQuestionFeedback stepAnswer={stepAnswer} />;
      break;
    case "model_answer_question":
      stepBody = <ModelAnswerQuestionFeedback stepAnswer={stepAnswer} />;
      break;
    case "toggle":
      stepBody = <ToggleQuestionFeedback stepAnswer={stepAnswer} />;
      break;
    case "picture_choice_question":
      stepBody = <PictureChoiceQuestionFeedback stepAnswer={stepAnswer} />;
      break;
    default:
      break;
  }
  return stepBody;
};
export default StepAnswerBody;
