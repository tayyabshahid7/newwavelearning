import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
// @ts-ignore
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
import "./style.scss";

const AudioResponse = ({ isSubmitted, userAnswer, uploadAudio }: any) => {
  const [audio, setAudio] = useState<any>(null);

  useEffect(() => {
    if (userAnswer.length) {
      setAudio(userAnswer[0].file_answer);
    }
  }, [userAnswer]);

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
    let file = new File([data.blob], "recording.mp3");
    uploadAudio(file);
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
        {!isSubmitted ? (
          <Recorder
            hideHeader={true}
            record={false}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={(data: any) => handleAudioStop(data)}
            handleAudioUpload={(data: any) => handleAudioUpload(data)}
            handleReset={handleReset}
          />
        ) : (
          <audio controls src={audio}>
            Your browser does not support html audio element.
          </audio>
        )}
      </Grid>
    </>
  );
};

export default AudioResponse;
