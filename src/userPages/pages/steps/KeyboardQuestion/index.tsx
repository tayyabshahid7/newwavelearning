import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./style.scss";
import selectedIcon from "../../../static/images/selected.png";
import removeIcon from "../../../static/images/remove.png";

const KeyboardQuestion = ({ isSubmitted, answeredQuestion, keywords, userAnswer }: any) => {
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
          style={{ width: "100%", height: 200 }}
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
          <img
            style={{ cursor: "pointer" }}
            src={
              keywords &&
              keywords.some((item: string) =>
                value.toLowerCase().includes(item.toLocaleLowerCase())
              )
                ? selectedIcon
                : removeIcon
            }
            width="35px"
            height="35px"
            alt="Correct Incorrect Logo"
          />
        </Grid>
      )}
    </Grid>
  );
};

export default KeyboardQuestion;
