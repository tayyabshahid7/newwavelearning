import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./style.scss";

const OpenEndedQuestion = ({ isSubmitted, answeredQuestion, keywords, userAnswer }: any) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (userAnswer.length > 0) {
      let uAnswer = userAnswer[0].answer;
      setValue(uAnswer.text);
    }
  }, [userAnswer]);

  return (
    <Grid className="keyboard-question" sx={{ maxWidth: "89%", margin: "auto" }}>
      {!isSubmitted ? (
        <TextareaAutosize
          className="keyboard-textarea"
          onChange={e => {
            answeredQuestion(e.target.value);
            setValue(e.target.value);
          }}
          aria-label="empty textarea"
          placeholder="Type your answer here..."
          style={{ width: "100%", height: 500 }}
        />
      ) : (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "0 !important",
          }}
        >
          <p className="correct-answer">{value}</p>
        </Grid>
      )}
    </Grid>
  );
};

export default OpenEndedQuestion;
