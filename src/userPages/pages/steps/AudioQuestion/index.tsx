import React from "react";
import { Grid } from "@mui/material";

const AudioQuestion = ({ audio }: any) => {
  return (
    <>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <audio controls style={{ width: "85%" }} controlsList="nodownload">
          <source src={audio} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </Grid>
    </>
  );
};

export default AudioQuestion;
