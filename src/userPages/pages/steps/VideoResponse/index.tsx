import React, { useEffect, useState } from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import UploadIcon from "../../../static/images/upload.png";
import "./style.scss";

const VideoResponse = ({ isSubmitted, userAnswer, uploadVideo }: any) => {
  const [video, setVideo] = useState<any>(null);
  useEffect(() => {
    if (userAnswer) {
      setVideo(userAnswer[0].file_answer);
    }
  }, [userAnswer]);

  const onChangeHandler = (e: any) => {
    if (e.target.files[0]) {
      // setPicture(e.target.files[0]);
      const reader: any = new FileReader();
      reader.addEventListener("load", () => {
        setVideo(reader.result);
      });
      uploadVideo(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      {!video && (
        <Grid sx={{ display: "flex", justifyContent: "center", position: "relative" }}>
          <input
            onChange={onChangeHandler}
            accept="video/*"
            id="icon-button-file"
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="icon-button-file">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <img src={UploadIcon} alt="" />
            </IconButton>
          </label>
        </Grid>
      )}
      {video && (
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            alignItems: "center",
          }}
        >
          <video style={{ width: "90%", height: "100%" }} controls>
            <source src={video} type="video/mp4" />
            Your browser does not support HTML video.
          </video>
          {!isSubmitted && (
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
                textAlign: "center",
                color: "#0E4A66",
                marginTop: "10px",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => {
                setVideo(null);
              }}
            >
              Click to re-upload video
            </Typography>
          )}
        </Grid>
      )}
    </>
  );
};

export default VideoResponse;
