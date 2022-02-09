import React from "react";
import { Grid } from "@mui/material";
import { ICard } from "../../interfaces/card";
import "./style.scss";

const Card = ({ title, description, image }: ICard) => {
  return (
    <Grid className="custom-card card">
      <img
        style={{ objectFit: "cover", borderRadius: "4px" }}
        src={image}
        width="100%"
        height="112px"
        alt="Card logo"
      />
      <p className={"title"}>{title}</p>
      <p className={"description"}>{description}</p>
    </Grid>
  );
};

export default Card;
