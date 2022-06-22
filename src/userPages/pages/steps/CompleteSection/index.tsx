import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import successIcon from "../../../static/images/well-done.png";
import { getSection } from "../../../../services/common";
import { useHistory } from "react-router";
import { useSnackbar } from "notistack";
import "./style.scss";
import arrowIcon from "../../../static/images/right-arrow 6.png";
import SideNavbar from "../../../components/SideNavbar";
import sidebarBgImage from "../../../static/images/leftBar.svg";

interface CompleteSectionParams {
  cohortId: any;
  sectionId: any;
  programmeId: any;
}

const CompleteSection = () => {
  const history = useHistory();
  const { cohortId, sectionId, programmeId } = useParams<CompleteSectionParams>();
  const [section, setSection] = useState<any>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionData = await getSection(sectionId);
        setSection(sectionData);
      } catch (error: any) {
        enqueueSnackbar(error.response?.data.detail, { variant: "error" });
      }
    };
    fetchData();
  }, [sectionId, enqueueSnackbar]);

  return (
    <Grid container sx={{ display: "flex" }}>
      <Grid
        item
        xs={2}
        sx={{
          width: "22%",
          position: "relative",
          "@media (max-width: 768px)": {
            width: "0 !important",
          },
          "@media (max-width: 1024px)": {
            width: "36%",
          },
        }}
      >
        <SideNavbar cohortId={cohortId} programmeId={programmeId} />
      </Grid>{" "}
      <Grid
        item
        xs={8}
        container
        className="success-section mobile"
        style={{
          background: "#FFFFFF",
          margin: "auto",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Grid
          item
          sx={{
            width: "100%",
            padding: "0%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "85px",
          }}
        >
          <img
            className={"back-arrow"}
            onClick={() => history.goBack()}
            style={{ cursor: "pointer" }}
            src={arrowIcon}
            width="27px"
            height="27px"
            alt="Arrow Logo"
          />
        </Grid>
        <Grid item container direction="column">
          <Grid className="success-image">
            <img src={successIcon} width="220px" height="220px" alt="New Wave Learning Logo" />
          </Grid>

          <Grid item sx={{ padding: "2% 10%", textAlign: "center" }}>
            <Typography
              sx={{ margin: "10px 0 5px 0", fontWeight: "600" }}
              variant="h5"
              gutterBottom
            >
              WELL DONE!
            </Typography>
          </Grid>

          <Grid item sx={{ padding: "5px 10%", textAlign: "center" }}>
            <Typography component="h5" sx={{ fontSize: "16px", color: "#6A6E71" }}>
              You have completed {section?.title}. Choose an option below.
            </Typography>
          </Grid>
        </Grid>
        <Grid item px="18px" width="100%">
          <Button
            sx={{
              padding: "16px 13.39px",
              fontSize: "24px",
              fontWeight: 800,
              backgroundColor: "#0E4A66",
              boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
              borderRadius: "8px",
              marginBottom: "3%",
            }}
            variant="contained"
            fullWidth
            size="large"
            onClick={() => {
              history.push(`/user-programmes-section/${cohortId}/${programmeId}`);
            }}
          >
            Continue Learning
          </Button>
          <Button
            sx={{
              padding: "16px 13.39px",
              fontSize: "24px",
              fontWeight: 800,
              backgroundColor: "#FD773B",
              boxShadow: "0px 4px 15px rgba(14, 74, 102, 0.57)",
              borderRadius: "8px",
              border: "1px solid #FD773B",
              marginBottom: "40px",
              "&:hover": {
                backgroundColor: "#ee8252",
              },
            }}
            variant="contained"
            fullWidth
            size="large"
            onClick={() => {
              history.push({
                pathname: `/user-dashboard/${cohortId}`,
              });
            }}
          >
            Return To Dashboard
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          background: `url(${sidebarBgImage}) no-repeat center center`,
          position: "sticky",
          right: 0,
          top: 0,
          height: "100vh",
        }}
      ></Grid>
    </Grid>
  );
};

export default CompleteSection;
