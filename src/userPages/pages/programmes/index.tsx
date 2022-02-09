import React from "react";
import { Grid, Typography } from "@mui/material";
// import { Link as RouterLink, RouteComponentProps, useParams } from "react-router-dom";
import burgerIcon from "../../static/images/burger-icon.svg";
import Card from "../../components/card";
import robotIcon from "../../static/images/robo.svg";
import InspireIcon from "../../static/images/inspire.svg";
import ArrowRightIcon from "../../static/images/arrow-right-icon.svg";
import { ICard } from "../../interfaces/card";
import "./style.scss";

const programmesData: Array<ICard> = [
  {
    title: "BuildMe",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: robotIcon,
  },
  {
    title: "InspireMe",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    image: InspireIcon,
  },
];

const Programmes = () => {
  return (
    <Grid
      className="programmes"
      container
      style={{
        backgroundColor: "#FFFFFF",
        maxWidth: "420px",
        margin: "auto",
        height: "100vh",
        width: "100%",
      }}
    >
      <Grid item container direction="column">
        <Grid
          item
          sx={{
            padding: "6% 5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2%",
          }}
        >
          <Typography sx={{ fontWeight: "500" }} variant="h6" gutterBottom component="p">
            Programmes
          </Typography>
          <img
            style={{ cursor: "pointer" }}
            src={burgerIcon}
            width="50px"
            height="27px"
            alt="New Wave Learning Logo"
          />
        </Grid>
        {programmesData.map((item: ICard, index: number) => {
          return (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          );
        })}
        <Grid className="all-programmes" sx={{ display: "flex", alignItems: "center" }}>
          <Grid>
            <p className={"programmes-title"}>All Programmes</p>
            <p className={"programmes-description"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.{" "}
            </p>
          </Grid>
          <img
            style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
            src={ArrowRightIcon}
            width="22px"
            height="22px"
            alt="arrow icon"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Programmes;
