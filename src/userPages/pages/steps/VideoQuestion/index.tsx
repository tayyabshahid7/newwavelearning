import React from "react";
import { Grid } from "@mui/material";

const VideoQuestion = ({ video }: any) => {
  return (
    <>
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: "10%",
          "@media(maxWidth: 767px)": {
            paddingTop: "15%",
          },
        }}
      >
        <video className="video" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support HTML video.
        </video>
      </Grid>
    </>
  );
};

export default VideoQuestion;
