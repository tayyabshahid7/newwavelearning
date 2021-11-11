import React from "react";

import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  loading: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: theme => theme.zIndex.modal + 1}} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
