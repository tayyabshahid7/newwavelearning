import React from "react";
import { Grid } from "@mui/material";
import "./style.scss";

const TextContentQuestion = ({ image }: any) => {
  debugger;
  return (
    <>
      <Grid className="text-question text-image">
        <img
          style={{ borderRadius: "50%", padding: "5%" }}
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
