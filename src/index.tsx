import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./common/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// @ts-ignore
import { SnackbarProvider } from "notistack";
// import Learner from "./Learner";

function importBuildTarget() {
  if (process.env.REACT_APP_BUILD_TARGET === "admin") {
    return import("./App");
  } else if (process.env.REACT_APP_BUILD_TARGET === "learner") {
    return import("./Learner");
  } else {
    return Promise.reject(new Error("No such build target: " + process.env.REACT_APP_BUILD_TARGET));
  }
}

// Import the entry point and render it's default export
importBuildTarget().then(({ default: Environment }) =>
  ReactDOM.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*@ts-ignore*/}
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Environment />
        </SnackbarProvider>
      </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
