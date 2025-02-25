import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import removeIcon from "../../../static/images/remove.png";
import pictureSelected from "../../../static/images/picture-selected.png";
import correctIcon from "../../../static/images/correct.png";
import * as _ from "lodash";
import "./style.scss";

const PictureQuestion = ({
  selectedAnswerList,
  getTotalSelected,
  totalAnswerCount,
  isSubmitted,
  answers,
  userAnswer,
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
  }, [userAnswer, answers]);

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
      <Grid
        container
        spacing={0}
        sx={{
          marginBottom: "20px",
        }}
      >
        {answerList?.map((item: any, index: number) => {
          return (
            <Grid className="dashboard-card" xs={6} md={4}>
              <Grid
                onClick={() => selectHandler(item, index)}
                className={"picture-box ".concat(item.isSelected ? "selected" : "")}
                key={index}
                item
              >
                <img className="picture" src={item.picture} alt="logo" />

                {isSubmitted && item.isSelected && (
                  <img
                    className={"box-icon ".concat(
                      item.isSelected !== item.correct ? "error-icon" : ""
                    )}
                    src={item.isSelected === item.correct ? pictureSelected : removeIcon}
                    width="27px"
                    height="27px"
                    alt="Burger Logo"
                  />
                )}
                {isSubmitted && !item.isSelected && item.correct && (
                  <img
                    className={"box-icon "}
                    src={correctIcon}
                    width="27px"
                    height="27px"
                    alt="Burger Logo"
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PictureQuestion;
