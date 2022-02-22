import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import selectedIcon from "../../../static/images/selected.png";
import removeIcon from "../../../static/images/remove.png";
import pictureSelected from "../../../static/images/picture-selected.png";

const PictureQuestion = ({ getTotalSelected, totalAnswerCount, isSubmitted, answers }: any) => {
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
                <img width="85px" height="56px" src={item.picture} />

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
