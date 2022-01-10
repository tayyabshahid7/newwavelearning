import React from "react";
import MultipleChoiceStepAnswer from "./MultipleChoiceStepAnswer";

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
    default:
      break;
  }
  return stepBody;
};
export default StepAnswerBody;
