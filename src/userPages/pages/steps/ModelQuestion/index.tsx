import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import "./style.scss";

const ModelQuestion = ({ isSubmitted, answeredQuestion, modelAnswer }: any) => {
  const [value, setValue] = useState<string>("");

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
              onClick={() => {}}
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
              onClick={() => {}}
            >
              Incorrect
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ModelQuestion;
