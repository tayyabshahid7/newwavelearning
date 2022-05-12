import React from "react";
import { Grid } from "@mui/material";
import "./style.scss";

const TextContentQuestion = ({ image }: any) => {
  return (
    <>
      <Grid className="text-question text-image">
        <img
          style={{ padding: "3%" }}
          src={image}
          width="220px"
          height="220px"
          alt="New Wave Learning Logo"
        />
      </Grid>
    </>
  );
};

export default TextContentQuestion;
