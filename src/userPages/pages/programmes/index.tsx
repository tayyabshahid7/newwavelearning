import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import burgerIcon from "../../static/images/burger-icon.svg";
import ArrowRightIcon from "../../static/images/right-arrow.png";
import ArrowWhiteIcon from "../../static/images/arrow-white.png";
import "./style.scss";
import { getProgrammes } from "../../../services/common";
import { useHistory } from "react-router";

const Programmes = () => {
  const [programmeList, setProgrammeList] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getProgrammes();
        setProgrammeList(response.data.results);
        debugger;
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid
      className="programmes"
      container
      style={{
        backgroundColor: "#F1F5FF",
        maxWidth: "420px",
        margin: "auto",
        minHeight: "100vh",
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
        {programmeList &&
          programmeList.map((item: any, index: number) => {
            return (
              <Grid
                onClick={() => {
                  history.push(`/user-dashboard/${item.id}`);
                }}
                key={index}
                className="all-programmes"
              >
                <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                  <img width="68px" src={item.image} alt="programme img" />
                  <p className={"programmes-title"}>{item.name}</p>
                </Grid>
                <img
                  style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
                  src={ArrowRightIcon}
                  width="24px"
                  height="40px"
                  alt="arrow icon"
                />
              </Grid>
            );
          })}
      </Grid>
      <Grid mt="100%" item sx={{ width: "100%", padding: "0 15px" }}>
        <Button
          onClick={() => {
            window.open("https://www.newwavelearning.com/programmes", "_blank");
          }}
          variant="contained"
          sx={{
            padding: "25px 27px !important",
            fontSize: "24px",
            fontWeight: 800,
            backgroundColor: "#0E4A66",
            boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          fullWidth
          size="large"
        >
          <Typography
            sx={{ fontWeight: "700", margin: "0" }}
            variant="h5"
            gutterBottom
            component="p"
          >
            All Programmes
          </Typography>
          <img src={ArrowWhiteIcon} alt={"arrow"} />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Programmes;
