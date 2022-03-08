import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import burgerIcon from "../../../static/images/burger-icon.svg";
import ArrowWhiteIcon from "../../../static/images/arrow-white.png";
import completedIcon from "../../../static/images/completed.png";
import { useHistory, useParams } from "react-router";
import { getSection, getSectionSteps } from "../../../../services/common";
import { StepData } from "../../../../common/types";
import { useSnackbar } from "notistack";
import "./style.scss";

interface ProgrammePageParams {
  sectionId: any;
}

const StepsList = () => {
  const history = useHistory();
  const { sectionId } = useParams<ProgrammePageParams>();
  const [steps, setSteps] = useState<StepData[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<any>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (sectionId) {
          const response = await getSectionSteps(sectionId);
          setSteps(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [sectionId]);

  const stepHandler = (item: any) => {
    history.push(`/user-steps/${sectionId}/${item.id}`);
  };

  return (
    <Grid
      className="programmes-section"
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
            Learning Journey
          </Typography>
          <img
            style={{ cursor: "pointer" }}
            src={burgerIcon}
            width="50px"
            height="27px"
            alt="New Wave Learning Logo"
          />
        </Grid>

        <Grid className="step">
          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0 13px 0 0",
              marginBottom: "20px !important",
              margin: "0 8px 0 0",
              maxWidth: "10px",
            }}
          >
            <p className={"programmes-title"}>{section?.title}</p>
          </Grid>
          <Grid className="footer programme-footer">
            <Typography
              sx={{
                fontWeight: "700",
                margin: "0",
                fontSize: "18px !important",
                color: "white",
              }}
              variant="h5"
              gutterBottom
              component="p"
            >
              Get Started
            </Typography>
            <img
              style={{ marginRight: "20px", objectFit: "cover", borderRadius: "4px" }}
              src={ArrowWhiteIcon}
              width="12px"
              height="23px"
              alt="arrow icon"
            />
          </Grid>
        </Grid>

        {steps &&
          steps.map((item: any, index: number) => {
            return (
              <Grid
                key={index}
                className="step"
                onClick={() => {
                  !item.is_answered && stepHandler(item);
                }}
              >
                <p className={"step-title"}>{item.fields?.question || item.fields?.title}</p>
                <p className={"section-step"}>{item.is_answered ? "Not Completed" : "Completed"}</p>
                <Grid className={"footer ".concat(item?.is_answered ? "completed" : "")}>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      margin: "0",
                      fontSize: "18px !important",
                      color: "white",
                    }}
                    variant="h5"
                    gutterBottom
                    component="p"
                  >
                    {item.is_section_completed ? "Completed" : "Continue"}
                  </Typography>
                  <img
                    style={{ marginRight: "20px" }}
                    src={item?.is_answered ? completedIcon : ArrowWhiteIcon}
                    width={item?.is_answered ? "18px" : "12px"}
                    height={item?.is_answered ? "16px" : "23px"}
                    alt="arrow icon"
                  />
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Grid>
  );
};

export default StepsList;
