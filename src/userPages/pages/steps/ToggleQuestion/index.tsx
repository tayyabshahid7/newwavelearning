import React from "react";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";

function valuetext(value: any) {
  return `${value}°C`;
}

const ToggleQuestion = ({ min, max, step }: any) => {
  return (
    <Grid sx={{ maxWidth: "85%", margin: "auto" }}>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Slider
          sx={{ color: "#0E4A66", height: "10px" }}
          aria-label="Temperature"
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={Number(step)}
          min={Number(min)}
          max={Number(max)}
        />
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <p>{min}</p>
        <p>{max}</p>
      </Grid>
    </Grid>
  );
};

export default ToggleQuestion;
