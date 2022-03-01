import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import removeIcon from "../../../static/images/remove.png";
import pictureSelected from "../../../static/images/picture-selected.png";

const PictureQuestion = ({
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
    if (answers.length > 0) {
      setAnswerList(answers);
    }
  }, [answers]);

  const selectHandler = (item: any, index: number) => {
    const ids: any = [...selectedIds];
    if (!isSubmitted) {
      const data: any = [...answerList];
      if (selectedCount < totalAnswerCount && !data[index].isSelected) {
        data[index].isSelected = true;
        setAnswerList(data);
        setSelectedCount(selectedCount + 1);
        ids.push(item.id);
        getTotalSelected(selectedCount + 1);
      } else {
        debugger;
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
      <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
        {answerList?.map((item: any, index: number) => {
          return (
            <Grid className="dashboard-card" xs={6}>
              <Grid
                onClick={() => selectHandler(item, index)}
                className={"picture-box ".concat(item.isSelected ? "selected" : "")}
                key={index}
                item
              >
                <img width="85px" height="56px" src={item.picture} alt="logo" />

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
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default PictureQuestion;
