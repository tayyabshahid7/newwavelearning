import React from "react";
import { Grid } from "@mui/material";

const VideoQuestion = ({ video }: any) => {
  return (
    <>
      <Grid
        sx={{ display: "flex", justifyContent: "center", paddingTop: "15%", marginBottom: "10%" }}
      >
        <video style={{ width: "90%", height: "100%" }} controls>
          <source src={video} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </Grid>
    </>
  );
};

export default VideoQuestion;
