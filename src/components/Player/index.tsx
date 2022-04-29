import React from "react";

interface PlayerProps {
  source: string | File;
  fileType: "audio" | "video";
}

const Player = React.memo(({ source, fileType }: PlayerProps) => {
  const sourceURL = source instanceof File ? URL.createObjectURL(source) : source;
  if (fileType === "audio") {
    return (
      <audio controls src={sourceURL}>
        Your browser does not support html audio element.
      </audio>
    );
  } else if (fileType === "video") {
    return (
      <video width="400" controls src={sourceURL} controlsList="nodownload">
        Your browser does not suppor html video element.
      </video>
    );
  } else return null;
});

export default Player;
