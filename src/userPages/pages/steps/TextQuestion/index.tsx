import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import selectedIcon from "../../../static/images/selected.png";
import removeIcon from "../../../static/images/remove.png";

const TextQuestion = ({ getTotalSelected, totalAnswerCount, isSubmitted, answers }: any) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    if (answers.length > 0) {
      setAnswerList(answers);
    }
  }, []);

  const selectHandler = (item: any, index: number) => {
    if (!isSubmitted) {
      const data: any = [...answerList];
      if (selectedCount < totalAnswerCount && !data[index].isSelected) {
        data[index].isSelected = true;
        setAnswerList(data);
        setSelectedCount(selectedCount + 1);
        getTotalSelected(selectedCount + 1);
      } else {
        if (data[index].isSelected) {
          setSelectedCount(selectedCount - 1);
          getTotalSelected(selectedCount - 1);
          data[index].isSelected = !data[index].isSelected;
          setAnswerList(data);
        }
      }
    }
  };

  return (
    <>
      {answerList?.map((item: any, index: number) => {
        return (
          <Grid
            onClick={() => selectHandler(item, index)}
            className={"select-box ".concat(!isSubmitted && item.isSelected ? "selected" : "")}
            key={index}
            item
            sx={{
              padding: "2% 10%",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h5" sx={{ fontSize: "16px", color: "#6A6E71" }}>
              {item.text}
            </Typography>
            {isSubmitted && item.isSelected && (
              <img
                style={{ cursor: "pointer" }}
                src={item.isSelected === item.correct ? selectedIcon : removeIcon}
                width="27px"
                height="27px"
                alt="Burger Logo"
              />
            )}
          </Grid>
        );
      })}
    </>
  );
};

export default TextQuestion;
