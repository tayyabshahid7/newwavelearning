import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ArrowRightIcon from "../../static/images/right-arrow.png";
import ArrowWhiteIcon from "../../static/images/arrow-white.png";
import { getUserProgrammes } from "../../../services/common";
import { useHistory } from "react-router";
import Loading from "../../../components/Loading";
import "./style.scss";

const Programmes = () => {
  const [programmeList, setProgrammeList] = useState<any>(null);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await getUserProgrammes();
        setProgrammeList(response.data.results);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } catch (error) {
        setLoading(false);
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
        position: "relative",
        backgroundColor: "#F1F5FF",
        maxWidth: "450px",
        margin: "auto",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Loading loading={loading} />
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
        </Grid>
        {programmeList &&
          programmeList.map((item: any, index: number) => {
            return (
              <Grid
                onClick={() => {
                  history.push({
                    pathname: `/user-dashboard/${item.id}`,
                  });
                }}
                key={index}
                className="all-programmes"
              >
                <Grid sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                  <img width="68px" src={item.programme.image} alt="programme img" />
                  <p className={"programmes-title"}>{item.programme.name}</p>
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
      <Grid mt="85%" item sx={{ width: "100%", padding: "0 15px" }}>
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
