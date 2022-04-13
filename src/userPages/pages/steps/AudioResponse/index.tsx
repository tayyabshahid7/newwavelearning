import React, { useState } from "react";
import { Grid } from "@mui/material";
// @ts-ignore
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import "./style.scss";

const AudioResponse = () => {
  const [audioDetails, setAudioDetails] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: null,
      m: null,
      s: null,
    },
  });

  const handleAudioStop = (data: any) => {
    setAudioDetails(data);
  };

  const handleAudioUpload = (file: any) => {
    console.log(file);
  };

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      },
    };
    setAudioDetails(reset);
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          margin: "25px auto",
        }}
      >
        <Recorder
          hideHeader={true}
          record={false}
          audioURL={audioDetails.url}
          showUIAudio
          handleAudioStop={(data: any) => handleAudioStop(data)}
          handleAudioUpload={(data: any) => handleAudioUpload(data)}
          handleReset={handleReset}
        />
      </Grid>
    </>
  );
};

export default AudioResponse;
