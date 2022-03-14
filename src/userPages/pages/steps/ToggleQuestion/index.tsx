import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Slider from "@mui/material/Slider";

function valuetext(value: any) {
  return `${value}°C`;
}

const ToggleQuestion = ({ isSubmitted, selectedValue, min, max, step, userAnswer }: any) => {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (userAnswer.length > 0) {
      let uAnswer = userAnswer[0].answer;
      setValue(uAnswer.value);
    }
  }, [userAnswer]);

  const handleChange = (event: any, newValue: any) => {
    selectedValue(newValue);
    setValue(newValue);
  };

  return (
    <Grid sx={{ maxWidth: "85%", margin: "auto" }}>
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Slider
          disabled={isSubmitted}
          value={value}
          onChange={handleChange}
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
