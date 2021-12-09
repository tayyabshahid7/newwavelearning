import React from "react";

const Video = React.memo(({ videoFile }: any) => (
  <video width="400" controls src={URL.createObjectURL(videoFile)} />
));

export default Video;
