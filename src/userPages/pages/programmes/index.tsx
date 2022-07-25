import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import ArrowRightIcon from "../../static/images/right-arrow.png";
import ArrowWhiteIcon from "../../static/images/arrow-white.png";
import { getUserProgrammes } from "../../../services/common";
import { useHistory } from "react-router";
import Loading from "../../../components/Loading";
import "./style.scss";
import SideNavbar from "../../components/SideNavbar";
import sidebarBgImage from "../../static/images/leftBar.svg";

const Programmes = () => {
  const [programmeList, setProgrammeList] = useState<any>(null);
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:800px)");

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
    <Grid container>
      {!isMobile && (
        <Grid item sm={0} md={2} sx={{ display: "block" }}>
          <SideNavbar
            openProgramme={() => {
              programmeList &&
                history.push({
                  pathname: `/user-dashboard/${programmeList[0]?.id}`,
                });
            }}
            openLiveSession={() => {
              programmeList &&
                history.push({
                  pathname: `/user-live-sessions/${programmeList[0]?.id}`,
                });
            }}
            openFeedback={() => {
              programmeList &&
                history.push({
                  pathname: `/user-feedback/${programmeList[0]?.id}/${programmeList[0]?.programme?.id}`,
                });
            }}
            openLeaderboard={() => {
              programmeList &&
                history.push({
                  pathname: `/leaderBoard/${programmeList[0]?.id}/${programmeList[0]?.programme?.id}`,
                });
            }}
            cohortId={""}
            programmeId={""}
          />
        </Grid>
      )}
      <Grid className="programmes" container item sm={12} md={8} sx={{ padding: "40px" }}>
        <Loading loading={loading} />
        <Grid item container direction="column">
          <Grid
            item
            sx={{
              padding: "5% 0 3% 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2%",
              "@media (max-width: 767px)": {
                padding: "6% 5%",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "500",
                paddingLeft: "1%",
              }}
              variant="h6"
              gutterBottom
              component="p"
            >
              Programmes
            </Typography>
          </Grid>
          {programmeList &&
            programmeList.map((item: any, index: number) => {
              return (
                <Grid
                  item
                  container
                  onClick={() => {
                    history.push({
                      pathname: `/user-dashboard/${item.id}`,
                    });
                  }}
                  key={index}
                  className="all-programmes"
                >
                  <Grid item sx={{ display: "flex", alignItems: "center", padding: "0 13px" }}>
                    <img
                      style={{ maxWidth: "68px", maxHeight: "40px" }}
                      src={item.programme.image}
                      alt="programme img"
                    />
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
        <Grid
          item
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            "@media (max-width: 767px)": {
              marginTop: "10%",
            },
          }}
        >
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
              marginBottom: "50px",
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
      {!isMobile && (
        <Grid
          item
          sm={0}
          md={2}
          sx={{
            background: `url(${sidebarBgImage}) no-repeat center center`,
            backgroundSize: "cover",
            position: "sticky",
            right: 0,
            top: 0,
            height: "100vh",
            display: "block",
          }}
        ></Grid>
      )}
    </Grid>
  );
};

export default Programmes;
