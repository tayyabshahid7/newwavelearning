import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import selectedIcon from "../../../static/images/selected.png";
import removeIcon from "../../../static/images/remove.png";
import * as _ from "lodash";
import correctIcon from "../../../static/images/correct.png";

const TextQuestion = ({
  userAnswer,
  selectedAnswerList,
  getTotalSelected,
  totalAnswerCount,
  isSubmitted,
  answers,
}: any) => {
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [answerList, setAnswerList] = useState([]);

  useEffect(() => {
    if (answers && answers.length > 0) {
      if (userAnswer.length > 0) {
        let uAnswer = userAnswer[0].answer.answer;
        uAnswer.forEach((item: any) => {
          answers[item].isSelected = true;
        });
      }

      setAnswerList(answers);
    }
  }, [answers, userAnswer]);

  useEffect(() => {
    if (isSubmitted) {
      setSelectedCount(0);
    }
  }, [isSubmitted]);

  const selectHandler = (item: any, index: number) => {
    const ids: any = [...selectedIds];
    if (!isSubmitted) {
      const data: any = [...answerList];
      if (selectedCount < Number(totalAnswerCount) && !data[index].isSelected) {
        data[index].isSelected = true;
        setAnswerList(data);
        setSelectedCount(selectedCount + 1);
        ids.push(item.id);
        getTotalSelected(selectedCount + 1);
      } else if (selectedCount === Number(totalAnswerCount) && !data[index].isSelected) {
        let objIndex = _.findIndex(data, (item: any) => item.isSelected === true);
        if (objIndex > -1) {
          data[objIndex].isSelected = false;
        }
        data[index].isSelected = true;
        setAnswerList(data);
        ids.push(item.id);
      } else {
        if (data[index].isSelected) {
          let indx = ids.findIndex((value: any) => item.id === value);
          if (indx > -1) {
            ids.splice(indx, 1);
          }
          setSelectedCount(selectedCount - 1);
          data[index].isSelected = !data[index].isSelected;
          setAnswerList(data);
          getTotalSelected(selectedCount - 1);
        }
      }
    }
    setSelectedIds(ids);
    selectedAnswerList(ids);
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
            {isSubmitted && !item.isSelected && item.correct && (
              <img
                className={"box-icon "}
                src={correctIcon}
                width="32px"
                height="32px"
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
