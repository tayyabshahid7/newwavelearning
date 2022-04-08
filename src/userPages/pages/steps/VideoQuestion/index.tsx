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
          "@media (max-width: 767px)": {
            paddingTop: "15%",
          },
        }}
      >
        <video src={video} className="video" controls>
          {/*<source src={stepVideo} />*/}
          Your browser does not support HTML video.
        </video>
      </Grid>
    </>
  );
};

export default VideoQuestion;
