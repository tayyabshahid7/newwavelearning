import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./style.scss";

const ModelQuestion = ({
  isCorrect,
  isSubmitted,
  answeredQuestion,
  modelAnswer,
  userAnswer,
  goToNextStep,
}: any) => {
  const [value, setValue] = useState<string>("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);

  useEffect(() => {
    if (userAnswer.length > 0) {
      let uAnswer = userAnswer[0].answer;
      setValue(uAnswer.text);
      setIsCorrectAnswer(uAnswer.correct);
    }
  }, [userAnswer]);

  return (
    <Grid className="model-question" sx={{ maxWidth: "89%", margin: "auto" }}>
      {!isSubmitted ? (
        <TextareaAutosize
          className="model-textarea"
          onChange={e => {
            answeredQuestion(e.target.value);
            setValue(e.target.value);
          }}
          aria-label="empty textarea"
          placeholder="Type your answer here..."
          style={{ width: "100%", height: 442 }}
        />
      ) : (
        <>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "0 !important",
            }}
          >
            <Typography className="answer-title" gutterBottom>
              My answer
            </Typography>

            <Typography className="answer" gutterBottom>
              {value}
            </Typography>

            <Typography sx={{ marginTop: "20px" }} className="answer-title" gutterBottom>
              Expert's answer
            </Typography>

            <Typography className="answer" gutterBottom>
              {modelAnswer}
            </Typography>
          </Grid>
          <Grid sx={{ width: "100%", marginTop: "23%" }}>
            <Typography sx={{ marginTop: "30px" }} className="answer-title" gutterBottom>
              My Answer is...
            </Typography>
            {!isCorrectAnswer ? (
              <>
                <Button
                  sx={{
                    padding: "16px 13.39px",
                    fontSize: "24px",
                    fontWeight: 800,
                    backgroundColor: "#22B9D4",
                    boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                    borderRadius: "8px",
                    border: "1px solid #22B9D4",
                    marginBottom: "20px",
                  }}
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={async () => {
                    isCorrect(true);
                  }}
                >
                  Correct
                </Button>
                <Button
                  sx={{
                    padding: "16px 13.39px",
                    fontSize: "24px",
                    fontWeight: 800,
                    backgroundColor: "#DD0006",
                    boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                    borderRadius: "8px",
                    border: "1px solid #DD0006",
                    "&:hover": {
                      backgroundColor: "#b20309",
                    },
                  }}
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={async a => {
                    isCorrect(false);
                  }}
                >
                  Incorrect
                </Button>
              </>
            ) : (
              <Grid>
                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography>{isCorrectAnswer ? "True" : "False"}</Typography>
                </Grid>
                <Button
                  sx={{
                    marginTop: "30%",
                    padding: "16px 13.39px",
                    fontSize: "24px",
                    fontWeight: 800,
                    backgroundColor: "#0E4A66",
                    boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
                    borderRadius: "8px",
                  }}
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={goToNextStep}
                >
                  Next
                </Button>
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ModelQuestion;
