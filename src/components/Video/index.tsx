import React from "react";

const Video = React.memo(({ videoFile }: any) => (
  <video
    width="400"
    controls
    src={videoFile instanceof File ? URL.createObjectURL(videoFile) : videoFile}
  />
));

export default Video;
