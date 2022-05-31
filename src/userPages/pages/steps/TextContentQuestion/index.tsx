import React from "react";
import { Grid } from "@mui/material";
import "./style.scss";

const TextContentQuestion = ({ image }: any) => {
  return (
    <>
      <Grid className="text-question text-image">
        <img src={image} alt="New Wave Learning Logo" />
      </Grid>
    </>
  );
};

export default TextContentQuestion;
